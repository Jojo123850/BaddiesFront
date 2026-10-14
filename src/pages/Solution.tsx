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

        const intensity = evaluation.intensiteNiveau;

        pdf.text(
            intensity == null
                ? "Non renseignée"
                : `${intensity}/10`,
            margin + 9,
            y + 27
        );

        y += 47;

        // Symptômes
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(...colors.black);
        pdf.text("SYMPTÔMES RENSEIGNÉS", margin, y);

        y += 7;

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(...colors.gray);
        pdf.setFontSize(10);

        const symptoms = pdf.splitTextToSize(
            evaluation.symptomes.join(", ") || "Aucun symptôme renseigné",
            contentWidth
        );

        pdf.text(symptoms, margin, y);
        y += symptoms.length * 5 + 17;

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
                 <button className="btn" onClick={handleDownloadPDF}>Télécharger le fichier</button>
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
                <div className="btnSolution">
                    <button
                        className="btn"
                        onClick={handleSave}
                        disabled={saved}>
                        {saved
                            ? "Épisode enregistré"
                            : "+ Enregistrer"}
                    </button>

                    <button
                        className="btn"
                        onClick={shareSummary}
                    >
                        <i className="fa-solid fa-share-nodes"></i>
                        Partager 
                    </button>
                </div>

                {message && <p>{message}</p>}
                
                <Link to="/Home" className="btn-container">
                    Evaluation terminé
                </Link>

                <p>
                    Information générale, ne remplace pas un avis médical
                </p>
            </section>
        </>
    );
}