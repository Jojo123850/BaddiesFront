import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import silhouette from "../assets/images/silohouette-Photoroom.webp";
import Navbar from "../components/Navbar";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";
import { useEvaluation } from "../evaluation/useEvaluation";

import db from "../data/db.json";

import legere from "../assets/images/legere.webp";
import moderee from "../assets/images/moderee.webp";
import intense from "../assets/images/intense.webp";
import { contextImages } from "../data/contextDataImages";

import "../styles/navbar.scss";
import "../styles/recap.scss";

const intensityImages: Record<string, string> = {
  legere,
  moderee,
  intense,
};



export default function Recap() {
  const { evaluation } = useEvaluation();
  const navigate = useNavigate();
  const contextImage = evaluation.contextes
    ? contextImages[evaluation.contextes]
    : null;
  const intensityImage = evaluation.intensiteNiveau
    ? intensityImages[evaluation.intensiteNiveau]
    : null;

const intensityLabel =
    db.evaluation_douleur.echelle_intensite.niveaux.find(
        (niveau) => niveau.id === evaluation.intensiteNiveau
    )?.label ?? "Intensité non renseignée";

  const localisationLabel =
    evaluation.localisations
      .map(
        (id) =>
          db.evaluation_douleur.localisations.find(
            (localisation) => localisation.id === id
          )?.label ?? id
      )
      .join(", ") || "Zone non renseignée";

  // Les identifiants restent internes ; seul le libellé est affiché.
  // Accepte aussi l’ancien identifiant « travail/ecole ».
  const contexteId = evaluation.contextes?.replace(/\//g, "_");
  const contexteLabel = contexteId
    ? db.contextes.find(
        (contexte) => contexte.id.replace(/\//g, "_") === contexteId
      )?.label ?? "Contexte indisponible"
    : "Contexte non renseigné";

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
                  <img className="intensityImg"src={intensityImage}alt="" /> 
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
                <img  src={silhouette} className="recap-card__silhouette"alt="" />
            </div>
            </article>

           <article className="recap-card recap-card--context">
                <h2 className="recap-card__title">
                    <span className="recap-sr-only">Contexte :</span>
                    {contexteLabel}
                </h2>

                <div className="recap-card__visual">
                    {contextImage && (
                        <img src={contextImage} alt="" className="recap-card__context-image" />
                    )}
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