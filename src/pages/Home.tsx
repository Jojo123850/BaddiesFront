import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import { getHistory } from "../services/historyService";
import type { HistoryEvaluation } from "../services/localStorageService";

import "../styles/components/navbar.scss";
import "../styles/pages/home.scss";
import { useEvaluation } from "../evaluation/useEvaluation";
import { DataPrivacy } from "../components/Dataprivacy";
import { importHistory } from "../services/historyService";
import { ArrowRight, CheckCircle } from "lucide-react";
import { RefreshCw } from "lucide-react";



export default function Home() {
  const { resetEvaluation } = useEvaluation();
  const [evaluations, setEvaluations] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [syncSuccess, setSyncSuccess] = useState(false);

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


  
    // vérification si l'user a des historiques locales
    const [hasLocalHistory, setHasLocalHistory] = useState(() => {
   
    try {
        const data = JSON.parse(localStorage.getItem("historique") ?? "[]");
        
        return Array.isArray(data) && data.length > 0;
    } catch {
        return false;
    }
});

// Ouvrir la proposition une seule fois après la connexion.
  const syncDialog = useRef<HTMLDialogElement>(null);
  const [showSync, setShowSync] = useState(() =>
    isConnected && hasLocalHistory &&
    sessionStorage.getItem("propose-history-sync") === "true"
  );

  useEffect(() => {
    if (showSync && !syncDialog.current?.open) {
      syncDialog.current?.showModal();
      sessionStorage.removeItem("propose-history-sync");
    }
  }, [showSync]);

  // synchronisation
    const [syncing, setSyncing] = useState(false)
    const [message, setMessage] = useState("")

        const  shareHistory = async() => {
          setSyncSuccess(false);
            if (syncing) return;

            const token = localStorage.getItem("token")

            if(!token){
                setMessage("Il faut être connecté·e pour transférer l'historique")
                return
            }

            if(!navigator.onLine){
                setMessage("Il faut avoir une connexion internet pour le transfert")
                return
            }


            setSyncing(true);
            setMessage("")

            try {
                const localHistory: HistoryEvaluation[] = JSON.parse(
                localStorage.getItem("historique") ?? "[]"
            );

            if (localHistory.length === 0) {
                setMessage("Aucune évaluation locale à transférer.");
                return;
            }

            for (const episode of localHistory) {
                await importHistory(episode);

                const remaining: HistoryEvaluation[] = JSON.parse(
                localStorage.getItem("historique") ?? "[]"
                );

                localStorage.setItem("historique",JSON.stringify(
                    remaining.filter((item) => item.id !== episode.id)
                )
                );
                setHasLocalHistory(
                    remaining.filter((item) => item.id !== episode.id).length > 0
                    );
            } 

            try {
                setShowSync(false);
                const updatedHistory = await getHistory();
                setEvaluations(updatedHistory);
                setSyncSuccess(true);
                setMessage("Vos évaluations ont bien été transférées sur votre compte.");
            } catch {   
                setMessage(
                "Transfert terminé. Rechargez la page pour actualiser l’historique."
                );
            }
                
            } catch(error)  {
                const detail =
                error instanceof Error
                ? error.message
                : "Erreur inconnue."
                setMessage(
            `Transfert interrompu: ${detail}`
            );

            }finally{
                setSyncing(false);    

            }

}

  return (
    <>
      <Navbar />
      {showSync && (
        <dialog ref={syncDialog} className="sync-dialog" aria-labelledby="sync-dialog-title" aria-describedby="sync-dialog-description" aria-busy={syncing} onCancel={(event) => { if (syncing) event.preventDefault(); }} onClose={() => setShowSync(false)} >
          <RefreshCw size={30} aria-hidden="true" />
          <h2 id="sync-dialog-title">Retrouver vos évaluations sur votre compte ? </h2>
          <p id="sync-dialog-description">
            Des évaluations sont enregistrées sur cet appareil.
            En cliquant sur « Synchroniser », vous confirmez qu’elles vous appartiennent
            et acceptez de les transférer sur votre compte.
          </p>
          {message && !syncSuccess && <p role="status">{message}</p>}
          <div className="sync-dialog-actions">
            <button type="button" disabled={syncing} onClick={() => setShowSync(false)} autoFocus>
              Plus tard
            </button>
            <button type="button" disabled={syncing} onClick={shareHistory}>
              {syncing ? "Transfert en cours…" : "Synchroniser"}
            </button>
          </div>
        </dialog>
      )}
      {showPrivacy && (
      <DataPrivacy onAccept={() => { setShowPrivacy(false); resetEvaluation(); navigate("/analyse"); }} onRefuse={() => setShowPrivacy(false)} />
    )}

      <main className="home-page">
        <Collapse />

        <section className="home-intro" aria-labelledby="home-title" >
       
                {isConnected && hasLocalHistory && (
  <section className="synchro" aria-labelledby="synchro-title">
    <div className="synchro-text">

          <RefreshCw  size={28} aria-hidden="true" className="synchroSVG"/>
          <h2 id="synchro-title">Synchroniser vos données</h2>
     
      <p>Transférez vos évaluations locales sur votre compte.</p>
    </div>

    <button type="button" className="btn" onClick={() => setShowSync(true)} disabled={syncing} >
      {syncing ? "Transfert en cours…" : "Ajouter à mon compte"}
    </button>
  </section>
)}

            <p className={syncSuccess ? "sync-message success" : "sync-message"} role="status" aria-live="polite" >
              {syncSuccess && <CheckCircle size={20} aria-hidden="true" />}
              {message}
            </p>
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
                <Link to="/Analyse" onClick={resetEvaluation}  className="home-btn" >
                  Commencer mon évaluation
                </Link>
              )}

            <div className="home-immediate-help">
              <div className="home-immediate-help-content">
                <h2>Besoin d'aide tout de suite ?</h2>

                <p>
                  Découvre des premiers gestes pour soulager tes douleurs
                  menstruelles, sans compte ni évaluation.
                </p>

                <Link to="/ImmediateHelp" className="home-immediate-help-link" >
                  Voir les premiers gestes
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
        </section>

        {canEvaluate &&  !isConnected && (
          <section className="home-account" aria-labelledby="home-account-title" >
         
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

        <section  className="historyHome"  aria-labelledby="history-title">
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

              <Link to="/Suivi?tab=historique" className="historyLink" >
                Voir mon historique
                <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </>
          ) : (
            <div className="historyHome-empty">
              <p>
                Aucune évaluation enregistrée pour le moment.
              </p>
           
              <Link to="/Analyse" onClick={resetEvaluation} className="historyLink">
                Faire ma première évaluation
                <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
              </Link>

            </div>

          )}
        </section>
        )

        }
      </main>
    </>
  );
}