import { useEffect, useState } from "react";
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

  const [savedCountry] = useState(() =>
    localStorage.getItem("country")
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (savedCountry === "Mada" || savedCountry === "France") {
      navigate("/Home", { replace: true });
    }
  }, [savedCountry, navigate]);

  const handleContinue = () => {
    if (!selectedCountry) return;

    localStorage.setItem("country", selectedCountry);
    navigate("/Home", { replace: true });
  };

  if (savedCountry === "Mada" || savedCountry === "France") {
    return null;
  }

    return(
        <>
            <header>
                    <div>
                        <span>Ecouter</span>
                        <span>Comprendre</span>
                        <span>Soulager</span>
                    </div>
            </header>
            <>
                <h1>Choisissez votre pays</h1>
                <p>
                Sélectionnez votre pays afin que BADDIES puisse vous
                proposer les informations d'urgence adaptées.
                </p>
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