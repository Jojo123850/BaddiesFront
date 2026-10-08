import type { HistoryEvaluation } from "./localStorageService";

const API_URL = "http://localhost:3001/api/v1/history";


export async function createHistory(
    evaluation: HistoryEvaluation["evaluation"],
    solutions: HistoryEvaluation["solutions"]
) {
    const token = localStorage.getItem("token");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            evaluation,
            solutions
        })
    });

    if (!response.ok) {
        const error = await response.json();

        console.log("Erreur création historique :", error);

        throw new Error("Impossible d'enregistrer l'historique");
    }

    const data = await response.json();

  return {
    ...data.history,
    date: data.history.created_at
};
}

// Récupérer l'historique du compte connecté
export async function getHistory(): Promise<HistoryEvaluation[]> {
    // pour savoir qui veut récuperer l'historique
    const token = localStorage.getItem("token");
    if(!token){
        throw  Error("Impossible de récuperer l'historique");
    }
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
    const error = await response.json();
    console.log("Erreur API :", response.status, error);

    throw new Error("Impossible de récupérer l'historique");
}

    const data = await response.json();

    console.log("Historique reçu :", data.history);

    return data.history.map(
    (item: HistoryEvaluation & { created_at: string }) => ({
        ...item,
        date: item.created_at
    })
);
}


export async function getHistoryById(
    id: string
): Promise<HistoryEvaluation> {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();

        console.log("Erreur épisode :", error);

        throw new Error("Impossible de récupérer l'épisode");
    }

    const data = await response.json();

    return {
        ...data.history,
        date: data.history.created_at
    };
}