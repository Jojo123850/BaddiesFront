
import { Link } from "react-router-dom";
import mascotte from "../assets/images/logo-nav.webp";
import "../styles/notFound.scss";

// Page affichée lorsqu'aucune route ne correspond à l'URL
export default function NotFound() {
    return (
        <main className="not-found" aria-labelledby="not-found-title">
            <div className="not-found-visual" aria-hidden="true">
                <span>4</span>
                <span className="not-found-zero">
                    <img src={mascotte} alt="" width="208" height="210" />
                </span>
                <span>4</span>
            </div>

            <p className="not-found-code">Erreur 404</p>
            <h1 id="not-found-title">Oups, cette page est introuvable.</h1>
            <p className="not-found-description">
                Retrouvez l’accueil pour poursuivre votre visite.
            </p>

            <Link to="/Home" className="not-found-link">Retour à l’accueil</Link>
        </main>
    );
}
