
import { useState } from "react";
import { EvalContext, type Evaluation } from "./EvalContext";

// initialiser l'évaluation lorsque la personne veut faire une nouvelle évaluation
const createInitialEvaluation= (): Evaluation => ({
    intensiteNiveau: null,
    intensiteValeur: null,
    localisations: [],
    contextes: null,
    symptomes: [],
    option: null
});


export function EvaluationProvider({ children }: { children: React.ReactNode }) {
    const [evaluation, setEvaluation] = useState<Evaluation>(createInitialEvaluation);

    const resetEvaluation = () => {
        setEvaluation(createInitialEvaluation());
    };

    return (
        <EvalContext.Provider value={{ evaluation, setEvaluation,resetEvaluation }}>
            {children}
        </EvalContext.Provider>
    );
}
