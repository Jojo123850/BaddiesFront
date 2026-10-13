import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import "../styles/navbar.scss";
import "../styles/home.scss";
// import homeImage from "../assets/images/f6582a18b6158c3bf409305bda0f8a88-Photoroom.webp";
import { getEvaluations } from "../services/localStorageService";

export function Home(){
    const evaluations = getEvaluations();
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
            <Link to="/analyse" className="home-btn">
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

  {hasHistory ? (
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

      <Link to="/Historique" className="historyLink">
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