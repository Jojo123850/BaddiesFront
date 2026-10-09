import { useState } from "react"
import { apiService } from "../services/apiService"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    const navigate = useNavigate();
    if (loading) return <p>Chargement...</p>

    return (
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
            <p>Connectez vous à votre compte pour recevoir des conseils naturels adaptés à votre cycle</p>
            <label htmlFor="mail">Email :</label>

            <input
                type="email"
                name="mail"
                placeholder="Votre email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Mot de passe:</label>
            {/* <label htmlFor="password">Password :</label> */}

            <input
                type="password"
                name="password"
                placeholder="Votre mot de passe"
                onChange={(e) => setPassword(e.target.value)}

            />
            {message && (
                <p className={messageType}>
                    {message}
            </p>
            )}
            <Link to="/ForgotPassword">
                Mot de passe oublié ?
            </Link>
            <button type="submit">Connexion</button>
            <p>Pas encore de  compte ? <Link to="/Register">S'inscrire</Link></p>
        </form>
    )
}

export default Login