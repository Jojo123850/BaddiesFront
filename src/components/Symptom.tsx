import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

export type Symptom = {
    id: string;
    label: string;
};

export default function Symptom() {
    const { evaluation, setEvaluation } = useEvaluation();

    const handleChange = (id: string) => {
        if (id === "aucun") {
            setEvaluation(prev => ({
                ...prev,
                symptomes: ["aucun"]
            }));
            return;
        }

        setEvaluation(prev => ({
            ...prev,
            symptomes: [
                ...prev.symptomes.filter(item => item !== "aucun"),
                ...(prev.symptomes.includes(id) ? [] : [id])
            ]
        }));
    };

    return (
        <>
            <h2 className="analyse">Avez-vous également</h2>

            <div className="intensity-btn">
                {db.evaluation_douleur.symptomes.map((item) => (
                    <div key={item.id}>
                        <input
                            type="checkbox"
                            id={item.id}
                            checked={evaluation.symptomes.includes(item.id)}
                            onChange={() => handleChange(item.id)}
                        />

                        <label
                            htmlFor={item.id}
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
        </>
    );
}