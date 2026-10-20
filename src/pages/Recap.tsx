import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft,  Car } from "lucide-react";
import silhouette from "../assets/images/silohouette-Photoroom.webp";
import Navbar from "../components/Navbar";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";
import { useEvaluation } from "../evaluation/useEvaluation";

import db from "../data/db.json";

import legere from "../assets/images/legere.webp";
import moderee from "../assets/images/moderee.webp";
import intense from "../assets/images/intense.webp";

import "../styles/navbar.scss";
import "../styles/recap.scss";

const intensityImages: Record<string, string> = {
  legere,
  moderee,
  intense,
};

const intensityLabels: Record<string, string> = {
  legere: "Douleur légère",
  moderee: "Douleur modérée",
  intense: "Douleur intense",
};

export default function Recap() {
  const { evaluation } = useEvaluation();
  const navigate = useNavigate();

  const intensityImage = evaluation.intensiteNiveau
    ? intensityImages[evaluation.intensiteNiveau]
    : null;

  const intensityLabel = evaluation.intensiteNiveau
    ? intensityLabels[evaluation.intensiteNiveau] ?? "Douleur"
    : "Intensité non renseignée";

  const localisationLabel =
    evaluation.localisations
      .map(
        (id) =>
          db.evaluation_douleur.localisations.find(
            (localisation) => localisation.id === id
          )?.label ?? id
      )
      .join(", ") || "Zone non renseignée";

  const contexteLabel = evaluation.contextes || "Contexte non renseigné";

  const isInComplete =
    evaluation.symptomes.length === 0 ||
    evaluation.option === null;

  const handleContinue = () => {
    if (isInComplete) return;
    navigate("/Analyse-reponse");
  };

  return (
    <>
      <Navbar />

      <main className="recap-page">
        <div className="switch">
          <Link
            to="/Localisation"
            className="retour"
            aria-label="Retour à l’étape précédente"
          >
            <ChevronLeft
              size={22}
              strokeWidth={1.8}
              aria-hidden="true" 
            />
          </Link>
        </div>

        <section
          className="recap-summary"
          aria-labelledby="recap-title"
        >
          <h1 id="recap-title">
            Récapitulatif de votre évaluation
          </h1>

          <div className="intensityCard">
            <article className="recap-card recap-card--intensity">
              <h2 className="recap-card__title">
                {intensityLabel}
              </h2>

              <div className="intensityComponent">
                {intensityImage && (
                  <img
                    className="intensityImg"
                    src={intensityImage}
                    alt=""
                  />
                )}

                {evaluation.intensiteValeur !== null && (
                  <p className="recap-card__score">
                    <span className="recap-sr-only">
                      Douleur :
                    </span>
                    {evaluation.intensiteValeur}
                    <span>/10</span>
                  </p>
                )}
              </div>
            </article>

            <article className="recap-card recap-card--location">
                <h2 className="recap-card__title">
                <span className="recap-sr-only">Localisation :</span>
                {localisationLabel}
            </h2>

            <div className="recap-card__visual">
                <img
                src={silhouette}
                className="recap-card__silhouette"
                alt=""
                />
            </div>
            </article>

            <article className="recap-card recap-card--context">
              <h2 className="recap-card__title">
                <span className="recap-sr-only">
                  Contexte :
                </span>
                {contexteLabel}
              </h2>

              <div className="recap-card__visual">
                <Car
                  className="recap-card__icon"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            </article>
          </div>
        </section>

        <section
          className="recap-details"
          aria-label="Symptômes et caractéristiques de la douleur"
        >
          <div className="recap-panel">
            <Symptom />
          </div>

          <div className="recap-panel">
            <Character />
          </div>
        </section>

        <div className="btn-container">
          <button
            type="button"
            disabled={isInComplete}
            onClick={handleContinue}
            className="btn"
            aria-describedby={
              isInComplete ? "recap-help" : undefined
            }
          >
            Voir les solutions
          </button>

          {isInComplete && (
            <p id="recap-help" className="recap-help">
              Choisissez une réponse pour les symptômes et les
              caractéristiques de la douleur pour continuer.
            </p>
          )}
        </div>
      </main>
    </>
  );
}