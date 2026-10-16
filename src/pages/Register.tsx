import { useState } from "react"
import { apiService } from "../services/apiService"
import { Link } from "react-router-dom"
  import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/register.scss";
function Register() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [pseudo, setPseudo] = useState<string>("")
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
   const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
        <>
        <div className="formDiv">

        
            <form onSubmit={async (e) => {
                e.preventDefault()

                const controller = new AbortController()

                try {
                    // setLoading(true)

                    const datas = await apiService.register(
                        email,
                        password,
                        pseudo,
                        controller.signal
                    )

                    console.log(datas)
                    navigate("/Login")

                } catch (err) {
                    if (err instanceof Error && err.name !== 'AbortError') {
                        setMessage(err.message)
                        setMessageType("error")
                    }
                }
                
            }}>
            
                <h2>Inscription</h2>
                <p className="paraRegister">Créez votre compte pour recevoir des conseils naturels adaptés à votre cycle</p>

                <div id="register">
                    <div className="wave-group">
                        <input
                            type="text"
                            name="pseudo"
                            id="pseudo"
                            className="input"
                            required
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />

                        <label className="label" htmlFor="pseudo">
                            {"Pseudo".split("").map((lettre, index) => (
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

                </div>{message && (
                        <p className={messageType}>
                            {message}
                        </p>
                    )}
                    <p className="paraRegister">Déjà un compte ? <Link to="/Login" className="login">Se connecter</Link></p>

                    <button type="submit" className="btn">S'inscrire</button>
                </form>
        </div>
        </>
          
        )
}
                
            

export default Register