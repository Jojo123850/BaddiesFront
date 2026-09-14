import db from "../data/db.json";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/evaluationContext";

type Niveau = {
    id: string;
    min: number;
    max: number;
    label: string;
};

const IntensityPain = () => {

    const { evaluation, setEvaluation } = useEvaluation();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getIntensity = (value: number): Niveau | undefined => {
        return db.evaluation_douleur.echelle_intensite.niveaux.find(
            (niveau) => value >= niveau.min && value <= niveau.max
        );
    };

    const niveau = getIntensity(evaluation.intensites);

    const startIncrementing = () => {

        setEvaluation((prev) => ({
            ...prev,
            intensites: Math.min(prev.intensites + 1, 10)
        }));

        intervalRef.current = setInterval(() => {

            setEvaluation((prev) => {

                if (prev.intensites >= 10) {
                    stopIncrementing();

                    return {
                        ...prev,
                        intensites: 10
                    };
                }

                return {
                    ...prev,
                    intensites: prev.intensites + 1
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

            {evaluation.intensites === 0 && (
                <p className="answer">
                    Vous devez cliquer avant de continuer
                </p>
            )}

            <div
                className="hand-circle"
                onPointerDown={startIncrementing}
                onPointerUp={stopIncrementing}
                onPointerLeave={stopIncrementing}
            >
                <i className="fa-solid fa-hand-pointer hand-icon"></i>

                {evaluation.intensites === 0 ? "Appuie" : " "}
            </div>

            <button
                disabled={evaluation.intensites === 0}
                onClick={handleContinue}
                className="btn"
            >
                Continuer à analyser
            </button>

            <p className="analyse">
                Maintenez pour sélectionner votre niveau de douleur.
            </p>
        </>
    );
};

export default IntensityPain;