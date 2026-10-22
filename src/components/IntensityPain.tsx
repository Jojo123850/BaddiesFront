import db from "../data/db.json";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import { Pointer } from "lucide-react";
import "../styles/analyse.scss";


type Niveau = {
    id: string;
    min: number;
    max: number;
    label: string;
};

const IntensityPain = () => {

    const { evaluation, setEvaluation } = useEvaluation();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getIntensity = (value: number | null): Niveau | undefined => {
    if (value === null) 
        return undefined;

    return db.evaluation_douleur.echelle_intensite.niveaux.find(
        (niveau) => value >= niveau.min && value <= niveau.max
    );
};

    const niveau = getIntensity(evaluation.intensiteValeur);
    
const startIncrementing = () => {
    if (intervalRef.current !== null) return;
    // stopIncrementing();

    setEvaluation((prev) => ({
        ...prev,
        intensiteValeur:
            prev.intensiteValeur === 10
                ? 1
                : Math.min((prev.intensiteValeur ?? 0) + 1, 10),
        intensiteNiveau: null
    }));

    intervalRef.current = setInterval(() => {
        setEvaluation((prev) => {
            const current = prev.intensiteValeur ?? 0;

            if (current >= 10) {
                stopIncrementing();
                return prev;
            }

            return {
                ...prev,
                intensiteValeur: current + 1,
                intensiteNiveau: null
            };
        });
    }, 400);
};

    const stopIncrementing = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const navigate = useNavigate();

    const handleContinue = () => {
    if (evaluation.intensiteValeur === null || !niveau) return;

    setEvaluation(prev => ({
        ...prev,
        intensiteNiveau: niveau.id
    }));

    navigate("/Zone");
};

    return (
        <>
            <h2 className="analyse">
                Intensité de la douleur
            </h2>

            <p className="analyse">
                Quelle est l’intensité de votre douleur ?
            </p>

            <p className="answerPain">
                {niveau?.label}
            </p>   

             {evaluation.intensiteValeur === null &&  
            < p className="analyseAlert"> 
                Maintenez pour sélectionner votre niveau de douleur.
            </p>} 
            <p className="analyseAlert">
                {evaluation.intensiteValeur === 10 
                    ? "Intensité maximale. Appuyez à nouveau pour recommencer à la douleur légère."
                    : ""}
            </p>
                    

            <div  className="hand-circle"  onPointerDown={startIncrementing}            onPointerUp={stopIncrementing} onPointerLeave={stopIncrementing}  >
               <Pointer  className="hand-icon"  size={35}  strokeWidth={1.8}  aria-hidden="true"  />
               {evaluation.intensiteValeur === null ? "Appuie" : `${evaluation.intensiteValeur}/10`}
            </div> 
            <div className="btn-container">
                <button disabled={evaluation.intensiteValeur === 0 || evaluation.intensiteValeur === null}  onClick=         {handleContinue}  className="btn" >
                    Continuer à analyser
                </button>
            </div>

            
        </>
    );
};

export default IntensityPain;