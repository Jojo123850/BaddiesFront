import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/zone.scss";
import AnteriorPain from "../components/AnteriorPain";
import { Link } from "react-router-dom";

export function ZoneP(){

    return(
        <>
            <Navbar/>
             <Link to="/">
                <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <h2 className="analyse">Zone de douleur</h2>
            <p  className="analyse">Où avez-vous mal ?</p>
            
            <AnteriorPain/>
           
        </>
    )
}