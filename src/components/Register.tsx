import { useState } from "react"
import { apiService } from "../services/apiService"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
function Register() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [pseudo, setPseudo] = useState<string>("")
    // const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
   const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
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
            <p>Créez votre compte pour recevoir des conseils naturels adaptés à votre cycle</p>
            <label htmlFor="pseudo">Votre pseudo:</label>
            <input
                type="text"
                name="pseudo"
                placeholder="Votre pseudo"
                onChange={(e) => setPseudo(e.target.value)}
            />
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
            <p>Déjà un compte ? <Link to="/Login">Se connecter</Link></p>

            <button type="submit">S'inscrire</button>
        </form>
    )
}

export default Register