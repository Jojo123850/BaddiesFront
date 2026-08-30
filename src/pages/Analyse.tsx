import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import "../styles/navbar.scss";
import "../styles/analyse.scss";

export function Analyse(){
    return(
        <>
            <Navbar/>
            <Link to="/">
                <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h2 className="analyse">Intensité de la douleur</h2>
            <p className="analyse">Quelle est l’intensité de votre douleur ?</p>
           <div className="hand-circle">
                <i className="fa-solid fa-hand-pointer hand-icon"></i>
                <p className="hand-label">Appuie</p>
            </div>
            <p className="analyse">Maintenez pour sélectionner votre niveau 
            de douleur.</p>
        </>
    )
}