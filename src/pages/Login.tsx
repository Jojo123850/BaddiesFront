
import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { apiService } from "../services/apiService";
import "../styles/register.scss";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"error" | "success" | "">("");

    const navigate = useNavigate();
    const location = useLocation();

    // Ce code récupère la page d'origine et vérifie que c'est un chemin interne valide.
    const from =
    typeof location.state?.from === "string" &&
    location.state.from.startsWith("/") &&
    !location.state.from.startsWith("//")
        ? location.state.from
        : "/Home";

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        const controller = new AbortController();

        setLoading(true);
        setMessage("");
        setMessageType("");

        try {
            const datas = await apiService.login(email, password, controller.signal);

            localStorage.setItem("token", datas.accessToken);
            localStorage.setItem("refreshToken", datas.refreshToken);
            localStorage.setItem("user", JSON.stringify(datas.user));

            const country = localStorage.getItem("country");
            const hasCountry = country === "Mada" || country === "France";

            navigate(hasCountry ? from : "/Country", {
                replace: true
            });
            
        } catch (err) {
            if (err instanceof Error && err.name !== "AbortError") {
                setMessage(err.message);
                setMessageType("error");
            }
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    };

        if (loading) {
    return (
        <main className="loading1" role="status" aria-label="Connexion en cours">
    <div className="container">
        <div className="content">
            <div className="heart-rate">
                <svg viewBox="0 0 150 73" height="73" width="150" aria-hidden="true">
                    <polyline
                        points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                        fill="none"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                    />
                </svg>

                <div className="fade-in"></div>
                <div className="fade-out"></div>
            </div>
        </div>
        <p className="loading-text" aria-hidden="true">Connexion en cours...</p>
    </div>
</main>
    );
}

    return (
        <main className="formDiv">
            <form onSubmit={handleSubmit}>
                <h1>Connexion</h1>

                <p className="paraRegister">
                    Connectez-vous à votre compte pour retrouver vos évaluations
                    et bénéficier des fonctionnalités de BADDIES.
                </p>

                <div id="register">
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
                        <input id="password" name="password" type="password" className="input" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />

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

                <div className="forgotPassword">
                    <Link to="/ForgotPassword">Mot de passe oublié ?</Link>
                </div>

               

                <button type="submit" className="btn" disabled={loading}>Connexion</button>
            </form>
             <p className="paraRegister">
                    Pas encore de compte ? <Link to="/Register" className="login">S'inscrire</Link>
            </p>
        </main>
    );
}
