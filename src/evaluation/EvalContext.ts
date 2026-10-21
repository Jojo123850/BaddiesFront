
import { createContext } from "react";

// Les informations de l'évaluation
export type Evaluation = {
    intensiteNiveau: string | null;
    intensiteValeur: number | null;
    localisations: string[];
    contextes: string | null;
    symptomes: string[];
    option: string | null;
};

// Ce que le contexte fournit aux composants
export type EvaluationContextType = {
    evaluation: Evaluation;
    setEvaluation: React.Dispatch<React.SetStateAction<Evaluation>>;
    resetEvaluation: () => void;
};

// Création du contexte
export const EvalContext = createContext<EvaluationContextType | null>(null);
