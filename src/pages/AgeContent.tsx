import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import "../styles/recap.scss";

type Age = {
    id: string;
    age: string;
  
};
const ages: Age[] = [
    {
        id: "-12ans",
        age: "Moins de 12ans"
       
    },
    {
        id: "12-14ans",
        age: "Entre 12ans à 14ans",
      
    },
    {
        id: "+15ans",
        age: "15 ans et plus",
      
    },

];

export default function Age(){
         const [selectedAge, setSelectedAge] = useState<string | null>(null);
        const [savedAge] = useState(() => localStorage.getItem("baddies-age"));
        const navigate = useNavigate()

     useEffect (() => {
        if(savedAge === "-12ans" || savedAge ==="12-14ans" || savedAge ==="+15ans"){
              navigate("/Home", { replace: true });
        }
     } , [savedAge,navigate])  


        const handleContinue = () => {
        if (!selectedAge) return;

        localStorage.setItem("baddies-age", selectedAge);
        navigate("/Home", { replace: true });
    }

     if (savedAge === "-12" || savedAge ==="12-14" || savedAge ==="+15") {
        return null;
    }

        
    return(
        <>
            <h1>Quel age avez-vous</h1>
          <div role="group" aria-label="Choix du pays" className="intensity-btn">
                    {ages.map((item) => (
                        <button key={item.id} type="button" className={`age ${selectedAge === item.id ? "selected" : ""}`} aria-pressed={selectedAge === item.id} onClick={() => setSelectedAge(item.id)}>
                      
                            {selectedAge === item.id && (
                                <span className="check">
                                    <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                                </span>
                            )}
                            <span className="text">{item.age}</span>

                        </button>
                    ))}
                </div>
        <button className="btn" onClick={handleContinue} disabled={!selectedAge}>Continuer</button>
        </>
    )
}