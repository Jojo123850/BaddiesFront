import { createContext } from "react";

// les infos à conserver
export type Evaluation = {
    intensiteNiveau: string | null,
    intensiteValeur: number | null,
    localisations: string[],
    contextes: string | null,
    symptomes: string[],
    option: string | null
}

// définir ce que le contexte va fournir aux composants,setEval reçoit Evaluation
export type EvaluationContextType = {
    evaluation: Evaluation
    setEvaluation: React.Dispatch<React.SetStateAction<Evaluation>>;
}

// création contexte 
export const EvalContext = createContext<EvaluationContextType | null>(null);