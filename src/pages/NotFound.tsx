
import { Link } from "react-router-dom";

// Page affichée lorsqu'aucune route ne correspond à l'URL
export default function NotFound() {
    return (
        <main className="divP">
            <h1>404</h1>

            <p className="pagePC">Cette page n'existe pas.</p>

            <Link to="/Home" className="btn">Retour à l'accueil</Link>
        </main>
    );
}
