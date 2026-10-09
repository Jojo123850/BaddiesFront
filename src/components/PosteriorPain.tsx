import db from "../data/db.json";
import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import silhouette from "../assets/images/silohouette-Photoroom.webp";

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
        <>
        <div className="body-container">
                {evaluation.localisations.length=== 0 && (
                        <p className="answer">Vous devez sélectionner au moins une zone</p>
                )}
            
                 <img
                    src={silhouette}
                    className="silhouette"
                    alt="Silhouette vue de dos"
                />

                {dos && (
                    <button
                        key={dos.id}
                        onClick={() => handleZoneClick(dos.id)}
                        className={`btn1 ${dos.id} ${
                            evaluation.localisations.includes(dos.id)
                                ? "selected"
                                : ""
                        }`}
                    >
                        {dos.label}
                    </button>
                )
            }
                
                <button disabled={evaluation.localisations.length === 0} onClick={handleContinue}className="btn">  Continuer à analyser </button>
        </div>
            
        </>
    );
};

export default PosteriorPain;