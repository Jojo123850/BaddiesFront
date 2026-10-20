import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { ChevronLeft, TriangleAlert, Phone } from "lucide-react";

import "../styles/alert.scss";

export default function MedicalAlert() {
    return (
        <>
        <Navbar/>
        <main className="medicalAlertPage">
            <Link to="/Localisation" className="retour" aria-label="Retour à l'étape précédente">
                <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
            </Link>

            <section className="medicalAlert" aria-labelledby="medical-alert-title">
                <h1 id="medical-alert-title">Une consultation médicale est recommandée</h1>

                <p>
                    D'après vos réponses, votre situation mérite
                    l'avis d'un professionnel de santé.
                </p>

                <p>
                    Si vos symptômes sont très intenses, s'aggravent
                    ou vous inquiètent, consultez rapidement.
                </p>

                <div className="medicalAlert-urgence">
                    <h2>
                        <TriangleAlert size={22} aria-hidden="true" />
                        {" "}Quand demander une aide urgente ?
                    </h2>

                    <p>
                        En cas de douleur soudaine et très intense,
                        de malaise important ou de saignements très
                        abondants accompagnés de vertiges ou d'une
                        grande faiblesse, demandez une aide médicale
                        urgente.
                    </p>

                    <p className="paraContact">
                        Contactez les services d'urgence de votre pays.
                    </p>

                    <Link to="/emergencyContact" className="urgence-call">
                        <Phone size={20} aria-hidden="true" />
                        Voir les contacts d'urgence
                    </Link>
                </div>

                <Link to="/Home" className="btn">Retour à l'accueil</Link>
            </section>
        </main>
        </>
    );
}
