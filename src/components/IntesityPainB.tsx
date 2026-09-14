import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/evaluationContext";

export type Intensité = {
    id:string,
    label: string
} 


export default function IntensityPainB () {
     const { evaluation, setEvaluation } = useEvaluation();

    const navigate = useNavigate();
    const handleContinue = () => {
        if (evaluation.intensites === null) return;
        navigate("/Zone");
    };
      return ( 
        <>
        <h2 className="analyse">Intensité de la douleur</h2>
        <p className="analyse">Quelle est l’intensité de votre douleur ?</p>
        {evaluation.intensites === null && <p className="answer"> Vous devez cliquer avant de continuer</p>}
        <div className="intensity-btn">
           {db.evaluation_douleur.echelle_intensite.niveaux.map((item) => (
                    <button
                        key={item.id}
                        className={`btnIntensity ${
                            evaluation.intensites === item.id
                                ? "selected"
                                : ""
                        }`}
                        onClick={() =>
                            setEvaluation((prev) => ({
                                ...prev,
                                intensites: item.id
                            }))
                        }
                    >
                        {item.label}
                    </button>
                ))}

             <button disabled = {evaluation.intensites === null} onClick={handleContinue} className="btn">Continuer à analyser</button>
        </div>
        </>
       
      
)}

