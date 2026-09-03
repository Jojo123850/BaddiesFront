import { useState } from "react";
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";

type Localisation = {
    id: string,
    label: string
}


const positions = {
  pelvis: {
    top: "47%",
    left: "40%",
    width: "25%",
    height: "12%"
  },

  dos: {
    top: "69%",
    left: "41%",
    width: "35%",
    height: "15%"
  },

  cuisse: {
    top: "90%",
    left: "21%",
    width: "25%",
    height: "20%"
  }
};

const   ZonePain  = () =>{
    const [isSelectedZone, setIsSelectedZone] = useState<string | null >(null);
    const navigate = useNavigate();
    const handleContinue = () => {
        if(!isSelectedZone) return;
            navigate("/Analyse")

    }

  const localisations: Localisation[] = db.evaluation_douleur.localisations;
    console.log(db);
    console.log(db.evaluation_douleur);
    console.log(db.evaluation_douleur.localisations);
return(
    <>
        {localisations.map((localisation) => {
            const position = positions[localisation.id as keyof typeof positions]
                console.log("ID :", localisation.id);
                console.log("POSITION :", position);

        
            return(
                
                    <button onClick={() => setIsSelectedZone(localisation.id)} className="zone-douleur" 
                        style={{
                            top: position.top,
                            left: position.left,
                            width: position.width,
                            height: position.height
                        }}
                        > {localisation.label}</button>
                
            )
        })
        
    }

    {isSelectedZone=== null && <p>Vous devez cliquer avant de continuer</p>}
    <button disabled = {isSelectedZone === null} onClick={handleContinue} className="btn">Continuer à analyser</button>
             
          
    </>
)
} 


export default ZonePain;