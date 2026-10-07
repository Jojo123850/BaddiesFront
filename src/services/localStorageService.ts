import type { Evaluation } from "../evaluation/EvalContext";

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


// enregistrer localement l'évaluation
export function saveEvaluation(
    evaluation:Evaluation,
     solutions:{
        id:string,
        label:string,
        description:string}[]

){
    const historique = localStorage.getItem("historique")
// si ça existe transforrme le en tableau sinon crée un tableau vide
    const historyEvaluation: HistoryEvaluation[] = historique ? JSON.parse(historique): []

    console.log(historyEvaluation)

    const newEvaluation: HistoryEvaluation = {
        // génère un identifiant unique
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        evaluation: evaluation,
        solutions:solutions

    }
    console.log(newEvaluation)
    historyEvaluation.push(newEvaluation)
    localStorage.setItem ("historique", JSON.stringify(historyEvaluation))

}