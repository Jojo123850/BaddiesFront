import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";
import { useEvaluation } from "../evaluation/useEvaluation";
import legere from "../assets/images/legere.webp";
import moderee from "../assets/images/moderee.webp";
import intense from "../assets/images/intense.webp";





export default function Recap (){
    const {evaluation} = useEvaluation()
    const intensityImages : Record<string, string> ={
        legere,
        moderee,
        intense 
    }

    const intensityImage = evaluation.intensiteNiveau
    ? intensityImages[evaluation.intensiteNiveau]
    : null;

    const navigate = useNavigate();
    const isInComplete = evaluation.symptomes.length === 0 || evaluation.option === null;
    const handleContinue = () => {
    if (isInComplete) return;
  
    navigate("/Analyse de réponse");
    };

   
    return(
        <>
             <Navbar/>
                    <div className="switch">
                        <Link to="/Localisation" className="retour">
                                <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                        
                    </div>
            <section>
                    <h2>Recapitulatif de votre évaluation</h2>
                    
                    <div className="intensityCard">

                        <article>
                            {evaluation.intensiteValeur !== null && (
                            <p> {evaluation.intensiteValeur}/10</p>
                            )}
                        </article>
                        <article className="intensityComponent">
                            {intensityImage &&(
                            <img className="intensityImg" src={intensityImage} alt="imageIntensity" />
                             )}
                         <p> {evaluation.intensiteNiveau}</p>
                         </article>
                        <article>
                            <p> {evaluation.localisations.join(", ")}</p>
                        </article>

                        <article>
                            <p> {evaluation.contextes}</p>
                        </article>
                            </div>
                    
                    
            </section>
            <section>
                <div>
                     <Symptom/>  
                </div>
                <div>
                    <Character/>
                </div>
            </section>
         
            <div className="btn-container">

                <button
                    disabled={isInComplete}
                    onClick={handleContinue}
                    className="btn"
                >
                    Voir les solutions
                </button>
            </div>

        </>
    )
}