// import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useState } from "react";


export type Symptom = {
    id:string,
    label: string
} 


export default function Symptom () {
    const [selectSymptom, setSelectSymptom] = useState<string [] >([]);
    const handleChange = (id: string) => {
    if (id === "aucun") {
        setSelectSymptom(["aucun"]);
        return;
    }

    setSelectSymptom(prev => [
        ...prev.filter(item => item !== "aucun"),
        id
    ]);
};
      return ( 
        <>
       
            <h2 className="analyse">Avez-vous également </h2>

        <div className="intensity-btn">
            {db.evaluation_douleur.symptomes.map((item) => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        id={item.id}
                        checked={selectSymptom.includes(item.id)}
                        onChange={() => handleChange(item.id)}
                    />

                    <label
                        htmlFor={item.id}
                        className={selectSymptom.includes(item.id) ? "selected" : ""}
                    >
                        {item.label}
                    </label>
                </div>
                    ))}
        </div>

        </>
       
      
)}

