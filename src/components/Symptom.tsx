
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

export type Symptom = {
    id: string;
    label: string;
};

export default function Symptom() {
    const { evaluation, setEvaluation } = useEvaluation();


const handleChange = (id: string) => {
    setEvaluation((prev) => {
        if (id === "aucun") {
            return {
                ...prev,
                symptomes: prev.symptomes.includes("aucun") ? [] : ["aucun"]
            };
        }

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

            <div className="intensity-btn">
                {db.evaluation_douleur.symptomes.map((item) => (
                    <div key={item.id}>
                        <input type="checkbox" id={`symptom-${item.id}`} name="symptomes" value={item.id} checked={evaluation.symptomes.includes(item.id)} onChange={() => handleChange(item.id)} />

                        <label htmlFor={`symptom-${item.id}`} className={evaluation.symptomes.includes(item.id) ? "selected" : ""}>
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>
        </section>
    );
}
