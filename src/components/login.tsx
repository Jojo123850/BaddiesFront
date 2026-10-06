import { useState } from "react"
import { apiService } from "../services/apiService"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    if (loading) return <p>Chargement...</p>

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()

            const controller = new AbortController()

            try {
                setLoading(true)

                const datas = await apiService.login(
                    email,
                    password,
                    controller.signal
                )

                console.log(datas)
                navigate("/Home")

            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    console.error('Loading error:', err)
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
            <Link to="/ForgotPassword">
                Mot de passe oublié ?
            </Link>
            <button type="submit">Connexion</button>
            <p>Pas encore de  compte ? <Link to="/Register">S'inscrire</Link></p>
        </form>
    )
}

export default Login