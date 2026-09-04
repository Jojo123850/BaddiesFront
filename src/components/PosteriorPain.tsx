import { useState } from "react";
import db from "../data/db.json";
import { useNavigate } from "react-router-dom";

type Localisation = {
    id: string,
    label: string
}


// const positions = {
//   pelvis: {
//     top: "47%",
//     left: "40%",
//     width: "25%",
//     height: "12%"
//   },

//   dos: {
//     top: "69%",
//     left: "41%",
//     width: "35%",
//     height: "15%"
//   },

//   cuisse: {
//     top: "90%",
//     left: "21%",
//     width: "25%",
//     height: "20%"
//   }
// };

const   PosteriorPain  = () =>{
    const [isSelectedZone, setIsSelectedZone] = useState<string | null >(null);
    const navigate = useNavigate();
    const handleContinue = () => {
        if(!isSelectedZone) return;
            navigate("/Analyse")

    }

  const localisations: Localisation[] = db.evaluation_douleur.localisations;
return(
    <>
        {localisations.map((localisation) => {
            return( 
            <>
             <img src="../src/assets/images/back.webp" className="silhouette" alt="silhouette dos" /> 
            <button
                key={localisation.id} 
                onClick={() => setIsSelectedZone(localisation.id)}
                className="btn"
                >
                {localisation.label}
            </button>   
                </> 
            )
        }) 
    }

    {isSelectedZone=== null && <p>Vous devez cliquer avant de continuer</p>}
    <button disabled = {isSelectedZone === null} onClick={handleContinue} className="btn">Continuer à analyser</button> 
    </>
)
} 


export default PosteriorPain;