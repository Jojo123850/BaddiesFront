import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/zone.scss";
import AnteriorPain from "../components/AnteriorPain";
import PosteriorPain from "../components/PosteriorPain";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ZoneP(){
    const [isPosterior, setIsPosterior] = useState(false)
    return(
        <>
            <Navbar/>
            <Link to="/" className="retour">
                <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h2 className="analyse">Zone de douleur</h2>
            <p  className="analyse">Où avez-vous mal ?</p>
            
            {!isPosterior ?(
                <>
                    <AnteriorPain/>
                    <button onClick={() => setIsPosterior(true)}  className="btn-retour-face">
                         <i className="fa-solid fa-rotate"></i>
                    </button>
                </>
                ):(
                    <> 
                        <PosteriorPain/>
                        <button onClick={() => setIsPosterior(false)} className="btn-retour-face">
                            <i className="fa-solid fa-rotate"></i>
                        </button>
                    </>
                )

            }
        
           
        </>
    )
}