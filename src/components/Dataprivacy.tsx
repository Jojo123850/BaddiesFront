import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function DataPrivacy(){
    const [accepeted, setAccepetd] = useState(false)
    const navigate = useNavigate()

    return(
        <>
            <div className="protection-card">
        <ShieldCheck size={40} aria-hidden="true" />

        <h1>Vos données, votre choix</h1>

        <p>
          BADDIES utilise les informations relatives à vos
          douleurs menstruelles, leur intensité, leur
          localisation et vos symptômes afin de vous proposer
          des conseils adaptés.
        </p>

        <p>
          Ces informations peuvent constituer des données
          de santé sensibles.
        </p>

        <p>
          Vos réponses aux évaluations sont actuellement
          conservées dans le stockage local de votre navigateur
          (localStorage), sans synchronisation automatique
          avec notre base de données.
        </p>

        <p>
          Vous pouvez retirer votre consentement à tout moment
          depuis les paramètres de confidentialité et supprimer
          les données d'évaluation enregistrées sur cet appareil.
        </p>

        <a href="/PrivacyPolicy">
          Consulter la politique de confidentialité
        </a>

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) =>
              setAccepted(event.target.checked)
            }
          />

          <span>
            Je consens explicitement au traitement de mes
            données de santé pour réaliser mon évaluation
            et obtenir des conseils adaptés.
          </span>
        </label>

        <div className="consent-actions">
          <button type="button" onClick={handleRefuse}>
            Refuser
          </button>

          <button
            type="button"
            onClick={handleAccept}
            disabled={!accepted}
          >
            Accepter et continuer
          </button>
        </div>
      </div>
    </>
    )
}