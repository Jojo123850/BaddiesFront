import { useState } from "react";
 import {  useNavigate } from "react-router-dom"
import "../styles/navbar.scss";
import Madagascar from "../assets/images/Madagascar.webp";
import France from "../assets/images/France.webp";
import "../styles/country.scss";


type Country = {
    id: string,
    country: string,
    flag: string

}
const country: Country[] = [
    {
        "id": "Mada",
        "country": "Madagascar",
        "flag": Madagascar

    },
     {
        "id": "France",
        "country": "France",
        "flag": France

    }
] 
export default function Country(){
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleContinue = () => {
        if (!selectedCountry) return;
        localStorage.setItem("country", selectedCountry);
        navigate("/Home");
    };
    return(
        <>
                <header>
                    {/* <Link to="/">
                        <img className="logo" src="../src/assets/images/logo.webp" alt="logo" />
                    </Link> */}
                    <div>
                        <span>Ecouter</span>
                        <span>Comprendre</span>
                        <span>Soulager</span>
                    </div>
                </header>
            <>
                <h1>Choisissez votre pays</h1>
                <p>Pour commencer, séléctionnez votre pays <br /> Choisissez votre pays afin que Baddies puisse vous proposer le numéro d’urgence adapté en cas de besoin.</p>
             <div>
                {country.map((country) => {
                    return(
                        <button key={country.id} className={`country ${selectedCountry === country.id ? "selected" : ""}`} onClick={() => setSelectedCountry(country.id)}>
                            <img src={country.flag} alt="flag" />
                            <span className="text">{country.country}</span>

                            { selectedCountry === country.id &&(
                                <span className="check">
                                    <i className="fa-solid fa-check"></i>
                                </span>
                            )
                            }
                        </button>
                    )
                    })}
            </div>   
            </>
            <div className="btn-container">
                <button
                    type="button"
                    className="btn"
                    onClick={handleContinue}
                >
                    Continuer
                </button>
                </div>
           
        </>
    )
}