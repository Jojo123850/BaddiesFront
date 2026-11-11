import { useNavigate } from "react-router-dom";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
import "../styles/pages/analyse.scss";

export default function IntensityPainB() {
  const { evaluation, setEvaluation } = useEvaluation();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (evaluation.intensiteNiveau === null)
      return;
    navigate("/Zone");
  };

  return (
    <div className="analyse-page">
      <h2 className="analyse">Intensité de la douleur</h2>

      <p className="analyse">
        Quelle est l’intensité de votre douleur ?
      </p>

      <p className="analyseAlert" id="intensity-help">
        Sélectionnez le niveau qui correspond à votre douleur.
      </p>

      <div className="intensity-btn" role="group" aria-label="Intensité de la douleur" aria-describedby="intensity-help">

        {db.evaluation_douleur.echelle_intensite.niveaux.map(
          (item) => {
            const selected = evaluation.intensiteNiveau === item.id;

            return (
              <button key={item.id} type="button"
                className={`btnIntensity${selected
                  ? " selected"
                  : ""}`
                }
                aria-pressed={selected}
                onClick={() =>
                  setEvaluation((prev) =>
                    ({ ...prev, intensiteNiveau: item.id, intensiteValeur: null, }))
                }
              >
                {item.label}
              </button>
            );
          }
        )}
      </div>

      <div className="btn-container">
        <button type="button" disabled={evaluation.intensiteNiveau === null} onClick={handleContinue} className="btn">
          Continuer à analyser
        </button>
      </div>
    </div>
  );
}