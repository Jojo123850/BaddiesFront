import { jsPDF } from "jspdf";
import db from "../data/db.json";
import type { Evaluation } from "../evaluation/EvalContext";

type SolutionPDF = {
    label: string;
    description: string;
};

type Choix = {
    id: string;
    label: string;
};

// Je retrouve un texte lisible à partir de son identifiant.
function getLabel(choix: Choix[], id: string | null, texteParDefaut: string) {
    for (const element of choix) {
        if (element.id === id) {
            return element.label;
        }
    }
    return texteParDefaut;
}

export function downloadEvaluationPDF(evaluation: Evaluation, solutions: SolutionPDF[]) {
    const pdf = new jsPDF();
    const colors = {
        black: "#16161A",
        pink: "#E75892",
        lightPink: "#FFF1F6",
        white: "#FFFFFF",
        gray: "#6C6C76",
        border: "#EBEBEF",
    };

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    const bottomLimit = pageHeight - 22;

    // y indique la hauteur où je vais écrire. Je l’augmente pour descendre.
    let y = 0;

    // Je règle la taille, la couleur et le gras du texte en une seule fois.
    function textStyle(size: number, color: string, bold = false) {
        pdf.setFont("helvetica", bold ? "bold" : "normal");
        pdf.setFontSize(size);
        pdf.setTextColor(color);
    }

    function addHeader() {
        pdf.setFillColor(colors.black);
        pdf.rect(0, 0, pageWidth, 47, "F");
        pdf.setFillColor(colors.pink);
        pdf.roundedRect(margin, 12, 5, 23, 2, 2, "F");
        textStyle(25, colors.white, true);
        pdf.text("BADDIES", margin + 12, 25);
        textStyle(10, "#E1E1E6");
        pdf.text("Mon bilan de douleur", margin + 12, 33);
        y = 59;
    }

    function newPage() {
        pdf.addPage();
        addHeader();
    }

    // Je garde les textes longs dans la page et je continue sur la suivante.
    function addResponse(title: string, value: string) {
        textStyle(10, colors.gray);
        const lines: string[] = pdf.splitTextToSize(value, contentWidth);
        if (y + 12 > bottomLimit) newPage();

        textStyle(10, colors.black, true);
        pdf.text(title, margin, y);
        y += 7;

        for (const line of lines) {
            if (y + 5 > bottomLimit) newPage();
            textStyle(10, colors.gray);
            pdf.text(line, margin, y);
            y += 5;
        }
        y += 10;
    }

    function addSummary() {
        textStyle(10, colors.gray);
        pdf.text(`Évaluation du ${new Date().toLocaleDateString("fr-FR")}`, margin, y);
        y += 12;
        textStyle(15, colors.black, true);
        pdf.text("Résumé de mon évaluation", margin, y);
        y += 9;

        pdf.setFillColor(colors.lightPink);
        pdf.roundedRect(margin, y, contentWidth, 36, 4, 4, "F");
        textStyle(10, colors.gray);
        pdf.text("INTENSITÉ DE LA DOULEUR", margin + 9, y + 11);

        let intensity = getLabel(
            db.evaluation_douleur.echelle_intensite.niveaux,
            evaluation.intensiteNiveau,
            "Non renseignée"
        );
        if (evaluation.intensiteValeur != null) {
            intensity = `${evaluation.intensiteValeur}/10`;
        }
        textStyle(22, colors.pink, true);
        pdf.text(intensity, margin + 9, y + 27);
        y += 47;

        const zones: string[] = [];
        for (const id of evaluation.localisations) {
            zones.push(getLabel(db.evaluation_douleur.localisations, id, "Zone indisponible"));
        }

        let context = "Contexte non renseigné";
        for (const choix of db.contextes) {
            if (choix.id.replace(/\//g, "_") === evaluation.contextes?.replace(/\//g, "_")) {
                context = choix.label;
                break;
            }
        }

        const character = getLabel(
            db.evaluation_douleur.caractere_habituel.options,
            evaluation.option,
            "Non renseigné"
        );
        const symptoms: string[] = [];
        for (const id of evaluation.symptomes) {
            symptoms.push(getLabel(db.evaluation_douleur.symptomes, id, "Symptôme indisponible"));
        }

        // join rassemble les textes dans une phrase séparée par des virgules.
        addResponse("LOCALISATION DE LA DOULEUR", zones.join(", ") || "Non renseignée");
        addResponse("CONTEXTE", context);
        addResponse("CARACTÈRE DE LA DOULEUR", character);
        addResponse("SYMPTÔMES RENSEIGNÉS", symptoms.join(", ") || "Aucun symptôme renseigné");
    }

    function drawCard(title: string[], description: string[], height: number) {
        const titleHeight = title.length * 6;
        pdf.setFillColor("#F9F9FB");
        pdf.setDrawColor(colors.border);
        pdf.roundedRect(margin, y, contentWidth, height, 4, 4, "FD");
        pdf.setFillColor(colors.pink);
        pdf.roundedRect(margin, y + 7, 3, Math.min(18, height - 14), 1, 1, "F");
        textStyle(11, colors.black, true);
        pdf.text(title, margin + 10, y + 12);
        textStyle(10, colors.gray);
        if (description.length > 0) {
            pdf.text(description, margin + 10, y + 12 + titleHeight + 3);
        }
    }

    function addSolution(solution: SolutionPDF, number: number) {
        textStyle(11, colors.black, true);
        const title: string[] = pdf.splitTextToSize(`${number}. ${solution.label ?? ""}`, contentWidth - 24);
        textStyle(10, colors.gray);
        const remaining: string[] = pdf.splitTextToSize(String(solution.description ?? ""), contentWidth - 24);
        let firstPart = true;

        // Je coupe une carte trop longue pour afficher toute la description.
        do {
            let currentTitle = title;
            if (!firstPart) currentTitle = [`${solution.label} (suite)`];

            const titleHeight = currentTitle.length * 6;
            const padding = 9;
            const lineHeight = 5;
            const minimumHeight = padding * 2 + titleHeight + 7;
            if (y + minimumHeight + lineHeight > bottomLimit) newPage();

            // Je calcule combien de lignes tiennent encore sur cette page.
            const available = bottomLimit - y - minimumHeight - 5;
            const maxLines = Math.max(0, Math.floor(available / lineHeight));
            if (maxLines === 0 && remaining.length > 0) {
                newPage();
                continue;
            }

            // splice prend les premières lignes et les retire de remaining.
            const description = remaining.splice(0, maxLines);
            const height = minimumHeight + description.length * lineHeight;
            drawCard(currentTitle, description, height);
            y += height + 8;
            firstPart = false;

            if (remaining.length > 0) newPage();
        } while (remaining.length > 0);
    }

    function addSolutions() {
        if (y > bottomLimit - 35) newPage();
        textStyle(15, colors.black, true);
        pdf.text("Solutions proposées", margin, y);
        y += 7;
        textStyle(9, colors.gray);
        pdf.text(`${solutions.length} geste(s) adapté(s) à ton évaluation`, margin, y);
        y += 12;

        let number = 1;
        for (const solution of solutions) {
            addSolution(solution, number);
            number++;
        }
        if (solutions.length === 0) {
            textStyle(10, colors.gray);
            pdf.text("Aucune solution correspondante pour cette évaluation.", margin, y);
        }
    }

    function addFooter() {
        const total = pdf.getNumberOfPages();
        for (let page = 1; page <= total; page++) {
            pdf.setPage(page);
            pdf.setDrawColor(colors.border);
            pdf.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
            textStyle(8, colors.gray);
            pdf.text("BADDIES - Informations générales, ne remplace pas un avis médical.", margin, pageHeight - 12);
            pdf.text(`${page} / ${total}`, pageWidth - margin, pageHeight - 12, { align: "right" });
        }
    }

    // Les étapes de création du bilan, dans l’ordre.
    addHeader();
    addSummary();
    addSolutions();
    addFooter();
    pdf.save("BADDIES-bilan.pdf");
}
