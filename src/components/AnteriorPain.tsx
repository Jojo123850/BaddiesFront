import { useState } from "react";
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";

type Localisation = {
    id: string;
    label: string;
};

const AnteriorPain = () => {
    const [selectedZones, setSelectedZones] = useState<string[]>([]);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null)
    const button = ["btn1", "btn2", "btn3"]

    const localisations: Localisation[] =
        db.evaluation_douleur.localisations;

    const handleZoneClick = (zoneId: string) => {
        setSelectedZones((prev) => {
            if (prev.includes(zoneId)) {
                return prev.filter((id) => id !== zoneId);
            }

            return [...prev, zoneId];
        });
    };

    const handleContinue = () => {
        if (selectedZones.length === 0) return;

        navigate("/Analyse");
    };

    return (
        <>
            {selectedZones.length === 0 && (
                    <p className="answer">Vous devez sélectionner au moins une zone</p>
            )}
         
            <img
                src="../src/assets/images/silohouette-Photoroom.webp"
                className="silhouette"
                alt="silhouette face"
            />

     {localisations.map((localisation) => (
                <button
                    key={localisation.id}
                    onClick={() => handleZoneClick(localisation.id)}
                    className={`btn ${
                        selectedZones.includes(localisation.id)
                            ? "selected"
                            : ""
                    }`}
                >
                    {localisation.label}
                </button>
                
               
            ))}

            <button disabled={selectedZones.length === 0} onClick={handleContinue}className="btn">  Continuer à analyser </button>
            
        </>
    );
};

export default AnteriorPain;