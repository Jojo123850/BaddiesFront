import { useState } from "react";
// import { ShieldCheck } from "lucide-react";
import { useEvaluation } from "../evaluation/useEvaluation";
import "../styles/dataPrivacy.scss";
import  { Link, useNavigate } from "react-router-dom";
type dataPrivacyProps= {
    onAccept?: ( ) => void;
    onRefuse?: () => void;
}
export function DataPrivacy({onAccept, onRefuse}:dataPrivacyProps){
    const [accepted, setAccepted] = useState(false)
    const navigate = useNavigate()
    const { resetEvaluation } = useEvaluation();
    const [error, setError] = useState("")

    const handleRefuse = ()=> {
        localStorage.removeItem("consentment-RGPD")

        if(onRefuse){
            onRefuse();
        }else{
            navigate("/Home")
        }
    } 
    const handleAccept = () => {
        if(!accepted){
            setError("Veuiilez accepter avant de continuer")
            return 
        };

        setError("")
        localStorage.setItem("consentment-RGPD",JSON.stringify({accepted:true,version: "1.0", date: new Date().toString()}))
        if(onAccept){
            onAccept()
        }else{
            resetEvaluation()
            navigate("/analyse")
        }
    }

    return(
        <>
            <div className="protection-card">
        {/* <ShieldCheck size={40} aria-hidden="true" /> */}

        <h1>Vos données, votre choix</h1>

        <p>
          BADDIES utilise les informations relatives à vos
          douleurs menstruelles, leur intensité, leur
          localisation et vos symptômes afin de vous proposer
          des conseils adaptés.
        </p>
        
        

        <p>
            Vos données restent sur cet appareil  
        </p>

      
       

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) =>
              {setAccepted(event.target.checked)
              setError("")}
            }
          />

          <span>
            Je consens explicitement au traitement de mes
            données de santé pour réaliser mon évaluation
            et obtenir des conseils adaptés.
          </span>

        </label>

          {error && (
            <p className="errorPara">
                {error}
            </p>

          )}
             <br />
          <Link to="/PrivacyPolicy" className="link">
          Consulter la politique de confidentialité
        </Link>
        <div className="consent-actions">
            <button type="button" onClick={handleRefuse} className="btn">
                Refuser
            </button>

            <button type="button" onClick={handleAccept} className="btn" >
                Accepter et continuer
            </button>
        </div>
      </div>
    </>
    )
}