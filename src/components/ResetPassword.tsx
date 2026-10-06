import { useState } from "react"
import { apiService } from "../services/apiService"
import { useSearchParams, useNavigate } from "react-router-dom"

export function ResetPassword() {
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [searchParams] = useSearchParams()
    const token = searchParams.get("token")
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()

            setMessage("")
            setMessageType("")

            if (password !== confirmPassword) {
                setMessage("Les mots de passe ne correspondent pas.")
                setMessageType("error")
                return
            }

            const controller = new AbortController()

            try {
                setLoading(true)

                const datas = await apiService.resetPassword(
                    token!,
                    password,
                    controller.signal
                )

                console.log(datas)

                navigate("/Login")

            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                    setMessage(err.message)
                    setMessageType("error")
                }

            } finally {
                setLoading(false)
            }
        }}>

            <h2>Réinitialiser le mot de passe</h2>

            <label htmlFor="password">
                Nouveau mot de passe :
            </label>

            <input
                type="password"
                id="password"
                name="password"
                placeholder="Votre nouveau mot de passe"
                onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">
                Confirmer le mot de passe :
            </label>

            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmez votre nouveau mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {message && (
                <p className={messageType}>
                    {message}
                </p>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Réinitialisation..." : "Réinitialiser"}
            </button>

        </form>
    )
}