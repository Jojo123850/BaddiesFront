import { useState } from "react";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

export type Symptom = {
    id: string;
    label: string;
};

export default function Symptom() {
    const { evaluation, setEvaluation } = useEvaluation();
    const [isOpen, setIsOpen] = useState(
    evaluation.symptomes.length > 0 &&
    !evaluation.symptomes.includes("aucun")
    );

    const isYesSelected = isOpen;
    const isNoSelected = evaluation.symptomes.includes("aucun");


    const handleYes = () => {
        setIsOpen(true);

        setEvaluation((prev) => ({
            ...prev,
            symptomes: prev.symptomes.filter((id) => id !== "aucun")
        }));
    };

    const handleNo = () => {
        setIsOpen(false);

        setEvaluation((prev) => ({
            ...prev,
            symptomes: ["aucun"]
        }));
    };

    const handleChange = (id: string) => {
        setEvaluation((prev) => {
            const symptomesSansAucun = prev.symptomes.filter(
                (item) => item !== "aucun"
            );

            return {
                ...prev,
                symptomes: symptomesSansAucun.includes(id)
                    ? symptomesSansAucun.filter((item) => item !== id)
                    : [...symptomesSansAucun, id]
            };
        });
    };

  

    return (
        <section aria-labelledby="symptoms-title">
            <h2 id="symptoms-title" className="analyse">
                Avez-vous également d'autres symptômes ?
            </h2>

           <div className="settings-form-actions">
            <button type="button" onClick={handleYes} className={`settings-save-btn ${isYesSelected ? "selected" : ""}`} aria-pressed={isYesSelected}>
                Oui
            </button>

            <button type="button" onClick={handleNo} className={`settings-cancel-btn ${isNoSelected ? "selected" : ""}`} aria-pressed={isNoSelected}>
                Non
            </button>
            </div>

            {isOpen && (
                <div className="intensity-btn">
                    {db.evaluation_douleur.symptomes
                        .filter((item) => item.id !== "aucun")
                        .map((item) => (
                            <div key={item.id}>
                                <input
                                    type="checkbox"
                                    id={`symptom-${item.id}`}
                                    name="symptomes"
                                    value={item.id}
                                    checked={evaluation.symptomes.includes(item.id)}
                                    onChange={() => handleChange(item.id)}
                                />

                                <label
                                    htmlFor={`symptom-${item.id}`}
                                    className={
                                        evaluation.symptomes.includes(item.id)
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                </div>
            )}
        </section>
    );
}