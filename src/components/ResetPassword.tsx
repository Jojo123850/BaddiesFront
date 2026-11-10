
import { useState } from "react";
import { apiService } from "../services/apiService";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/components/register.scss";
import { Link } from "react-router-dom";

export function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success" | "">("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");

        if (!token) {
            setMessage("Le lien de réinitialisation est invalide.");
            setMessageType("error");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setMessageType("error");
            return;
        }

        const controller = new AbortController();

        try {
            setLoading(true);

            await apiService.resetPassword(
                token,
                password,
                controller.signal
            );

            setMessage("Mot de passe réinitialisé avec succès.");
            setMessageType("success");

            navigate("/Login");

        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setMessage(err.message);
                setMessageType("error");
            }
        } finally {
            setLoading(false);
        }
    };

 
    return (
        <div className="formDiv">
            <form onInvalid={(event) => { /* Afficher un message court si un champ est invalide. */ if (event.target instanceof HTMLInputElement) { event.preventDefault(); const input = event.target; const field = input.name === "email" ? "L’adresse email" : input.name === "pseudo" ? "Le pseudo" : input.name === "confirmPassword" ? "La confirmation du mot de passe" : "Le mot de passe";  if (input.validity.valueMissing) { setMessage(field + " est obligatoire."); } else if (input.validity.tooShort) { setMessage(field + " doit contenir au moins " + input.minLength + " caractères."); } else if (input.validity.typeMismatch) { setMessage("L’adresse email n’est pas valide."); } else { setMessage(field + " n’est pas valide."); } setMessageType("error"); } }} onSubmit={handleSubmit}>
                  
                <h2 className="forgotPass">
                    Réinitialiser le mot de passe
                </h2>

                <p className="paraPass">Tous les champs sont obligatoires</p>
                  <div className="regexDiv">

                    <p>Pour des raison de sécurité, votre nouveau mot de passe doit respecter les règles suivantes:
                    </p>
                    <ul>
                        <li>une longueur d'au moins 6 caractères</li>
                        <li>au moins 1 chiffre</li>
                        <li>au moins 1 lettre minuscule et 1 majuscule</li>
                        <li>au moins 1 caractère spécial(parmi cette liste:! @ # $ % ^ & * ( ) - _ + = [ ] { } ; : , . ? / \ | ~ < >)</></li>
                    </ul>
                  </div>

            
                <div className="wave-group">
                    <input type="password" name="password"   id="password"  className="input" aria-describedby={message ? "auth-message" : undefined}  autoComplete="new-password" required  minLength={6}  value={password}  onChange={(e) => setPassword(e.target.value)}  />
                   
  {/* SOURCE UIVERSE.IO */}
                    <label className="label" htmlFor="password">
                        <span className="label-char" style={{ transitionDelay: "0.00s" }}>N</span>
                        <span className="label-char" style={{ transitionDelay: "0.05s" }}>o</span>
                        <span className="label-char" style={{ transitionDelay: "0.10s" }}>u</span>
                        <span className="label-char" style={{ transitionDelay: "0.15s" }}>v</span>
                        <span className="label-char" style={{ transitionDelay: "0.20s" }}>e</span>
                        <span className="label-char" style={{ transitionDelay: "0.25s" }}>a</span>
                        <span className="label-char" style={{ transitionDelay: "0.30s" }}>u</span>
                        <span className="label-char" style={{ transitionDelay: "0.35s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.40s" }}>m</span>
                        <span className="label-char" style={{ transitionDelay: "0.45s" }}>o</span>
                        <span className="label-char" style={{ transitionDelay: "0.50s" }}>t</span>
                        <span className="label-char" style={{ transitionDelay: "0.55s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.60s" }}>d</span>
                        <span className="label-char" style={{ transitionDelay: "0.65s" }}>e</span>
                        <span className="label-char" style={{ transitionDelay: "0.70s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.75s" }}>p</span>
                        <span className="label-char" style={{ transitionDelay: "0.80s" }}>a</span>
                        <span className="label-char" style={{ transitionDelay: "0.85s" }}>s</span>
                        <span className="label-char" style={{ transitionDelay: "0.90s" }}>s</span>
                        <span className="label-char" style={{ transitionDelay: "0.95s" }}>e</span>
                    </label>
                </div>

              
                <div className="wave-group">
                    <input type="password" name="confirmPassword"id="confirmPassword"  className="input" aria-describedby={message ? "auth-message" : undefined}  autoComplete="new-password" required  minLength={6}  value={confirmPassword}      onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label className="label" htmlFor="confirmPassword">
                        <span className="label-char" style={{ transitionDelay: "0.00s" }}>C</span>
                        <span className="label-char" style={{ transitionDelay: "0.05s" }}>o</span>
                        <span className="label-char" style={{ transitionDelay: "0.10s" }}>n</span>
                        <span className="label-char" style={{ transitionDelay: "0.15s" }}>f</span>
                        <span className="label-char" style={{ transitionDelay: "0.20s" }}>i</span>
                        <span className="label-char" style={{ transitionDelay: "0.25s" }}>r</span>
                        <span className="label-char" style={{ transitionDelay: "0.30s" }}>m</span>
                        <span className="label-char" style={{ transitionDelay: "0.35s" }}>e</span>
                        <span className="label-char" style={{ transitionDelay: "0.40s" }}>r</span>
                        <span className="label-char" style={{ transitionDelay: "0.45s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.50s" }}>l</span>
                        <span className="label-char" style={{ transitionDelay: "0.55s" }}>e</span>
                        <span className="label-char" style={{ transitionDelay: "0.60s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.65s" }}>m</span>
                        <span className="label-char" style={{ transitionDelay: "0.70s" }}>o</span>
                        <span className="label-char" style={{ transitionDelay: "0.75s" }}>t</span>
                        <span className="label-char" style={{ transitionDelay: "0.80s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "0.85s" }}>d</span>
                        <span className="label-char" style={{ transitionDelay: "0.90s" }}>e</span>
                        <span className="label-char" style={{ transitionDelay: "0.95s" }}>&nbsp;</span>
                        <span className="label-char" style={{ transitionDelay: "1.00s" }}>p</span>
                        <span className="label-char" style={{ transitionDelay: "1.05s" }}>a</span>
                        <span className="label-char" style={{ transitionDelay: "1.10s" }}>s</span>
                        <span className="label-char" style={{ transitionDelay: "1.15s" }}>s</span>
                        <span className="label-char" style={{ transitionDelay: "1.20s" }}>e</span>
                    </label>
                </div>

                {message && (
                    <p id="auth-message" className={messageType} role={messageType === "error" ? "alert" : "status"}>
                        {message}
                    </p>
                )}

            <div className="btnSubmit">
               <Link to="/Home" className="btnStop">Abandonner</Link>
                <button type="submit" className="btn" disabled={loading || !token}>
                    {loading ? "Réinitialisation..." : "Réinitialiser"}
                </button>

            </div>
               

            </form>
        </div>
    );
}
