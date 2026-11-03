
import { useState } from "react";
import { Link } from "react-router-dom";
import { saveAnalyticsConsent } from "../services/analytics";
import { hasHealthConsent, saveHealthConsent } from "../services/healthConsent";
// import {hasHealthConsent,saveHealthConsent} from "../services/healthConsent";
import "../styles/analyticsConsent.scss";

const ANALYTICS_KEY = "baddies-analytics-consent";

export default function AnalyticsConsent() {
  const age = localStorage.getItem("baddies-age");
  const canEvaluate = age === "+15ans";

  const [visible, setVisible] = useState(() => 
    localStorage.getItem(ANALYTICS_KEY) === null
  );

  const [analytics, setAnalytics] = useState(false);
  const [health, setHealth] = useState(false);

  const saveChoices = () => {
    saveAnalyticsConsent(analytics ? "accepted" : "refused");

    if (canEvaluate && health && !hasHealthConsent()) {
      saveHealthConsent();
    }

    setVisible(false);
  };

  const refuseAll = () => {
    saveAnalyticsConsent("refused");
    // Ne retire pas un ancien consentement de santé
    // sans demande explicite de retrait.
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <section  className="analytics-consent" role="dialog" aria-modal="true"  aria-labelledby="consent-title">
      <div className="analytics-consent-content">
        <h2 id="consent-title">Vos données, vos choix</h2>

        <p>
          Choisissez les utilisations facultatives de vos
          données. Vous pouvez modifier vos préférences
          dans les paramètres.
        </p>

        <label className="consent-option">
          <input  type="checkbox" checked={analytics}  onChange={(e) => setAnalytics(e.target.checked)} />
          <span>
            <strong>Statistiques</strong>
            <small>
              J'accepte l'utilisation de Google Analytics
              pour mesurer la fréquentation de BADDIES.
            </small>
          </span>
        </label>

        {canEvaluate && !hasHealthConsent() && (
          <label className="consent-option">
            <input type="checkbox" checked={health}   onChange={(e) => setHealth(e.target.checked)} />
            <span>
              <strong>Données de santé</strong>
              <small>
                Je consens explicitement au traitement
                de mes réponses sur les douleurs,
                leur intensité, leur localisation et
                mes symptômes pour obtenir des conseils
                personnalisés.
              </small>
            </span>
          </label>
        )}

        <p>
          Les choix sont indépendants et facultatifs.
          Les premiers gestes et l'urgence restent accessibles.
        </p>

        <Link to="/PrivacyPolicy">
          Consulter la politique de confidentialité
        </Link>

        <div className="analytics-consent-actions">
          <button type="button" className="analytics-refuse"onClick={refuseAll}>
            Tout refuser
          </button>

          <button type="button" className="analytics-accept"   onClick={saveChoices}>
            Enregistrer mes choix
          </button>
        </div>
      </div>
    </section>
  );
}
