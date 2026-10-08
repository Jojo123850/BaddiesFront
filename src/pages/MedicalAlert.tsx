import { Link } from "react-router-dom";

export default function MedicalAlert() {
    return (
        <>
            <Link to="/Localisation" className="retour">
                <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <section>
            <h2>Une consultation médicale est recommandée</h2>

            <p>
                D'après vos réponses, votre situation mérite
                l'avis d'un professionnel de santé.
            </p>

            <p>
                Si vos symptômes sont très intenses, s'aggravent
                ou vous inquiètent, consultez rapidement.
            </p>
            <Link to="/Home" className="btn">Retour à l'accueil</Link>
            </section>
        </>
    );
}