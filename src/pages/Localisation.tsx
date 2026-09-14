import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/localisation.scss";
import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

type Contexte = {
    id: string;
    label: string;
    img : string;
};

export default function Localisation(){
    const { evaluation, setEvaluation } = useEvaluation();
    const navigate = useNavigate();
    const handleContinue = () => {
        if (!evaluation) return;
        navigate("/Solution");
    };
    
    const contextes: Contexte[] = db.contextes;

    return(

        <>
            <Navbar/>
            <Link to="/Zone" className="retour">
                    <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h2 className="analyse">Localisation</h2>
            <p  className="analyse">Où êtes-vous actuellement ?</p>
            <div className=" loc">

                {contextes.map((contexte) => (
                    <article key={contexte.id} className={`btn2 ${evaluation.contextes?.length === null ? "selected" : ""}`} onClick={() => setEvaluation (contexte.id)}>
                
                    <img
                        src={contexte.img}
                        alt={contexte.label}
                    />
                    <p>{contexte.label}</p>
                            </article>
                
                ))}
            </div> 


             <button
                disabled={!selectedContext}
                onClick={handleContinue}
                className="btn"
            >
                Continuer à analyser
            </button>

            <p className="answer"> C’est indispensable pour analyser le plan d’action personnalisé par rapport à votre douleur</p>
        </>
        
    )
}