import { ChevronLeft } from "lucide-react";

import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiService } from "../services/apiService";
import "../styles/components/register.scss";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success" | "">("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;
        if (!acceptedTerms) {
            setMessage("Veuillez accepter les conditions générales d’utilisation pour vous inscrire.");
            setMessageType("error");
            return;
        }

        const controller = new AbortController();

        setLoading(true);
        setMessage("");
        setMessageType("");

        let accountCreated = false;

        try {
            await apiService.register(
                email,
                password,
                pseudo,
                controller.signal
            );

            accountCreated = true;

            // Ouvrir une session complète sans redemander les identifiants.
            const session = await apiService.login(email, password, controller.signal);
            localStorage.setItem("user", JSON.stringify(session.user));

            try {
                const history = JSON.parse(localStorage.getItem("historique") ?? "[]");
                if (Array.isArray(history) && history.length > 0) {
                    sessionStorage.setItem("propose-history-sync", "true");
                }
            } catch {
                // Un historique illisible ne bloque pas l'accès au compte.
            }

            navigate("/Home", { replace: true });
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setMessage(accountCreated
                    ? "Votre compte est créé, mais la connexion automatique a échoué. Utilisez le lien Se connecter."
                    : err.message);
                setMessageType("error");
            } else if (!(err instanceof Error)) {
                setMessage("Une erreur est survenue pendant l'inscription.");
                setMessageType("error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="formDiv">
            <Link to="/Home" className="auth-back">
                <ChevronLeft size={20} aria-hidden="true" />
                Retour à l’accueil
            </Link>
            <form
                onInvalid={(event) => {
                    if (event.target instanceof HTMLInputElement) {
                        event.preventDefault();
                        const input = event.target;
                        if (input.name === "terms") {
                            setMessage("Veuillez accepter les conditions générales d’utilisation pour vous inscrire.");
                            setMessageType("error");
                            return;
                        }
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
                onSubmit={handleSubmit}
            >

                <h1>Inscription</h1>

                <p className="paraRegister">
                    Créez votre compte pour retrouver vos évaluations
                    et suivre l'évolution de vos douleurs menstruelles.
                </p>

                <div id="register">
                    <div className="wave-group">
                        <input id="pseudo" name="pseudo" type="text" className="input"
                            aria-describedby={
                                message
                                    ? "auth-message"
                                    : undefined
                            }
                            autoComplete="nickname" minLength={3} maxLength={50} required value={pseudo}
                            onChange={(e) =>
                                setPseudo(e.target.value)
                            }
                        />

                        <label className="label" htmlFor="pseudo">
                            <span className="label-char" style={{ transitionDelay: "0.00s" }}>P</span>
                            <span className="label-char" style={{ transitionDelay: "0.05s" }}>s</span>
                            <span className="label-char" style={{ transitionDelay: "0.10s" }}>e</span>
                            <span className="label-char" style={{ transitionDelay: "0.15s" }}>u</span>
                            <span className="label-char" style={{ transitionDelay: "0.20s" }}>d</span>
                            <span className="label-char" style={{ transitionDelay: "0.25s" }}>o</span>
                        </label>
                    </div>

                    <div className="wave-group">
                        <input id="email" name="email" type="email" className="input"
                            aria-describedby={
                                message
                                    ? "auth-message"
                                    : undefined
                            }
                            autoComplete="email" required value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <label className="label" htmlFor="email">
                            <span className="label-char" style={{ transitionDelay: "0.00s" }}>E</span>
                            <span className="label-char" style={{ transitionDelay: "0.05s" }}>m</span>
                            <span className="label-char" style={{ transitionDelay: "0.10s" }}>a</span>
                            <span className="label-char" style={{ transitionDelay: "0.15s" }}>i</span>
                            <span className="label-char" style={{ transitionDelay: "0.20s" }}>l</span>
                        </label>
                    </div>

                    <div className="wave-group">
                        <input id="password" name="password" type="password" minLength={6} className="input"
                            aria-describedby={
                                message
                                    ? "auth-message"
                                    : undefined
                            }
                            autoComplete="new-password" required value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <label className="label" htmlFor="password">
                            <span className="label-char" style={{ transitionDelay: "0.00s" }}>M</span>
                            <span className="label-char" style={{ transitionDelay: "0.05s" }}>o</span>
                            <span className="label-char" style={{ transitionDelay: "0.10s" }}>t</span>
                            <span className="label-char" style={{ transitionDelay: "0.15s" }}>&nbsp;</span>
                            <span className="label-char" style={{ transitionDelay: "0.20s" }}>d</span>
                            <span className="label-char" style={{ transitionDelay: "0.25s" }}>e</span>
                            <span className="label-char" style={{ transitionDelay: "0.30s" }}>&nbsp;</span>
                            <span className="label-char" style={{ transitionDelay: "0.35s" }}>p</span>
                            <span className="label-char" style={{ transitionDelay: "0.40s" }}>a</span>
                            <span className="label-char" style={{ transitionDelay: "0.45s" }}>s</span>
                            <span className="label-char" style={{ transitionDelay: "0.50s" }}>s</span>
                            <span className="label-char" style={{ transitionDelay: "0.55s" }}>e</span>
                        </label>
                    </div>
                </div>

                <div className="register-terms">
                    <input id="register-terms" name="terms" type="checkbox" required checked={acceptedTerms}
                        onChange={(event) =>
                            setAcceptedTerms(event.target.checked)
                        }
                        aria-describedby={
                            messageType === "error" && message
                                ? "auth-message"
                                : undefined
                        }
                    />
                    <label htmlFor="register-terms">
                        J’accepte les <Link to="/CGU" target="_blank" rel="noopener noreferrer" aria-label="Conditions générales d’utilisation (nouvel onglet)">conditions générales d’utilisation</Link> et j’ai pris connaissance de la <Link to="/PrivacyPolicy" target="_blank" rel="noopener noreferrer" aria-label="Politique de confidentialité (nouvel onglet)">politique de confidentialité</Link>.
                    </label>
                </div>

                {message && (
                    <p id="auth-message" className={messageType}
                        role={
                            messageType === "error"
                                ? "alert"
                                : "status"
                        }
                    >
                        {message}
                    </p>
                )}

                <p className="paraRegister">
                    Déjà un compte ? <Link to="/Login" className="login">Se connecter</Link>
                </p>

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>
        </main>
    );
}
