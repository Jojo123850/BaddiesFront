import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight} from "lucide-react";

import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import { getHistory } from "../services/historyService";
import type { HistoryEvaluation } from "../services/localStorageService";

import "../styles/navbar.scss";
import "../styles/home.scss";
import { useEvaluation } from "../evaluation/useEvaluation";

export default function Home() {
  const { resetEvaluation } = useEvaluation();
  const [evaluations, setEvaluations] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

  const isConnected = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      setLoading(true);
      setHistoryError(false);

      try {
        let data: HistoryEvaluation[];

        if (isConnected) {
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
  }, [isConnected]);

  const hasHistory = evaluations.length > 0;

  return (
    <>
      <Navbar />

      <main className="home-page">
        <Collapse />

       <section  className="home-intro"  aria-labelledby="home-title" >
         

          <h1 id="home-title">
            Votre assistant de premiers gestes pour les
            douleurs menstruelles, utilisable même hors ligne.
          </h1>

          <p className="home-description">
            Évaluez vos douleurs en quelques minutes
            et découvrez des gestes adaptés pour vous soulager.
          </p>

          <Link to="/analyse"  onClick={resetEvaluation} className="home-btn">
            Commencer mon évaluation
          </Link>

          
        </section>

        {!isConnected && (
          <section
            className="home-account"
            aria-labelledby="home-account-title"
          >
          {/* <span className="home-badge">
            À ton rythme
          </span> */}
            <div className="home-account-card">
              <h2 id="home-account-title">
                Ton historique, avec toi
              </h2>

              <p>
                Crée ton compte pour retrouver tes prochaines
                évaluations sur plusieurs appareils.
              </p>
              <p className="home-local-note">
                Sans compte, ton historique reste sur cet appareil.
              </p>

              <Link to="/Register" className="home-account-btn">
                Créer mon compte
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            
           
{/*          
            <p className="home-login">
              Déjà un compte ?{" "}
              <Link to="/Login">Se connecter</Link>
            </p> */}
            
         
            </div>

          </section>
        )}

        <section
          className="historyHome"
          aria-labelledby="history-title"
        >
          <div className="historyHome-header">
            <h2 id="history-title">Mes évaluations</h2>
            <p>Retrouve tes évaluations enregistrées.</p>
          </div>

          {loading ? (
            <p role="status">
              Chargement des évaluations...
            </p>
          ) : historyError ? (
            <p role="alert">
              Impossible de charger tes évaluations pour le moment.
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
                    Consulte tes précédentes évaluations
                    et les gestes associés.
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

              <Link to="/analyse" className="historyLink">
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

        <p className="home-disclaimer">
          Informations générales, ne remplacent pas un avis médical.
        </p>
      </main>
    </>
  );
}