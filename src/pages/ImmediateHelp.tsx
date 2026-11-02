import { Link } from "react-router-dom";
import {
  ArrowLeft,
  HeartHandshake,
  ThermometerSun,
  BedDouble,
  GlassWater,
  TriangleAlert,
  PhoneCall,
} from "lucide-react";

import Navbar from "../components/Navbar";

import "../styles/immediateHelp.scss";

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

          <h1>Tu as mal ? On est là pour t'aider.</h1>

          <p>
            Voici quelques gestes simples que tu peux essayer
            pour soulager tes douleurs menstruelles.
          </p>

          <span>Sans compte · Sans questionnaire · Sans historique</span>
        </header>

        <section
          className="immediate-help-tips"
          aria-labelledby="immediate-help-tips-title"
        >
          <h2 id="immediate-help-tips-title">
            Ce que tu peux faire maintenant
          </h2>

          <article className="immediate-help-card">
            <ThermometerSun size={28} aria-hidden="true" />

            <div>
              <h3>Essaie la chaleur</h3>

              <p>
                Pose une bouillotte tiède enveloppée dans un tissu
                sur le bas du ventre ou du dos.
                Ne la pose jamais directement sur la peau.
              </p>
            </div>
          </article>

          <article className="immediate-help-card">
            <BedDouble size={28} aria-hidden="true" />

            <div>
              <h3>Trouve une position confortable</h3>

              <p>
                Allonge-toi ou assieds-toi dans une position
                agréable. Tu peux aussi marcher doucement
                si cela te soulage.
              </p>
            </div>
          </article>

          <article className="immediate-help-card">
            <GlassWater size={28} aria-hidden="true" />

            <div>
              <h3>Prends soin de toi</h3>

              <p>
                Bois selon ta soif, repose-toi si tu en ressens
                le besoin et prends le temps de respirer calmement.
              </p>
            </div>
          </article>
        </section>

        <section
          className="immediate-help-warning"
          aria-labelledby="immediate-help-warning-title"
        >
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

        <p className="immediate-help-disclaimer">
          Ces informations ne remplacent pas un avis médical.
          BADDIES ne pose pas de diagnostic.
        </p>
      </main>
    </>
  );
}