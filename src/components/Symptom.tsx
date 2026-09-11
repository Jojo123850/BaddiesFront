// import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useState } from "react";


export type Symptom = {
    id:string,
    label: string
} 


export default function Symptom () {
    const [selectSymptom, setSelectSymptom] = useState<string | null>(null);
    const [isActive, setIsActive] = useState(false)
    const handleChange = () => {
    setIsActive(true); 
     };
    // const navigate = useNavigate();
    // const handleContinue = () => {
    //     if (selectSymptom === null) return;
    //     navigate("/Analyse");
    // };
      return ( 
        <>
        
        <h2 className="analyse">Avez-vous également </h2>
        <div className="intensity-btn">
            {db.evaluation_douleur.symptomes.map((item) => (
                <>
                  <div>
                    <input type="checkbox" id="scales" name="scales"  checked={isActive == "Aucun"} onChange={() => handleChange(item.id)}/>
                    <label  key={item.id} className={`${selectSymptom === item.id ? "selected" : ""}`} onClick={()=>setSelectSymptom(item.id )}>{item.label}
                    </label>
                </div>
                </>
           
            ))}

        </div>

        </>
       
      
)}

