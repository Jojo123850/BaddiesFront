import { createContext } from "react";

export type Evaluation = {
    intensiteNiveau: string | null,
    intensiteValeur: number | null,
    localisations: string[],
    contextes: string | null,
    symptomes: string[],
    option: string | null
}

export type EvaluationContextType = {
    evaluation: Evaluation
    setEvaluation: React.Dispatch<React.SetStateAction<Evaluation>>;
}

export const EvalContext = createContext<EvaluationContextType | null>(null);