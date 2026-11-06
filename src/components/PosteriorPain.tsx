
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import silhouette from "../assets/images/silohouette2.png";

const PosteriorPain = () => {
    const { evaluation, setEvaluation } = useEvaluation();
    const navigate = useNavigate();

    const dos = db.evaluation_douleur.localisations.find(
        (localisation) => localisation.id === "dos"
    );

    const handleZoneClick = (zoneId: string) => {
        setEvaluation((prev) => {
            if (prev.localisations.includes(zoneId)) {
                return {
                    ...prev,
                    localisations: prev.localisations.filter(
                        (id) => id !== zoneId
                    )
                };
            }

            return {
                ...prev,
                localisations: [...prev.localisations, zoneId]
            };
        });
    };

    const handleContinue = () => {
        if (evaluation.localisations.length === 0) return;

        navigate("/Localisation");
    };

    return (
        <div className="silhouette-container">
            <p className="answer" aria-live="polite">
                {evaluation.localisations.length === 0
                    ? "Vous devez sélectionner au moins une zone."
                    : `${evaluation.localisations.length} zone(s) sélectionnée(s).`}
            </p>

            <img src={silhouette} className="silhouette" alt="Silhouette du corps vue de dos" />

            {dos && (
                <button type="button" onClick={() => handleZoneClick(dos.id)} aria-pressed={evaluation.localisations.includes(dos.id)} className={`btn1 ${dos.id} ${evaluation.localisations.includes(dos.id) ? "selected" : ""}`}>
                    {dos.label}
                </button>
            )}

            <div className="btn-container">
                <button type="button" disabled={evaluation.localisations.length === 0} onClick={handleContinue} className="btn">
                    Continuer à analyser
                </button>
            </div>
        </div>
    );
};

export default PosteriorPain;
