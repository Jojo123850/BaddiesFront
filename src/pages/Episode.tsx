import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import type { HistoryEvaluation } from "../services/localStorageService";
import {
  getHistoryById,
  deleteHistory
} from "../services/historyService";

import "../styles/pages/episode.scss";
import db from "../data/db.json";

type DeleteProps = {
  onAccept: () => void;
  onRefuse: () => void;
};

function Delete({ onAccept, onRefuse }: DeleteProps) {



  return (
    <div id="delete-overlay">
      <div className="delete-card" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Supprimer le contact ?</h2>

        <p>
          Voulez-vous vraiment supprimer votre contact  ?
        </p>

        <div className="delete-actions">
          <button type="button" onClick={onRefuse}>
            Annuler
          </button>

          <button type="button" onClick={onAccept}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Episode() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episode, setEpisode] = useState<HistoryEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const isConnected = Boolean(localStorage.getItem("token"));
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    let active = true;

    const loadEpisode = async () => {
      setLoading(true);
      setError("");
      setEpisode(null);

      try {
        if (!id) {
          if (active) {
            setError("Identifiant de l'épisode manquant.");
          }
          return;
        }

        let data: HistoryEvaluation | null = null;

        if (localStorage.getItem("token")) {
          data = await getHistoryById(id);
        } else {
          const historiqueStock =
            localStorage.getItem("historique");

          const historique: HistoryEvaluation[] = historiqueStock
            ? JSON.parse(historiqueStock)
            : [];

          data =
            historique.find(
              (item) => String(item.id) === id
            ) ?? null;
        }

        if (active) {
          setEpisode(data);
        }

      } catch (err) {
        console.error("Erreur épisode :", err);

        if (active) {
          setError("Impossible de charger cet épisode.");
        }

      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadEpisode();

    return () => {
      active = false;
    };

  }, [id, isConnected]);

  const handleDelete = async () => {
    if (!id || !episode || deleting) return;

    setDeleting(true);
    setError("");

    try {
      if (isConnected) {
        await deleteHistory(id);
      } else {
        const historiqueStock =
          localStorage.getItem("historique");

        const historique: HistoryEvaluation[] = historiqueStock
          ? JSON.parse(historiqueStock)
          : [];

        const nouvelHistorique = historique.filter(
          (item) => String(item.id) !== id
        );

        localStorage.setItem(
          "historique",
          JSON.stringify(nouvelHistorique)
        );
      }

      navigate("/Suivi?tab=historique", { replace: true });

    } catch (err) {
      console.error("Erreur suppression :", err);

      setError(
        "Impossible de supprimer cet épisode. Réessaie."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="episode-page">
        <h1>Mon épisode</h1>

        {loading ? (
          <p role="status">
            Chargement de l'épisode...
          </p>
        ) : error && !episode ? (
          <p role="alert">{error}</p>
        ) : !episode ? (
          <p>Épisode introuvable.</p>
        ) : (
          <>
            <section aria-labelledby="episode-details-title">
              <h2 id="episode-details-title">
                Détails de mon évaluation
              </h2>
              <p>
                {" "}
                {db.evaluation_douleur.echelle_intensite.niveaux.find(
                  (niveau) => niveau.id === episode.evaluation.intensiteNiveau
                )?.label ?? (
                    episode.evaluation.intensiteValeur != null
                      ? "Intensité renseignée"
                      : "Non renseignée"
                  )}

                {episode.evaluation.intensiteValeur != null && (
                  <> ({episode.evaluation.intensiteValeur}/10)</>
                )}
              </p>


              <p>
                Date :{" "}
                {new Date(episode.date).toLocaleDateString(
                  "fr-FR"
                )}
              </p>


              <p>
                Localisation :{" "}
                {episode.evaluation.localisations.join(", ") ||
                  "Non renseignée"}
              </p>

              {/* à simplifier */}

              <p>
                Contexte :{" "}
                {db.contextes.find(
                  (contexte) =>
                    contexte.id.replace(/\//g, "_") ===
                    episode.evaluation.contextes?.replace(/\//g, "_")
                )?.label ?? "Contexte non renseigné"}
              </p>

              <p>
                Symptômes :{" "}
                {episode.evaluation.symptomes.join(", ") ||
                  "Aucun symptôme renseigné"}
              </p>

              <p>
                Caractéristique :{" "}
                {episode.evaluation.option ||
                  "Non renseignée"}
              </p>
            </section>

            <section aria-labelledby="solutions-title">
              <h2 id="solutions-title">
                Gestes conseillés
              </h2>

              {episode.solutions.length > 0 ? (
                episode.solutions.map((solution) => (
                  <article key={solution.id}>
                    <h3>{solution.label}</h3>
                    <p>{solution.description}</p>
                  </article>
                ))
              ) : (
                <p>
                  Aucun geste conseillé enregistré pour
                  cet épisode.
                </p>
              )}
            </section>

            {error && (
              <p role="alert">{error}</p>
            )}


            <button type="button"
              onClick={() =>
                setShowDelete(true)
              }
              className="btn" disabled={deleting}
            >
              Supprimer cet épisode
            </button>
          </>
        )}

        {/* <Link to="/Suivi?tab=historique">
                    Retour à mon historique
                </Link> */}
        {showDelete && (
          <Delete
            onRefuse={() =>
              setShowDelete(false)
            }
            onAccept={() => {
              handleDelete();
              setShowDelete(false);
            }}
          />
        )}

      </main>
    </>
  );
}