import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/solution.scss";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import { Link } from "react-router-dom";
import { saveEvaluation } from "../services/localStorageService";
import { useState } from "react";
import { createHistory } from "../services/historyService";

export function Solution() {
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
            console.log(
                "Historique après sauvegarde :",
                localStorage.getItem("historique")
            );
            setMessage("Enregistré sur cet appareil.");
        }

        setSaved(true);
    } catch (error) {
        console.error("Erreur pendant la sauvegarde :", error);

        try {
            saveEvaluation(evaluation, solutionsFiltre);
            setSaved(true);
            setMessage(
                "Le serveur ne répond pas : enregistré sur cet appareil."
            );
        } catch (localError) {
            console.error("Erreur de sauvegarde locale :", localError);
            setMessage("Impossible d'enregistrer. Réessaie.");
        }
    }
};

    return (
        <>
            <Navbar />
            <div className="switch">
                <Link to="/Localisation" className="retour">
                <i className="fa-solid fa-chevron-left"></i>
                </Link>
                 <button className="btn">Télécharger le fichier</button>
            </div>

            

            <section>
                    <h2 className="titleSolution">Geste conseillé</h2>
                   

                <article id="solution">
                    {solutionsFiltre.map((item) => (
                        <article
                            className="contentSolution"
                            key={item.id}
                        >
                            <h3>{item.label}</h3>

                            <p className="solutionPara">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </article>
            </section>

            <section>
                <button
                    className="btn"
                    onClick={handleSave}
                    disabled={saved}
                >
                    {saved
                        ? "Épisode enregistré"
                        : "+ Enregistrer cet épisode"}
                </button>

                <button
                    className="btn"
                    onClick={shareSummary}
                >
                    <i className="fa-solid fa-share-nodes"></i>
                    Partager mon résumé
                </button>

                {message && <p>{message}</p>}

                <Link to="/Home">
                    Evaluation terminé
                </Link>

                <p>
                    Information générale, ne remplace pas un avis médical
                </p>
            </section>
        </>
    );
}