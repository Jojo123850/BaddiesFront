import {  useState } from "react";
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";



const PosteriorPain = () => {
    const [selectedZones, setSelectedZones] = useState<string[]>([]);
    const navigate = useNavigate();
    // const [activeZone, setAtiveZone] = useState(false)

    // const toggleSection = ()=> {
    //     setAtiveZone((prev)=> !prev);
    // });


  const dos = db.evaluation_douleur.localisations.find(
    (localisation) => localisation.id === "dos"
);

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

        navigate("/Localisation");
    };

    return (
        <>
        
        <div className="body-container">
                {selectedZones.length === 0 && (
                        <p className="answer">Vous devez sélectionner au moins une zone</p>
                )}
            
                <img
                    src="../src/assets/images-source/back.png"
                    className="silhouette"
                    alt="silhouette face"
                />

                {dos && (
                <button
                    key={dos.id}
                    onClick={() => handleZoneClick(dos.id)}
                    className={`btn1 ${dos.id} ${
                        selectedZones.includes(dos.id) ? "selected" : ""
                    }`}
                >
                    {dos.label}
                </button>
                )}

                <button disabled={selectedZones.length === 0} onClick={handleContinue}className="btn">  Continuer à analyser </button>
        </div>
            
        </>
    );
};

export default PosteriorPain;