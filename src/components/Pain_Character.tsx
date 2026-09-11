import db from "../data/db.json";
import { useState } from "react";


export type Pain_Character= {
    id:string,
    label: string
} 


export default function Character() {
    const [selectCharacter, setSelectCharacter] = useState<string | null>(null);

    const handleChange = (id:string) => {
    setSelectCharacter(prev => (prev === id ? null : id)); 
     };

 
      return ( 
        <>
        <h2 className="analyse">Cette douleur est-elle inhabituelle pour vous ? </h2>
        <article className="intensity-btn">
            {db.evaluation_douleur.caractere_habituel.options.map((item) => (
                <>
                  <div>
                    <input
                        type="radio"
                        id={item.id}
                        name="character"
                        value={item.id}
                        checked={selectCharacter === item.id}
                        onChange={() => handleChange(item.id)}
                    />
                    
                    <label  key={item.id} className={`${selectCharacter === item.id ? "selected" : ""}`} onClick={()=>setSelectCharacter(item.id )}>{item.label}
                    </label>
                </div>
                </>
            ))}
        </article>
          
        </>
       
      
)}

