import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight} from "lucide-react";

import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import { getHistory } from "../services/historyService";
import type { HistoryEvaluation } from "../services/localStorageService";

import "../styles/navbar.scss";
import "../styles/home.scss";
import { useEvaluation } from "../evaluation/useEvaluation";
import { DataPrivacy } from "../components/Dataprivacy";


export default function Home() {
  const { resetEvaluation } = useEvaluation();
  const [evaluations, setEvaluations] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false)
  const navigate = useNavigate()

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

  const age = localStorage.getItem("baddies-age");
  const canEvaluate = age === "+15ans";

  const hasHistory = evaluations.length > 0;

const commencerEvaluation = () => {
  const consent = localStorage.getItem("consentment-RGPD");

   console.log("Bouton cliqué !");
  console.log("Consentement enregistré :", consent);

  if (consent) {
    try {
      const parsed = JSON.parse(consent);

      if (
        parsed.accepted === true &&
        parsed.version === "1.0"
      ) {
        resetEvaluation();
        navigate("/Analyse");
        return;
      }
    } catch {
      // Consentement invalide : on le redemande.
    }
  }

 setShowPrivacy(true);
};

  return (
    <>
      <Navbar />
      {showPrivacy && (
  <DataPrivacy
    onAccept={() => {
      setShowPrivacy(false);
      resetEvaluation();
      navigate("/analyse");
    }}
    onRefuse={() => setShowPrivacy(false)}
  />
)}
      <main className="home-page">
        <Collapse />

 <section
  className="home-intro"
  aria-labelledby="home-title"
>
  <h1 id="home-title">
    Votre assistant de premiers gestes pour les
    douleurs menstruelles, utilisable même hors ligne.
  </h1>

  <p className="home-description">
    {canEvaluate
      ? "Évaluez vos douleurs en quelques minutes et découvrez des gestes adaptés pour vous soulager."
      : "Découvrez des premiers gestes simples pour soulager vos douleurs menstruelles, sans compte ni évaluation."}
  </p>

  {canEvaluate && (
    <button
      type="button"
      onClick={commencerEvaluation}
      className="home-btn"
    >
      Commencer mon évaluation
    </button>
  )}

  <div className="home-immediate-help">
    <div className="home-immediate-help-content">
      <h2>Besoin d'aide tout de suite ?</h2>

      <p>
        Découvre des premiers gestes pour soulager tes douleurs
        menstruelles, sans compte ni évaluation.
      </p>

      <Link
        to="/ImmediateHelp"
        className="home-immediate-help-link"
      >
        Voir les premiers gestes
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  </div>
</section>

        {canEvaluate &&  !isConnected && (
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
            </div>

          </section>
        )}

        {canEvaluate &&(

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
           
              <button type= "button" className="historyLink"  onClick={commencerEvaluation}>
                Faire ma première évaluation
                <ArrowRight
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>

            </div>

          )}
        </section>
        )

        }


        {/* <p className="home-disclaimer">
          Informations générales, ne remplacent pas un avis médical.
        </p> */}
      </main>
    </>
  );
}