import { useState } from "react";
// import { ShieldCheck } from "lucide-react";
import { useEvaluation } from "../evaluation/useEvaluation";
import "../styles/components/dataPrivacy.scss";
import { Link, useNavigate } from "react-router-dom";
import { saveHealthConsent, withdrawHealthConsent } from "../services/healthConsent.ts";

type dataPrivacyProps = {
    onAccept?: () => void;
    onRefuse?: () => void;
}

export function DataPrivacy({ onAccept, onRefuse }: dataPrivacyProps) {
    const [accepted, setAccepted] = useState(false)
    const navigate = useNavigate()
    const { resetEvaluation } = useEvaluation();
    const [error, setError] = useState("")

    const handleRefuse = () => {
        withdrawHealthConsent();
        if (onRefuse) {
            onRefuse();
        } else {
            navigate("/Home")
        }
    }
    const handleAccept = () => {
        if (!accepted) {
            setError("Veuillez cocher la case de consentement pour continuer.");
            return
        };

        setError("")
        saveHealthConsent();
        if (onAccept) {
            onAccept()
        } else {
            resetEvaluation()
            navigate("/analyse")
        }
    }

    return (
        <>
            <div id="protection">
                <div className="protection-card">

                    <h1>Vos données, votre choix</h1>

                    <p>
                        BADDIES utilise vos réponses sur vos douleurs et symptômes
                        pour vous proposer des conseils adaptés.
                    </p>

                    <p>
                        Si vous sauvegardez l'évaluation, elle est enregistrée sur
                        cet appareil ou sur votre compte selon votre connexion.
                    </p>

                    <p>
                        Vous pouvez refuser ou retirer votre accord dans les paramètres,
                        sans suppression automatique des évaluations enregistrées.
                        Votre choix Analytics est indépendant.
                    </p>


                    <label className="consent-checkbox">
                        <input aria-invalid={Boolean(error)}
                            aria-describedby={
                                error
                                    ? "health-consent-error"
                                    : undefined
                            }
                            type="checkbox" checked={accepted}
                            onChange={(event) => {
                                setAccepted(event.target.checked);
                                setError("");
                            }}
                        />

                        <span>
                            Je consens explicitement au traitement de mes données
                            de santé pour réaliser mon évaluation et recevoir
                            des conseils adaptés.
                        </span>

                    </label>
                    {error && (
                        <p id="health-consent-error" className="errorPara" role="alert">
                            {error}
                        </p>
                    )}

                    <br />

                    <Link to="/PrivacyPolicy" className="link">
                        Consulter la politique de confidentialité
                    </Link>


                    <div className="consent-actions">
                        <button type="button" onClick={handleRefuse} className="btn">
                            Refuser
                        </button>

                        <button type="button" onClick={handleAccept} className="btn">
                            Accepter et continuer
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}