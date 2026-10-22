
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import silhouette from "../assets/images/silohouette-Photoroom.webp";

type Localisation = {
    id: string;
    label: string;
};

const AnteriorPain = () => {
    const { evaluation, setEvaluation } = useEvaluation();
    const navigate = useNavigate();

    const localisations: Localisation[] =
        db.evaluation_douleur.localisations.filter(
            (localisation) => localisation.id !== "dos"
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
        <div className="body-container">
            <p className="answer" aria-live="polite">
                {evaluation.localisations.length === 0
                    ? "Vous devez sélectionner au moins une zone."
                    : `${evaluation.localisations.length} zone(s) sélectionnée(s).`}
            </p>

            <img src={silhouette} className="silhouette" alt="Silhouette du corps vue de face" />

            {localisations.map((localisation) => (
                <button type="button" key={localisation.id} onClick={() => handleZoneClick(localisation.id)} aria-pressed={evaluation.localisations.includes(localisation.id)} className={`btn2 ${localisation.id} ${evaluation.localisations.includes(localisation.id) ? "selected" : ""}`}>
                    {localisation.label}
                </button>
            ))}

            <div className="btn-container">
                <button type="button" disabled={evaluation.localisations.length === 0} onClick={handleContinue} className="btn">
                    Continuer à analyser
                </button>
            </div>
        </div>
    );
};

export default AnteriorPain;
