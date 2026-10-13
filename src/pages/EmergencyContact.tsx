
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Phone,
  MapPin,
  UserRound,
  Plus
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/emergencyContact.scss";

type EmergencyContact = {
  name: string;
  phone: string;
};

function getContact(): EmergencyContact | null {
  const stored = localStorage.getItem("emergencyContact");

  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);

    if (
      typeof parsed.name === "string" &&
      typeof parsed.phone === "string" &&
      parsed.name.trim() &&
      parsed.phone.trim()
    ) {
      return parsed as EmergencyContact;
    }
  } catch {
    return null;
  }

  return null;
}

export default function Urgency() {
 const location = useLocation();

const [country, setCountry] = useState(
  () => localStorage.getItem("country") || "FR"
);

useEffect(() => {
  const savedCountry = localStorage.getItem("country") || "FR";

  setCountry(savedCountry);
}, [location.key]);

  const [contact] = useState(getContact);

  const isFrance = country === "FR";

  return (
    <>
      <Navbar />

      <main className="urgence-page">
        <span className="urgence-eyebrow">ASSISTANCE</span>

        <h1>Besoin d'aide ?</h1>

        <p className="urgence-description">
          En cas de douleur intense ou de situation
          préoccupante, contactez les secours ou une
          personne de confiance.
        </p>

        <div className="urgence-country">
          <MapPin size={19} />

          <span>Pays sélectionné</span>

          <strong>
            {isFrance ? "🇫🇷 France" : "🇲🇬 Madagascar"}
          </strong>
        </div>

        <section className="urgence-medical">
          <div className="urgence-section-heading">
           
            <h2>Urgence médicale</h2>
          </div>

          {isFrance ? (
            <>
              {/* <span className="urgence-number">15</span> */}

              <p>SAMU — France</p>

              <a href="tel:15" className="urgence-call">
                <Phone size={20} />
                Appeler le SAMU
              </a>

              <p className="urgence-note">
                Vous pouvez également appeler le 112
                en France.
              </p>

              <a href="tel:112" className="urgence-secondary-call">
                <Phone size={18} />
                Appeler le 112
              </a>
            </>
          ) : (
            <>
             <p>Police — Madagascar</p>

              <a href="tel:112" className="urgence-call">
                <Phone size={20} />
                Appeler la Police
              </a>

              <p className="urgence-note">
                En situation urgente, contactez un
                établissement de santé ou les secours
                locaux.
              </p>
            </>
          )}
        </section>

        <section className="urgence-contact">
          <div className="urgence-section-heading">
            <UserRound size={22} />
            <h2>Mon contact d'urgence</h2>
          </div>

          {contact ? (
            <>
              <div className="urgence-contact-info">
                <strong>{contact.name}</strong>
                <span>{contact.phone}</span>
              </div>

              <a
                href={`tel:${contact.phone}`}
                className="urgence-call"
              >
                <Phone size={19} />
                Appeler mon contact
              </a>
            </>
          ) : (
            <>
              <p>
                Aucun contact d'urgence enregistré.
              </p>

              <Link to="/Setting" className="urgence-add-contact">
                <Plus size={18} />
                Ajouter un contact
              </Link>
            </>
          )}
        </section>

        <div className="urgence-reminder">
          <p>
            BADDIES ne remplace pas un professionnel
            de santé ni un service d'urgence.
          </p>
        </div>
      </main>
    </>
  );
}
