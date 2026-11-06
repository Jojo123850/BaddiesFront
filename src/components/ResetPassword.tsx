
import { useState } from "react";
import { apiService } from "../services/apiService";
import { useSearchParams, useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import "../styles/register.scss";
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

    // SOURCE UIVERSE.IO
    return (
        <div className="formDiv">
            <form onSubmit={handleSubmit}>
                  
                     
                    

                <h2 className="forgotPass">
                    Réinitialiser le mot de passe
                </h2>

                <p>Tous les champs sont obligatoires</p>
                  <div className="regexDiv">

                    <p>Pour des raison de sécurité, botre nouveau mot de passe doit respecter les règles suivantes:
                    </p>
                    <ul>
                        <li>une longueur d'au moins 10 caractères</li>
                        <li>au moins 1 chiffre</li>
                        <li>au moins 1 lettre minuscule et 1 majuscule</li>
                        <li>au moins 1 caractère spécial(parmi cette liste:! @ # $ % ^ & * ( ) - _ + = [ ] { } ; : , . ? / \ | ~ < >)</></li>
                    </ul>
                  </div>

            
                <div className="wave-group">
                    <input type="password" name="password"   id="password"  className="input"  autoComplete="new-password" required  minLength={8}  value={password}  onChange={(e) => setPassword(e.target.value)}  />
                   

                    <label className="label" htmlFor="password">
                        {"Nouveau mot de passe".split("").map((lettre, index) => (
                            <span  key={index}  className="label-char"  style={{ "--index": index } as CSSProperties} >
                                {lettre === " " ? "\u00A0" : lettre}
                            </span>
                        ))}
                    </label>
                </div>

              
                <div className="wave-group">
                    <input type="password" name="confirmPassword"id="confirmPassword"  className="input"  autoComplete="new-password" required  minLength={8}  value={confirmPassword}      onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label className="label" htmlFor="confirmPassword">
                        {"Confirmer le mot de passe".split("").map((lettre, index) => (
                            <span
                                key={index}
                                className="label-char"
                                style={{ "--index": index } as CSSProperties}
                            >
                                {lettre === " " ? "\u00A0" : lettre}
                            </span>
                        ))}
                    </label>
                </div>

                {message && (
                    <p className={messageType} role="alert">
                        {message}
                    </p>
                )}

               
                <button type="submit" className="btn" disabled={loading || !token}>
                    {loading ? "Réinitialisation..." : "Réinitialiser"}
                </button>
               <Link to="/Home" className="btn">Abandonner</Link>

            </form>
        </div>
    );
}
