
import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { apiService } from "../services/apiService";
import "../styles/register.scss";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success" | "">("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        const controller = new AbortController();

        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            await apiService.register(
                email,
                password,
                pseudo,
                controller.signal
            );

            navigate("/Login");
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setMessage(err.message);
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
            <form onSubmit={handleSubmit}>
                <h1>Inscription</h1>

                <p className="paraRegister">
                    Créez votre compte pour retrouver vos évaluations
                    et suivre l'évolution de vos douleurs menstruelles.
                </p>

                <div id="register">
                    <div className="wave-group">
                        <input id="pseudo" name="pseudo" type="text" className="input" autoComplete="nickname" required value={pseudo} onChange={(e) => setPseudo(e.target.value)} />

                        <label className="label" htmlFor="pseudo">
                            {"Pseudo".split("").map((lettre, index) => (
                                <span key={index} className="label-char" style={{ "--index": index } as CSSProperties}>
                                    {lettre}
                                </span>
                            ))}
                        </label>
                    </div>

                    <div className="wave-group">
                        <input id="email" name="email" type="email" className="input" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label className="label" htmlFor="email">
                            {"Email".split("").map((lettre, index) => (
                                <span key={index} className="label-char" style={{ "--index": index } as CSSProperties}>
                                    {lettre}
                                </span>
                            ))}
                        </label>
                    </div>

                    <div className="wave-group">
                        <input id="password" name="password" type="password" minLength={6} className="input" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                        <label className="label" htmlFor="password">
                            {"Mot de passe".split("").map((lettre, index) => (
                                <span key={index} className="label-char" style={{ "--index": index } as CSSProperties}>
                                    {lettre === " " ? "\u00A0" : lettre}
                                </span>
                            ))}
                        </label>
                    </div>
                </div>

                {message && (
                    <p className={messageType} role={messageType === "error" ? "alert" : "status"}>
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
