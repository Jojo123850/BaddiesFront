import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import ZonePain from "../components/Zone";

export function ZoneP(){

    return(
        <>
            <Navbar/>
            <h2 className="analyse">Zone de douleur</h2>
            <p  className="analyse">Où avez-vous mal ?</p>
            <img src="baddies_essai/src/assets/images/silohouette-Photoroom.webp" alt="silhouette" />
            <ZonePain/>
           
        </>
    )
}