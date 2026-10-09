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
        <>
        <div className="body-container">
                {evaluation.localisations.length=== 0 && (
                        <p className="answer">Vous devez sélectionner au moins une zone</p>
                )}
            
                <img
                    src={silhouette}
                    className="silhouette"
                    alt="Silhouette vue de face"
                />

                {localisations.map((localisation) => (
                <button
                    key={localisation.id}
                    onClick={() => handleZoneClick(localisation.id)}
                    className={`btn1 ${localisation.id} ${
                        evaluation.localisations.includes(localisation.id)
                            ? "selected"
                            : ""
                    }`}
                >
                    {localisation.label}
                </button>
            ))}
                
                <button disabled={evaluation.localisations.length === 0} onClick={handleContinue}className="btn">  Continuer à analyser </button>
        </div>
            
        </>
    );
};

export default AnteriorPain;