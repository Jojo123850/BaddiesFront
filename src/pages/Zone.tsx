
import Navbar from "../components/Navbar";
import "../styles/components/navbar.scss";
import "../styles/pages/zone.scss";

import AnteriorPain from "../components/AnteriorPain";
import PosteriorPain from "../components/PosteriorPain";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, RotateCcw } from "lucide-react";

export default function ZoneP() {
    const [isPosterior, setIsPosterior] = useState(false);

    return (
        <>
            <Navbar />

            <main className="bodyZone">
                <Link to="/analyse" className="retour" aria-label="Retour à l'étape précédente">
                    <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
                </Link>

                <h1 className="analyse">Zone de douleur</h1>
                <p className="analysePara">Où avez-vous mal ?</p>

                {!isPosterior ? (
                    <>
                        <AnteriorPain />

                        <button type="button"
                            onClick={() =>
                                setIsPosterior(true)
                            }
                            className="btn-retour-face" aria-label="Afficher le dos de la silhouette"
                        >
                            <RotateCcw size={22} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                    </>
                ) : (
                    <>
                        <PosteriorPain />

                        <button type="button"
                            onClick={() =>
                                setIsPosterior(false)
                            }
                            className="btn-retour-face" aria-label="Afficher l'avant de la silhouette"
                        >
                            <RotateCcw size={22} strokeWidth={1.8} aria-hidden="true" />
                        </button>
                    </>
                )}
            </main>
        </>
    );
}
