
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

import Madagascar from "../assets/images/Madagascar.webp";
import France from "../assets/images/France.webp";

import logo from "../assets/images/logo-nav.webp";

import "../styles/pages/country.scss";

type Country = {
    id: string;
    country: string;
    flag: string;
};

const countries: Country[] = [
    {
        id: "Mada",
        country: "Madagascar",
        flag: Madagascar
    },
    {
        id: "France",
        country: "France",
        flag: France
    }
];

export default function Country() {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [savedCountry] = useState(() => localStorage.getItem("country"));

    const navigate = useNavigate();

    useEffect(() => {
        if (savedCountry === "Mada" || savedCountry === "France") {
            navigate("/AgeContent", { replace: true });
        }
    }, [savedCountry, navigate]);

    const handleContinue = () => {
        if (!selectedCountry) return;

        localStorage.setItem("country", selectedCountry);
        navigate("/AgeContent", { replace: true });
    };

    if (savedCountry === "Mada" || savedCountry === "France") {
        return null;
    }

    return (
        <>
            <main className="country-page">
                <header className="country-welcome">
                    <img src={logo} className="country-logo" alt="" width={104} height={104} fetchPriority="high" />
                    <h1>Bienvenue sur <span>BADDIES</span></h1>
                    <p>Des premiers gestes pour mieux vivre vos douleurs menstruelles.</p>
                </header>

                <section className="country-choice" aria-labelledby="country-title">
                    <h2 id="country-title">Choisissez votre pays</h2>
                    <p className="country-description">
                        Ce choix permet d’adapter les informations et les numéros d’urgence.
                    </p>

                    <div role="group" aria-label="Choix du pays">
                        {countries.map((item) => (
                            <button key={item.id} type="button"
                                className={`country ${selectedCountry === item.id
                                    ? "selected"
                                    : ""}`
                                }
                                aria-pressed={selectedCountry === item.id}
                                onClick={() =>
                                    setSelectedCountry(item.id)
                                }
                            >
                                <img src={item.flag} alt="" />
                                <span className="text">{item.country}</span>

                                {selectedCountry === item.id && (
                                    <span className="check">
                                        <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="btn-container">
                        <button type="button" className="btn" onClick={handleContinue} disabled={!selectedCountry}>Continuer</button>
                    </div>
                </section>
            </main>
        </>
    );
}
