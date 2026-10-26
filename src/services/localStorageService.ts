
import type { Evaluation } from "../evaluation/EvalContext"

export type HistoryEvaluation = {
    id: string
    date: string
    evaluation: Evaluation
    solutions: {
        id: string
        label: string
        description: string
    }[]
}

const STORAGE_KEY = "historique"

// Lire les évaluations enregistrées localement
export function getEvaluations(): HistoryEvaluation[] {
    try {
        const historique = localStorage.getItem(STORAGE_KEY)

        if (!historique) {
            return []
        }

        const data: unknown = JSON.parse(historique)

        // Vérifier que le stockage contient un tableau
        if (!Array.isArray(data)) {
            return []
        }

        // Vérifier les champs essentiels
        return data.filter(
            (item): item is HistoryEvaluation =>
                item !== null &&
                typeof item === "object" &&
                typeof item.id === "string" &&
                typeof item.date === "string" &&
                item.evaluation !== null &&
                typeof item.evaluation === "object" &&
                Array.isArray(item.solutions)
        )

    } catch {
        // Stockage inaccessible ou JSON invalide
        return []
    }
}

// Enregistrer localement une nouvelle évaluation
export function saveEvaluation(
    evaluation: Evaluation,
    solutions: HistoryEvaluation["solutions"]
): HistoryEvaluation {
    const historyEvaluation = getEvaluations()

    const newEvaluation: HistoryEvaluation = {
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        evaluation,
        solutions
    }

    // Ajouter l'évaluation à l'historique
    historyEvaluation.push(newEvaluation)

    // Enregistrer le tableau dans LocalStorage
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(historyEvaluation)
    )

    return newEvaluation
}
