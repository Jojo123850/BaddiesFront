import { useState } from "react";
import { EvalContext, type Evaluation } from "./EvalContext";

export function EvaluationProvider({ children }: { children: React.ReactNode }) {
    const [evaluation, setEvaluation] = useState<Evaluation>({
        intensiteNiveau: null,
        intensiteValeur: null,
        localisations: [],
        contextes: null,
        symptomes: [],
        option: null
    });

    return (
        <EvalContext.Provider value={{ evaluation, setEvaluation }}>
            {children}
        </EvalContext.Provider>
    );
}