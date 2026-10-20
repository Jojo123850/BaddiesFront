import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/localisation.scss";
import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import { contextImages } from "../data/contextDataImages";
import { ChevronLeft } from "lucide-react";

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
        navigate("/Recapitulatif");
    };

    const handleLocation = (id: string) => {
        setEvaluation(prev => ({
            ...prev,
            contextes: id
     } ))}
    
    // données db contextes
    const contextes: Contexte[] = db.contextes;

    return(
        <>
            <Navbar/>
            <Link to="/Zone" className="retour">
                    <ChevronLeft
                    size={22}
                    strokeWidth={1.8}
                    aria-hidden="true"
                    />
            </Link>
            <h2 className="analyse">Localisation</h2>
            <p  className="analyse">Où êtes-vous actuellement ?</p>
            <div className=" loc">

                {contextes.map((contexte) => (
                    <article key={contexte.id} className={`btn2 ${evaluation.contextes === contexte.id? "selected" : ""}`} onClick={() =>handleLocation(contexte.id)}
                        >
                            <img
                                src={contextImages[contexte.id]}
                                alt={contexte.label}
                            />
                            <p>{contexte.label}</p>
                    </article>
                
                ))}
            </div> 

            <div className="btn-container">

             <button
                disabled={!evaluation}
                onClick={handleContinue}
                className="btn"
            >
                Continuer à analyser
            </button>
            </div>

            <p className="answer"> C’est indispensable pour analyser le plan d’action personnalisé par rapport à votre douleur</p>
        </>
        
    )
}