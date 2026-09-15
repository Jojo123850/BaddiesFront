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
    const handleContinue = () => {
    if (!evaluation?.symptomes) return;
    navigate("/Solution");
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
         
         
            <button
             disabled={!evaluation?.symptomes}
            onClick={handleContinue}
            className="btn"
            >
                Voir les solutions
            </button>

        </>
    )
}