import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState } from "react"
import { apiService } from "../services/apiService"
import "../styles/components/register.scss";



export function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
        <div className="formDiv">
            <Link to="/Home" className="auth-back">
                <ChevronLeft size={20} aria-hidden="true" />
                Retour à l’accueil
            </Link>
            <form
                onInvalid={(event) => { /* Afficher un message court si un champ est invalide. */ if (event.target instanceof HTMLInputElement) {
                    event.preventDefault();
                    const input = event.target;
                    const field = input.name === "email"
                        ? "L’adresse email"
                        : input.name === "pseudo"
                            ? "Le pseudo"
                            : input.name === "confirmPassword"
                                ? "La confirmation du mot de passe"
                                : "Le mot de passe";
                    if (input.validity.valueMissing) {
                        setMessage(field + " est obligatoire.");
                    } else if (input.validity.tooShort) {
                        setMessage(field + " doit contenir au moins " + input.minLength + " caractères.");
                    } else if (input.validity.typeMismatch) {
                        setMessage("L’adresse email n’est pas valide.");
                    } else {
                        setMessage(field + " n’est pas valide.");
                    }
                    setMessageType("error");
                }
                }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    setMessage("");
                    setMessageType("");
                    const controller = new AbortController();
                    try {
                        const datas = await apiService.forgotPassword(email, controller.signal);
                        setMessage(datas.detail);
                        setMessageType("success");
                    } catch (err) {
                        if (err instanceof Error && err.name !== "AbortError") {
                            setMessage(err.message);
                            setMessageType("error");
                        }
                    }
                }}
            >
                <h2 className="forgotPass">Mot de passe oublié </h2>

                <label htmlFor="email" className="emailForgot">
                    Entrez votre Email :
                </label>
                <div className="wave-group">
                    <input name="email" id="email" type="email" className="input"
                        aria-describedby={
                            message
                                ? "auth-message"
                                : undefined
                        }
                        required value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                    {/* Chaque lettre se déplace avec un petit décalage. */}
                    <label className="label" htmlFor="email">
                        <span className="label-char" style={{ transitionDelay: "0s" }}>E</span>
                        <span className="label-char" style={{ transitionDelay: "0.05s" }}>m</span>
                        <span className="label-char" style={{ transitionDelay: "0.10s" }}>a</span>
                        <span className="label-char" style={{ transitionDelay: "0.15s" }}>i</span>
                        <span className="label-char" style={{ transitionDelay: "0.20s" }}>l</span>
                    </label>
                </div>
                {message && (
                    <p id="auth-message" className={messageType}
                        role={
                            messageType === "error"
                                ? "alert"
                                : "status"
                        }
                    >{message}</p>
                )}

                <button type="submit" className="btn">
                    Réinitialiser le mot de passe
                </button>
            </form>
        </div>
    )
}