import { useContext } from "react";
import { EvalContext } from "./EvalContext";

export function useEvaluation() {
    const context = useContext(EvalContext);
    if (!context) {
        throw new Error("useEvaluation doit être utilisé dans un EvaluationProvider");
    }
    return context;
}