import Navbar from "../components/Navbar";
import "../styles/components/navbar.scss";
import "../styles/pages/solution.scss";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import { Link } from "react-router-dom";
import { saveEvaluation } from "../services/localStorageService";
import { useState } from "react";
import { createHistory } from "../services/historyService";
import { downloadEvaluationPDF } from "../services/pdfService";
import { ChevronLeft } from "lucide-react";
import { Share2 } from "lucide-react";

import chaleur from "../assets/images/chaleur.webp";
import bain from "../assets/images/bain_douche_chaude.webp";
import massage from "../assets/images/massage_doux.webp";
import exercice from "../assets/images/exercice_doux.webp";
import activite from "../assets/images/activite_physique_reguliere.webp";
import sommeil from "../assets/images/sommeil.webp";
import repos from "../assets/images/repos.webp";
import relaxation from "../assets/images/relaxation.webp";
import alimentation from "../assets/images/alimentation_equilibree.webp";
import alimentationLegere from "../assets/images/alimentation_pauvre_en_graisses.webp";
import stress from "../assets/images/reduction_stress.webp";
import hydratation from "../assets/images/hydratation.webp";
import tabac from "../assets/images/eviter_tabac.webp";
import { CheckCircle2 } from "lucide-react";



const imagesSolutions: Record<string, string> = {
    chaleur,
    bain_douche_chaude: bain,
    massage_doux: massage,
    exercice_doux: exercice,
    activite_physique_reguliere: activite,
    sommeil,
    repos,
    relaxation,
    alimentation_equilibree: alimentation,
    alimentation_pauvre_en_graisses: alimentationLegere,
    reduction_stress: stress,
    hydratation,
    eviter_tabac: tabac,
};

export default function Solution() {
    const { evaluation } = useEvaluation();
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState("");

    // Pour voir si la solution correspond aux réponses renseignées
    const solutionsFiltre = db.solutions.filter((solution) => {
        const intensityOk =
            !solution.intensites ||
            (evaluation.intensiteNiveau !== null &&
                solution.intensites.includes(evaluation.intensiteNiveau));

        const localisatiokOk =
            !solution.localisations ||
            evaluation.localisations.some((localisation) =>
                solution.localisations.includes(localisation)
            );

        const contexteOk =
            !solution.contextes ||
            (evaluation.contextes !== null &&
                solution.contextes.includes(evaluation.contextes));

        const symptomeOk =
            !solution.symptomes_cibles ||
            solution.symptomes_cibles.some((symptome) =>
                evaluation.symptomes.includes(symptome)
            );

        return (
            intensityOk &&
            localisatiokOk &&
            contexteOk &&
            symptomeOk
        );
    });
    // Je crée le bilan PDF et je lance son téléchargement.
    const handleDownloadPDF = () => {
        try {
            downloadEvaluationPDF(evaluation, solutionsFiltre);
        } catch (error) {
            console.error("Erreur génération PDF :", error);
            setMessage("Impossible de générer le PDF.");
        }
    };
    // Partager le résumé de l'évaluation
    async function shareSummary() {
        const text =
            `Baddies, ${new Date().toLocaleDateString("fr-FR")}\n` +
            `Douleur : ${evaluation.intensiteNiveau ?? "?"}/10\n` +
            `Symptômes : ${evaluation.symptomes.join(", ") || "aucun"}\n` +
            `Gestes : ${solutionsFiltre
                .map((s) => s.label)
                .join(", ")}`;

        try {
            if (navigator.share) {
                await navigator.share({ text });
            } else {
                await navigator.clipboard.writeText(text);
                setMessage("Résumé copié.");
            }
        } catch (e) {
            if ((e as Error).name !== "AbortError") {
                setMessage("Partage impossible.");
            }
        }
    }

    // Enregistrer l'épisode
    const handleSave = async () => {
        if (saved) return;

        console.log("État en ligne :", navigator.onLine);

        const token = localStorage.getItem("token");

        try {
            if (token && navigator.onLine) {
                await createHistory(evaluation, solutionsFiltre);
                setMessage("Enregistré sur ton compte.");
            } else {
                saveEvaluation(evaluation, solutionsFiltre);
                setMessage("Enregistré sur cet appareil.");
            }

            setSaved(true);
        } catch (error) {
            console.error("Échec de sauvegarde API History :", error)

            try {
                saveEvaluation(evaluation, solutionsFiltre)
                setSaved(true)

                if (
                    error instanceof Error &&
                    error.message ===
                    "Session expirée. Veuillez vous reconnecter."
                ) {
                    setMessage(
                        "Session expirée. Veuillez vous reconnecter. " +
                        "Votre évaluation a été conservée sur cet appareil."
                    )
                } else {
                    setMessage(
                        "Enregistrement sur le compte impossible. " +
                        "Votre évaluation a été conservée sur cet appareil."
                    )
                }
            } catch {
                setMessage("Impossible d'enregistrer. Réessaie.")
            }
        }
    };





    return (
        <>
            <Navbar />

            <main className="solutionPage">
                <div className="switch">
                    <Link to="/Localisation" className="retour" aria-label="Retour à l'étape précédente">
                        <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
                    </Link>

                    <button type="button" className="btn-switch" onClick={handleDownloadPDF}>
                        Télécharger le fichier
                    </button>
                </div>

                <section aria-labelledby="solution-title">
                    <h1 id="solution-title" className="titleSolution">
                        Gestes conseillés
                    </h1>
                    <p className="pMedical">
                        Informations générales, ne remplacent pas un avis médical.
                    </p>

                    <div id="solution">
                        {solutionsFiltre.length > 0 ? (
                            solutionsFiltre.map((item) => (
                                <article className="contentSolution" key={item.id}>
                                    <div className="solutionImage">
                                        <img src={imagesSolutions[item.id]} alt="" loading="lazy" />
                                    </div>

                                    <div className="solutionTexte">
                                        <h2>{item.label}</h2>

                                        <p className="solutionPara">
                                            {item.description}
                                        </p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="NoSolution">
                                Aucun geste correspondant à votre évaluation.
                            </p>
                        )}
                    </div>
                </section>

                <section aria-label="Actions sur votre évaluation">

                    {message && <p role="status" className="collapse-note">
                        <CheckCircle2 size={18} />{message}</p>}
                    <div className="btnSolution">

                        <button type="button" className="btn" onClick={handleSave} disabled={saved}>
                            {saved
                                ? "Épisode enregistré"
                                : "+ Enregistrer"}
                        </button>

                        <button type="button" className="btn" onClick={shareSummary}>
                            <Share2 size={20} strokeWidth={1.8} aria-hidden="true" />
                            Partager
                        </button>
                    </div>





                </section>
            </main>
        </>
    );
}

