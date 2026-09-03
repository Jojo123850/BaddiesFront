import db from "../data/db.json";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

type Niveau = {
  id: string;
  min: number;
  max: number;
  label: string;
};

const IntensityPain = () => {
  const [intensity, setIntensity] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getIntensity = (value: number): Niveau | undefined => {
    return db.evaluation_douleur.echelle_intensite.niveaux.find(
      (niveau) => value >= niveau.min && value <= niveau.max
    );
  };

  const niveau = getIntensity(intensity);

  const startIncrementing = () => {
    setIntensity((prev) => Math.min(prev + 1, 10));

    intervalRef.current = setInterval(() => {
      setIntensity((prev) => {
        if (prev >= 10) {
          stopIncrementing();
          return 10;
        }
        return prev + 1;
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
    navigate("/Zone")
  }


  return (
    <>
        <h2 className="analyse">Intensité de la douleur</h2>
        <p className="analyse">Quelle est l’intensité de votre douleur ?</p>
        <p className="analyse">{niveau?.label }</p>
             <div className="hand-circle"  
                onPointerDown={startIncrementing}
                onPointerUp={stopIncrementing}
                onPointerLeave={stopIncrementing}>
                <i className="fa-solid fa-hand-pointer hand-icon"></i>
               
                {intensity === 0 ? "Appuie": " "} 
                
                
          
             </div>
            <button disabled = {intensity === 0} onClick={handleContinue} className="btn">Continuer à analyser</button>
             
             
       
            {intensity === 0 && <p>Vous devez cliquer avant de continuer</p>}
             <p className="analyse">Maintenez pour sélectionner votre niveau 
             de douleur.</p>
    </>
  );
};

export default IntensityPain;