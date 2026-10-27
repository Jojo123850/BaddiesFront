import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/solution.scss";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import { Link } from "react-router-dom";
import { saveEvaluation } from "../services/localStorageService";
import { useState } from "react";
import { createHistory } from "../services/historyService";
import {jsPDF} from 'jspdf';
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
import { CheckCircle2} from "lucide-react";



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
const handleDownloadPDF = () => {
    try {
        const pdf = new jsPDF();

        const colors = {
            black: [22, 22, 26] as const,
            pink: [231, 88, 146] as const,
            lightPink: [255, 241, 246] as const,
            white: [255, 255, 255] as const,
            gray: [108, 108, 118] as const,
            border: [235, 235, 239] as const,
        };

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 18;
        const contentWidth = pageWidth - margin * 2;
        const bottomLimit = pageHeight - 22;

        let y = 0;

        // Ajouter un en-tête sur chaque page
        const addHeader = () => {
            pdf.setFillColor(...colors.black);
            pdf.rect(0, 0, pageWidth, 47, "F");

            // Accent rose
            pdf.setFillColor(...colors.pink);
            pdf.roundedRect(
                margin,
                12,
                5,
                23,
                2,
                2,
                "F"
            );

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(25);
            pdf.setTextColor(...colors.white);
            pdf.text("BADDIES", margin + 12, 25);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            pdf.setTextColor(225, 225, 230);
            pdf.text(
                "Mon bilan de douleur",
                margin + 12,
                33
            );

            y = 59;
        };

        // Ajouter un pied de page
        const addFooter = () => {
            const totalPages = pdf.getNumberOfPages();

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);

                pdf.setDrawColor(...colors.border);
                pdf.line(
                    margin,
                    pageHeight - 18,
                    pageWidth - margin,
                    pageHeight - 18
                );

                pdf.setFontSize(8);
                pdf.setFont("helvetica", "normal");
                pdf.setTextColor(...colors.gray);

                pdf.text(
                    "BADDIES - Informations générales, ne remplace pas un avis médical.",
                    margin,
                    pageHeight - 12
                );

                pdf.text(
                    `${i} / ${totalPages}`,
                    pageWidth - margin,
                    pageHeight - 12,
                    { align: "right" }
                );
            }
        };

        const newPage = () => {
            pdf.addPage();
            addHeader();
        };

        addHeader();

        // Date
        pdf.setFontSize(10);
        pdf.setTextColor(...colors.gray);
        pdf.text(
            `Évaluation du ${new Date().toLocaleDateString("fr-FR")}`,
            margin,
            y
        );

        y += 12;

        // Titre de section
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(15);
        pdf.setTextColor(...colors.black);
        pdf.text("Résumé de mon évaluation", margin, y);

        y += 9;

        // Carte intensité
        pdf.setFillColor(...colors.lightPink);
        pdf.roundedRect(
            margin,
            y,
            contentWidth,
            36,
            4,
            4,
            "F"
        );

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...colors.gray);
        pdf.text("INTENSITÉ DE LA DOULEUR", margin + 9, y + 11);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.setTextColor(...colors.pink);

        const intensity = evaluation.intensiteValeur;
        const intensityLabel =
            db.evaluation_douleur.echelle_intensite.niveaux.find(
                (niveau) => niveau.id === evaluation.intensiteNiveau
            )?.label ?? "Non renseignée";

        pdf.text(
            intensity == null ? intensityLabel : `${intensity}/10`,
            margin + 9,
            y + 27
        );

        y += 47;

        // Réponses affichées avec les libellés de db.json.
        const localisationLabel = evaluation.localisations
            .map((id) =>
                db.evaluation_douleur.localisations.find(
                    (localisation) => localisation.id === id
                )?.label ?? "Zone indisponible"
            )
            .join(", ") || "Non renseignée";

        const contexteLabel = db.contextes.find(
            (contexte) =>
                contexte.id.replace(/\//g, "_") ===
                evaluation.contextes?.replace(/\//g, "_")
        )?.label ?? "Contexte non renseigné";

        const caractereLabel =
            db.evaluation_douleur.caractere_habituel.options.find(
                (option) => option.id === evaluation.option
            )?.label ?? "Non renseigné";

        const symptomesLabel = evaluation.symptomes
            .map((id) =>
                db.evaluation_douleur.symptomes.find(
                    (symptome) => symptome.id === id
                )?.label ?? "Symptôme indisponible"
            )
            .join(", ") || "Aucun symptôme renseigné";

        // Passe à une nouvelle page si nécessaire pour éviter les débordements.
        const addResponse = (title: string, value: string) => {
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);
            const lines: string[] = pdf.splitTextToSize(value, contentWidth);

            if (y + 12 > bottomLimit) newPage();

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(10);
            pdf.setTextColor(...colors.black);
            pdf.text(title, margin, y);
            y += 7;

            lines.forEach((line) => {
                if (y + 5 > bottomLimit) newPage();
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(10);
                pdf.setTextColor(...colors.gray);
                pdf.text(line, margin, y);
                y += 5;
            });

            y += 10;
        };

        addResponse("LOCALISATION DE LA DOULEUR", localisationLabel);
        addResponse("CONTEXTE", contexteLabel);
        addResponse("CARACTÈRE DE LA DOULEUR", caractereLabel);
        addResponse("SYMPTÔMES RENSEIGNÉS", symptomesLabel);

        // Section solutions
        if (y > bottomLimit - 35) {
            newPage();
        }

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(15);
        pdf.setTextColor(...colors.black);
        pdf.text("Solutions proposées", margin, y);

        y += 7;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        pdf.setTextColor(...colors.gray);
        pdf.text(
            `${solutionsFiltre.length} geste(s) adapté(s) à ton évaluation`,
            margin,
            y
        );

        y += 12;

        // Cartes des solutions
        solutionsFiltre.forEach((solution, index) => {
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(11);

           const titleLines: string[] = pdf.splitTextToSize(
            `${index + 1}. ${solution.label ?? ""}`,
             contentWidth - 24
);

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(10);

            const descriptionLines: string[] = pdf.splitTextToSize(
                String(solution.description ?? ""),
                contentWidth - 24
            );

            const lineHeight = 5;
            const cardPadding = 9;
            // const titleHeight = titleLines.length * 6;
            // const availableHeight = bottomLimit - 59;

            // Les cartes longues peuvent être découpées en plusieurs pages
            const  remaining = [...descriptionLines];
            let firstPart = true;

            do {
                const currentTitle = firstPart
                    ? titleLines
                    : [`${solution.label} (suite)`];

                const currentTitleHeight = currentTitle.length * 6;

                const minimumHeight =
                    cardPadding * 2 + currentTitleHeight + 7;

                if (y + minimumHeight + lineHeight > bottomLimit) {
                    newPage();
                }

                const spaceForDescription =
                    bottomLimit -
                    y -
                    minimumHeight -
                    5;

                const maxLines = Math.max(
                    0,
                    Math.floor(spaceForDescription / lineHeight)
                );

                if (maxLines === 0 && remaining.length > 0) {
                    newPage();
                    continue;
                }

                const currentDescription = remaining.splice(0, maxLines);

                const cardHeight =
                    cardPadding * 2 +
                    currentTitleHeight +
                    7 +
                    currentDescription.length * lineHeight;

                // Fond de la carte
                pdf.setFillColor(249, 249, 251);
                pdf.setDrawColor(...colors.border);
                pdf.roundedRect(
                    margin,
                    y,
                    contentWidth,
                    cardHeight,
                    4,
                    4,
                    "FD"
                );

                // Trait rose à gauche
                pdf.setFillColor(...colors.pink);
                pdf.roundedRect(
                    margin,
                    y + 7,
                    3,
                    Math.min(18, cardHeight - 14),
                    1,
                    1,
                    "F"
                );

                // Numéro et titre
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(11);
                pdf.setTextColor(...colors.black);

                const displayTitle = currentTitle;

                pdf.text(
                    displayTitle,
                    margin + 10,
                    y + 12
                );

                // Description
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(10);
                pdf.setTextColor(...colors.gray);

                if (currentDescription.length > 0) {
                    pdf.text(
                        currentDescription,
                        margin + 10,
                        y + 12 + currentTitleHeight + 3
                    );
                }

                y += cardHeight + 8;
                firstPart = false;

                if (remaining.length > 0) {
                    newPage();
                }
            } while (remaining.length > 0);
        });

        if (solutionsFiltre.length === 0) {
            pdf.setFontSize(10);
            pdf.setTextColor(...colors.gray);
            pdf.text(
                "Aucune solution correspondante pour cette évaluation.",
                margin,
                y
            );
        }

        addFooter();

        pdf.save("BADDIES-bilan.pdf");

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
            console.log(
                "Historique après sauvegarde :",
                localStorage.getItem("historique")
            );
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
                <Link
                    to="/Localisation"
                    className="retour"
                    aria-label="Retour à l'étape précédente"
                >
                    <ChevronLeft
                        size={22}
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                </Link>

                <button
                    type="button"
                    className="btn-switch"
                    onClick={handleDownloadPDF}
                >
                    Télécharger le fichier
                </button>
            </div>

            <section aria-labelledby="solution-title">
                <h1 id="solution-title" className="titleSolution">
                    Gestes conseillés
                </h1>

                <div id="solution">
                    {solutionsFiltre.length > 0 ? (
                        solutionsFiltre.map((item) => (
                            <article
                                className="contentSolution"
                                key={item.id}
                            >
                                <div className="solutionImage">
                                    <img
                                        src={imagesSolutions[item.id]}
                                        alt=""
                                        loading="lazy"
                                    />
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
                        <p>
                            Aucun geste correspondant à votre évaluation.
                        </p>
                    )}
                </div>
            </section>

            <section aria-label="Actions sur votre évaluation">
                <p className="collapse-note">
                    <CheckCircle2 size={18} />
                    Évaluation terminée
                </p>
                <div className="btnSolution">
                    <button type="button"  className="btn"  onClick={handleSave}   disabled={saved} >
                        {saved
                            ? "Épisode enregistré"
                            : "+ Enregistrer"}
                    </button>

                    <button type="button"className="btn" onClick={shareSummary} >  
                      <Share2
                            size={20}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        Partager
                    </button>
                </div>

                {message && <p role="status">{message}</p>}

                

                <p>
                    Informations générales, ne remplacent pas un avis médical.
                </p>
            </section>
        </main>
    </>
);
}

