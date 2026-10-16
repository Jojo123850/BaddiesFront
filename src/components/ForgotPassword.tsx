import { useState } from "react"
import { apiService } from "../services/apiService"
import type { CSSProperties } from "react";
import "../styles/register.scss";


export function ForgotPassword() {
    const [email, setEmail] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [messageType, setMessageType] = useState<"error" | "success" | "">("")

    return (
        <div className="formDiv">
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
                <h2 className="forgotPass">Mot de passe oublié </h2>

                <label htmlFor="mail" className="emailForgot">
                    Entrez votre Email :
                </label>
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
                {message && (
                    <p className={messageType}>
                        {message}
                </p>
                )}

                <button type="submit" className="btn">
                    Réinitialiser le mot de passe
                </button>
            </form>
        </div>
    )
}