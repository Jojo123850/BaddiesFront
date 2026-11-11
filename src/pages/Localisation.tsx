
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import Navbar from "../components/Navbar";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import { contextImages } from "../data/contextDataImages";

import "../styles/components/navbar.scss";
import "../styles/pages/localisation.scss";

type Contexte = {
    id: string;
    label: string;
    img: string;
};

export default function Localisation() {
    const { evaluation, setEvaluation } = useEvaluation();
    const navigate = useNavigate();

    const contextes: Contexte[] = db.contextes;

    const handleContinue = () => {
        if (!evaluation.contextes) return;
        navigate("/Recapitulatif");
    };

    const handleLocation = (id: string) => {
        setEvaluation(prev => ({
            // Garder les réponses précédentes
            ...prev,
            // Mettre à jour le contexte choisi
            contextes: id
        }));
    };

    return (
        <>
            <Navbar />

            <main className="context-page">
                <Link to="/Zone" className="retour" aria-label="Retour à l'étape précédente">
                    <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
                </Link>

                <h1 className="analyse">Localisation</h1>
                <p className="analyse">Où êtes-vous actuellement ?</p>

                <div className="loc" role="group" aria-label="Choisissez votre contexte actuel">
                    {contextes.map((contexte) => (
                        <button type="button" key={contexte.id}
                            className={`btn2 ${evaluation.contextes === contexte.id
                                ? "selected"
                                : ""}`
                            }
                            onClick={() =>
                                handleLocation(contexte.id)
                            }
                            aria-pressed={evaluation.contextes === contexte.id}
                        >
                            <img src={contextImages[contexte.id]} alt="" />
                            <span>{contexte.label}</span>
                        </button>
                    ))}
                </div>

                <div className="btn-container">
                    <button type="button" disabled={!evaluation.contextes} onClick={handleContinue} className="btn">Continuer à analyser</button>
                </div>

                <p className="answer">
                    C'est indispensable pour adapter les gestes proposés
                    à votre situation actuelle.
                </p>
            </main>
        </>
    );
}
