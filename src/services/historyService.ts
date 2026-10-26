
import type { HistoryEvaluation } from "./localStorageService"
import { BASE_URL, fetchWithAuth } from "./apiService"

const API_URL = `${BASE_URL}/api/v1/history`

// Structure des erreurs renvoyées par Express
type ApiError = {
    detail?: string
    title?: string
    message?: string
    error?: string
}

// Structure des historiques provenant de PostgreSQL
type HistoryFromApi = HistoryEvaluation & {
    created_at: string
}

// Lire une réponse JSON et vérifier son statut
async function readResponse<T>(
    response: Response
): Promise<T> {
    const data: unknown = await response.json().catch(() => null)

    if (!response.ok) {
        const error = data as ApiError | null

        throw new Error(
            error?.detail ||
            error?.title ||
            error?.message ||
            error?.error ||
            `Erreur HTTP : ${response.status}`
        )
    }

    return data as T
}

// Convertir la date PostgreSQL en propriété date
function formatHistory(
    history: HistoryFromApi
): HistoryEvaluation {
    return {
        ...history,
        date: history.created_at
    }
}

// CRÉER UN HISTORIQUE
export async function createHistory(
    evaluation: HistoryEvaluation["evaluation"],
    solutions: HistoryEvaluation["solutions"]
): Promise<HistoryEvaluation> {
    const response = await fetchWithAuth(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            evaluation,
            solutions
        })
    })

    const data = await readResponse<{
        history: HistoryFromApi
    }>(response)

    if (!data?.history) {
        throw new Error(
            "Réponse invalide lors de la création de l'historique."
        )
    }

    return formatHistory(data.history)
}

// RÉCUPÉRER TOUS LES HISTORIQUES
export async function getHistory(): Promise<HistoryEvaluation[]> {
    const response = await fetchWithAuth(API_URL, {
        method: "GET"
    })

    const data = await readResponse<{
        history: HistoryFromApi[]
    }>(response)

    if (!Array.isArray(data?.history)) {
        throw new Error(
            "La liste des historiques reçue est invalide."
        )
    }

    return data.history.map(formatHistory)
}

// RÉCUPÉRER UN HISTORIQUE PAR ID
export async function getHistoryById(
    id: string
): Promise<HistoryEvaluation> {
    const response = await fetchWithAuth(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "GET"
        }
    )

    const data = await readResponse<{
        history: HistoryFromApi
    }>(response)

    if (!data?.history) {
        throw new Error(
            "L'épisode demandé est introuvable ou invalide."
        )
    }

    return formatHistory(data.history)
}

// SUPPRIMER UN HISTORIQUE
export async function deleteHistory(
    id: string
): Promise<void> {
    const response = await fetchWithAuth(
        `${API_URL}/${encodeURIComponent(id)}`,
        {
            method: "DELETE"
        }
    )

    if (!response.ok) {
        await readResponse(response)
    }
}
