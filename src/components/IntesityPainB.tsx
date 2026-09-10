import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useState } from "react";

export type Intensité = {
    id:string,
    label: string
} 


export default function IntensityPainB () {
    const [selectIntensity, setSelectIntensity] = useState<string | null>(null);

    const navigate = useNavigate();
    const handleContinue = () => {
        if (selectIntensity === null) return;
        navigate("/Zone");
    };
      return ( 
        <>
        <h2 className="analyse">Intensité de la douleur</h2>
        <p className="analyse">Quelle est l’intensité de votre douleur ?</p>
        {selectIntensity === null && <p className="answer"> Vous devez cliquer avant de continuer</p>}
        <div className="intensity-btn">
            {db.evaluation_douleur.echelle_intensite.niveaux.map((item) => (
                <>
                    <button  key={item.id} className={`btnIntensity ${selectIntensity === item.id ? "selected" : ""}`} onClick={()=>setSelectIntensity(item.id )}>{item.label}</button>
                </>
           
            ))}

             <button disabled = {selectIntensity === null} onClick={handleContinue} className="btn">Continuer à analyser</button>
        </div>
        </>
       
      
)}

