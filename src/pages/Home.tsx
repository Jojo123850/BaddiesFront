
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import { getHistory } from "../services/historyService";
import type { HistoryEvaluation } from "../services/localStorageService";

import "../styles/navbar.scss";
import "../styles/home.scss";

export default function Home() {
  const [evaluations, setEvaluations] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        let data: HistoryEvaluation[];

        if (token) {
          data = await getHistory();
        } else {
          const saved = localStorage.getItem("historique");
          data = saved ? JSON.parse(saved) : [];
        }

        if (active) {
          setEvaluations(data);
        }
      } catch (error) {
        console.error("Erreur historique accueil :", error);

        if (active) {
          setHistoryError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      active = false;
    };
  }, []);

  const hasHistory = evaluations.length > 0;

  return (
    <>
      <Navbar />

      <main>
        <Collapse />

        <section
          className="home-intro"
          aria-labelledby="home-title"
        >
          <h1 id="home-title">
            Votre assistant de premiers gestes pour les
            douleurs menstruelles, utilisable même hors ligne.
          </h1>

          <p>
            Évaluez vos douleurs en quelques minutes
            et découvrez des gestes adaptés pour vous soulager.
          </p>

          <Link to="/analyse" className="home-btn">
            Commencer mon évaluation
          </Link>
        </section>

        <section className="historyHome" aria-labelledby="history-title">
          <div className="historyHome-header">
            <div>
              <h2 id="history-title">Mes évaluations</h2>
              <p>Retrouvez vos douleurs enregistrées</p>
            </div>
          </div>

          {loading ? (
            <p role="status">
              Chargement des évaluations...
            </p>
          ) : historyError ? (
            <p role="alert">
              Impossible de charger vos évaluations pour le moment.
            </p>
          ) : hasHistory ? (
            <>
              <div className="historyHome-summary">
                <span className="historyHome-count">
                  {evaluations.length}
                </span>

                <div>
                  <strong>
                    {evaluations.length > 1
                      ? "Évaluations enregistrées"
                      : "Évaluation enregistrée"}
                  </strong>

                  <p>
                    Consultez vos précédentes évaluations
                    et les solutions associées.
                  </p>
                </div>
              </div>

              <Link
                to="/Suivi?tab=historique"
                className="historyLink"
              >
                Voir mon historique
                <ArrowRight
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </>
          ) : (
            <div className="historyHome-empty">
              <p>
                Aucune évaluation enregistrée pour le moment.
              </p>

              <Link to="/analyse" className="home-btn">
                Faire ma première évaluation
                <ArrowRight
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
