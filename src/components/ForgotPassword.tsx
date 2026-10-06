import { useState } from "react"
import { apiService } from "../services/apiService"

export function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()

            const controller = new AbortController()

            try {
                const datas = await apiService.forgotPassword(
                    email,
                    controller.signal
                )

                
                setMessage(datas.message)
                setMessageType("success")


            } catch (err) {
                if (err instanceof Error && err.name !== "AbortError") {
                     setMessage(err.message)
                    setMessageType("error")
                }
            }
        }}>
            <h2>Mot de passe oublié ?</h2>

            <label htmlFor="mail">
                Entrez votre Email :
            </label>

            <input
                type="email"
                name="mail"
                placeholder="Votre email"
                onChange={(e) => setEmail(e.target.value)}
            />
            {message && (
                <p className={messageType}>
                    {message}
            </p>
            )}

            <button type="submit">
                Réinitialiser le mot de passe
            </button>
        </form>
    )
}