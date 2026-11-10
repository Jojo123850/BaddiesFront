import { useEffect, useState  } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { SESSION_EXPIRED_EVENT} from "../services/sessionService"
import "../styles/components/sessionExpired.scss";


export default function SessionExpiredModal() {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleSessionExpired = () => {
            setIsOpen(true)
        }

        window.addEventListener(
            SESSION_EXPIRED_EVENT,
            handleSessionExpired
        )

        return () => {
            window.removeEventListener(
                SESSION_EXPIRED_EVENT,
                handleSessionExpired
            )
        }
    }, [])



    const handleReconnect = () => {
        setIsOpen(false)

        navigate("/Login", {
            state: {
                from: location.pathname
            }
        })
    }

    if (!isOpen) return null

    return (
        <div className="session-overlay">
            <section className="session-modal" role="alertdialog" aria-modal="true" aria-labelledby="session-title" aria-describedby="session-description" >
            
                <h2 id="session-title">
                    Session expirée
                </h2>

                <p id="session-description">
                    Ta session a expiré.
                    Reconnecte-toi pour accéder
                    à ton compte BADDIES.
                </p>

                <div className="session-actions">
                    <button  type="button" className="btn"onClick={handleReconnect}>
                        Se reconnecter
                    </button>

                    <button type="button" onClick={() => setIsOpen(false)}>
                        Continuer sans connexion
                    </button>
                </div>
            </section>
        </div>
    )
}