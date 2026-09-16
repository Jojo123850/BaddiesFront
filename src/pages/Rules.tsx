import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import { useEffect } from "react";

// regle de sécurite db
export function RulesAlert(){
    const {evaluation} = useEvaluation()
    const navigate = useNavigate()

    useEffect(() => {
        const douleurIntense =
            evaluation.intensiteNiveau === "intense"

        const douleurInhabituelle =
            evaluation.option === "a_change" ||
            evaluation.option=== "nouvelle_ou_bien_plus_forte"

        const symptomePreoccupant =
            evaluation.symptomes.includes('Malaise') ||
            evaluation.symptomes.includes('Vomissement')
        
        const situationNonBaddies = (douleurInhabituelle && douleurIntense) || symptomePreoccupant
        
        if(situationNonBaddies){
            navigate("/Alerte")    
        }else{
            navigate("/Solution")
        }
    },[evaluation, navigate])
    

    return(
        <>
            <h2>Analyse en cours</h2>
            <div className="loader"></div>
        </>
    )
}