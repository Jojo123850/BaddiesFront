import { Link } from "react-router-dom";


// page affichée quand l'url ne respecte à aucune route,  
// la page pour les pages inexistantes
export default function NotFound() {
  return (
    <div className="divP">

      <h1 >404</h1>
      <p className="pagePC" >Cette page n'existe pas.</p>
      <Link to="/" className="btn">Retour à l'accueil</Link>

    </div>
  );
}