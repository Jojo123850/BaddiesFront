import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import "../styles/navbar.scss";
import "../styles/home.scss";
// import homeImage from "../assets/images/f6582a18b6158c3bf409305bda0f8a88-Photoroom.webp";
import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import type { HistoryEvaluation } from "../services/localStorageService";

export default function Home() {
    const [evaluations, setEvaluations] = useState<HistoryEvaluation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const token = localStorage.getItem("token");

                if (token) {
                    // Utilisatrice connectée : backend
                    const data = await getHistory();
                    setEvaluations(data);
                } else {
                    // Utilisatrice non connectée : localStorage
                    const saved = localStorage.getItem("historique");
                    setEvaluations(saved ? JSON.parse(saved) : []);
                }
            } catch (error) {
                console.error("Erreur historique accueil :", error);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    const hasHistory = evaluations.length > 0;
    
    return (
        <>
        <Navbar/>
        <section>
            <Collapse/>
        </section>
        <section className="home-intro">
             <h1>
                Votre assistant de premiers gestes pour les
                douleurs menstruelles, utilisable même hors ligne.
            </h1>

            <p>
                Évaluez vos douleurs en quelques minutes
                et découvrez des gestes adaptés pour vous soulager.
            </p>
            <Link to="/Analyse" className="home-btn">
                Commencer mon évaluation
            </Link>
        </section>


        
        
<section className="historyHome">
  <div className="historyHome-header">
    <div>
      <h2>Mes évaluations</h2>
      <p>Retrouvez vos douleurs enregistrées</p>
    </div>
  </div>
    {loading ? (
      <p>Chargement des évaluations...</p>
    ):hasHistory ? (
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

      <Link to="/Suivi?tab=historique" className="historyLink">
        Voir mon historique
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </>
  ) : (
    <div className="historyHome-empty">
      <p>
        Aucune évaluation enregistrée pour le moment.
      </p>

      <Link to="/analyse" className="home-btn">
        Faire ma première évaluation
        <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </div>
  )}
  
</section>

        </>
    )
}