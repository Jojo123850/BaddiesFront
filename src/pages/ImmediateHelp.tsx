import { Link } from "react-router-dom";
import {
    ArrowLeft,
    HeartHandshake,
    TriangleAlert,
    PhoneCall,
} from "lucide-react";

import Navbar from "../components/Navbar";
import chaleur from "../assets/images/chaleur.webp";
import repos from "../assets/images/repos.webp";
import hydratation from "../assets/images/hydratation.webp";

import "../styles/pages/immediateHelp.scss";

export default function ImmediateHelp() {
    const country = localStorage.getItem("country")
    return (
        <>
            <Navbar />

            <main className="immediate-help-page">
                <Link to="/Home" className="immediate-help-back">
                    <ArrowLeft size={18} aria-hidden="true" />
                    Retour à l'accueil
                </Link>

                <header className="immediate-help-intro">
                    <HeartHandshake size={32} aria-hidden="true" />

                    <h1>Tu as mal ? Baddies est là pour t'aider.</h1>

                    <p>
                        Voici quelques gestes simples que tu peux essayer
                        pour soulager tes douleurs menstruelles.
                    </p>
                </header>

                <section className="immediate-help-tips" aria-labelledby="immediate-help-tips-title">
                    <h2 id="immediate-help-tips-title">
                        Ce que tu peux faire maintenant
                    </h2>

                    <article className="immediate-help-card">
                        <div className="immediateDiv">
                            <h3>Essaie la chaleur</h3>
                            <div className="card">
                                <img src={chaleur} alt="solution chaleur" />
                                <p>
                                    Pose une bouillotte tiède enveloppée dans un tissu
                                    sur le bas du ventre ou du dos.
                                    Ne la pose jamais directement sur la peau.
                                </p>
                            </div>

                        </div>
                    </article>

                    <article className="immediate-help-card">

                        <div className="immediateDiv">
                            <h3>Trouve une position confortable</h3>
                            <div className="card">
                                <img src={repos} alt="solution repos" />
                                <p>
                                    Allonge-toi ou assieds-toi dans une position
                                    agréable. Tu peux aussi marcher doucement
                                    si cela te soulage.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="immediate-help-card">
                        <div className="immediateDiv">
                            <h3>Prends soin de toi</h3>
                            <div className="card">
                                <img src={hydratation} alt="solution hydratation" />
                                <p>
                                    Bois selon ta soif, repose-toi si tu en ressens
                                    le besoin et prends le temps de respirer calmement.
                                </p>
                            </div>

                        </div>
                    </article>
                </section>

                <section className="immediate-help-warning" aria-labelledby="immediate-help-warning-title">
                    <TriangleAlert size={28} aria-hidden="true" />

                    <h2 id="immediate-help-warning-title">
                        Quand demander de l'aide ?
                    </h2>

                    <p>
                        Si ta douleur est très forte, soudaine ou inhabituelle,
                        si tu fais un malaise, as de la fièvre, vomis beaucoup
                        ou présentes des saignements très abondants,
                        demande rapidement une aide médicale.
                    </p>

                    {country === "France" ? (
                        <p>
                            En cas d'urgence médicale en France, appelle le 15 ou le 112.
                        </p>
                    ) : (
                        <p>
                            En cas d'urgence à Madagascar, contacte les services
                            d'urgence locaux ou rends-toi au centre de santé le plus proche.
                        </p>
                    )}

                    <Link to="/emergencyContact" className="immediate-help-emergency">
                        <PhoneCall size={18} aria-hidden="true" />
                        Consulter les informations d'urgence
                    </Link>
                </section>

                <section className="immediate-help-support">
                    <h2>Tu n'as pas à gérer ça toute seule</h2>

                    <p>
                        Tu peux en parler à un adulte de confiance,
                        à l'infirmière scolaire ou à un professionnel
                        de santé.
                    </p>
                </section>


            </main>
        </>
    );
}