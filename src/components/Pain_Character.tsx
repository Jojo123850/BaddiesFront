import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

export type Pain_Character = {
    id: string;
    label: string;
};


export default function Character() {
    const { evaluation, setEvaluation } = useEvaluation();

    const handleChange = (id: string) => {
        setEvaluation(prev => ({
            ...prev,
            option: prev.option === id ? null : id
        }));
    };

    return (
        <>
            <h2 className="analyse">
                Cette douleur est-elle inhabituelle pour vous ?
            </h2>

            <article className="intensity-btn">
                {db.evaluation_douleur.caractere_habituel.options.map((item) => (
                    <div key={item.id}>
                        <input  type="radio" id={item.id}  name="character" value={item.id}  checked={evaluation.option === item.id}  onChange={() => handleChange(item.id)}  />
                        <label htmlFor={item.id}  className={ evaluation.option === item.id ? "selected" : ""}  >  
                            {item.label}
                        </label> 
                    </div>
                ))}
            </article>
        </>
    );
}