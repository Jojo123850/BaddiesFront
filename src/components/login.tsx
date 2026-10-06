// import { useEffect } from "react"
import { useState} from "react"
import {apiService} from "../services/apiService"

function Login() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault()
        const controller = new AbortController()

        try {
            setLoading(true)
             const datas = await apiService.login(email, password, controller.signal)
            //  setData(datas)
        } catch (err) {
            if(err instanceof Error && err.name !== 'AbortError') {
            console.error('Loading error: ', err)
            }
        } finally {
            // Le finally s'exécute quoi qu'il arrive, après tout ce qui vient avant
            if(!controller.signal.aborted){
            setLoading(false)
            // Rediriger sur la page profile
            }
        }
    }

    if(loading) return <p>Chargement...</p>

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="mail">Email :</label>
        <input type="email" name="mail" placeholder="Renseigner le mail" onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password :</label>
        <input type="password" name="password" placeholder="Renseigner le MDP" onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Connexion</button>
    </form>
  )
}

export default Login