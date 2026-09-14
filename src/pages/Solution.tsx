import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";
import { useEvaluation } from "../evaluation/useEvaluation";


export default function Solution (){
    const {evaluation} = useEvaluation()

     const navigate = useNavigate();

    const handleContinue = () => {
        if (Symptom === null) return;
        navigate("/Home");
    };
    return(
        <>
             <Navbar/>
                    <div className="switch">
                        <Link to="/Localisation" className="retour">
                                <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                        <button className="btn">Ajouter au favoris</button>
                    </div>
            <section>
                <p>Intensité sélectionnée : {evaluation.intensiteValeur}</p>
                <p>Niveau : {evaluation.intensiteNiveau}</p>
                <p>Localisations : {evaluation.localisations.join(", ")}</p>
                
                <p>Contextes : {evaluation.contextes?.join(", ")}</p>
            </section>
            <section>
                <div>
                     <Symptom/>  
                </div>
                <div>
                    <Character/>
                </div>
            </section>
         
         
             <button disabled = {Symptom === null} onClick={handleContinue} className="btn">Voir les solutions</button>

        </>
    )
}