import { useState } from "react"
import { apiService } from "../services/apiService"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "../styles/register.scss";
import type { CSSProperties } from "react";

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    const navigate = useNavigate();
    if (loading) return <p>Chargement...</p>

    return (
     <div className="formDiv">
        <form onSubmit={async (e) => {
            e.preventDefault()

            const controller = new AbortController()

            try {
                setLoading(true)
                console.log("loading ON")

                const datas = await apiService.login(
                    email,
                    password,
                    controller.signal
                )
                console.log("réponse reçue")
                console.log(datas)
                localStorage.setItem("token", datas.accessToken)
                localStorage.setItem("refreshToken", datas.refreshToken)

                localStorage.setItem("user", JSON.stringify(datas.user));
                navigate("/Home")

            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                     setMessage(err.message)
                    setMessageType("error")
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }}>
            <h2>Connexion</h2>
            <p className="paraRegister">Connectez vous à votre compte pour recevoir des conseils naturels adaptés à votre cycle</p>
            <div id="register">
                <div className="wave-group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="input"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                
                                        <label className="label" htmlFor="email">
                                            {"Email".split("").map((lettre, index) => (
                                                <span
                                                    key={index}
                                                    className="label-char"
                                                    style={{ "--index": index } as CSSProperties}
                                                >
                                                    {lettre}
                                                </span>
                                            ))}
                                        </label>
                    </div>
                                    <div className="wave-group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="input"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                
                                        <label className="label" htmlFor="password">
                                            {"Mot de passe".split("").map((lettre, index) => (
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
            </div>
{/*            

            <input
                type="email"
                name="mail"
                placeholder="Votre email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Mot de passe:</label>
            {/* <label htmlFor="password">Password :</label> */}

            {/* <input
                type="password"
                name="password"
                placeholder="Votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}

            /> */} 
            {message && (
                <p className={messageType}>
                    {message}
            </p>
            )}
            <div className="forgotPassword">
                <Link to="/ForgotPassword">
                    Mot de passe oublié ?
                </Link>
            </div>
            <p className="paraRegister">Pas encore de  compte ? <Link to="/Register" className="login">S'inscrire</Link></p>
            <button type="submit" className="btn">Connexion</button>
        </form>
    </div>
    )
}

export default Login