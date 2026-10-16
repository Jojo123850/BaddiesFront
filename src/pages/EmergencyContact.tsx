
import { Link } from "react-router-dom";
import {
  Phone,
//   MapPin,
  UserRound,
  Plus
} from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/emergencyContact.scss";

// TYPES

type EmergencyContact = {
  name: string;
  phone: string;
};

type Country = "FR" | "MG";

// RÉCUPÉRER LE PAYS

function getStoredCountry(): Country {
  const savedCountry = localStorage.getItem("country");

  if (
    savedCountry === "MG" ||
    savedCountry === "Madagascar"
  ) {
    return "MG";
  }

  return "FR";
}

// RÉCUPÉRER LE CONTACT D'URGENCE

function getContact(): EmergencyContact | null {
  const stored = localStorage.getItem("emergencyContact");

  if (!stored) return null;

  try {
    const parsed: unknown = JSON.parse(stored);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "name" in parsed &&
      "phone" in parsed &&
      typeof parsed.name === "string" &&
      typeof parsed.phone === "string" &&
      parsed.name.trim() &&
      parsed.phone.trim()
    ) {
      return {
        name: parsed.name,
        phone: parsed.phone
      };
    }
  } catch {
    return null;
  }

  return null;
}

// COMPOSANT URGENCE

export default function Urgency() {

  // Récupérer le pays et le contact
  const country = getStoredCountry();
  const contact = getContact();

  // Vérifier si le pays est la France
  const isFrance = country === "FR";

  return (
    <>
      <Navbar />

      <main className="urgence-page">

        {/* TITRE */}

        <span className="urgence-eyebrow">
          ASSISTANCE
        </span>

        <h1>Besoin d'aide ?</h1>

        <p className="urgence-description">
          En cas de douleur intense ou de situation
          préoccupante, contactez les secours ou une
          personne de confiance.
        </p>

        {/* PAYS SÉLECTIONNÉ */}
{/* 
        <div className="urgence-country">
          <MapPin size={19} />

          <span>Pays sélectionné</span>

          <strong>
            {isFrance
              ? "🇫🇷 France"
              : "🇲🇬 Madagascar"}
          </strong>
        </div> */}


        <section className="urgence-medical">

          <div className="urgence-section-heading">
            <h2>Urgence médicale</h2>
          </div>

          {isFrance ? (
            <>
              <p className="samu">SAMU — France</p>

              <a
                href="tel:15"
                className="urgence-call"
              >
                <Phone size={20} />
                Appeler le SAMU
              </a>
            </>
          ) : (
            <>
              

              <p>Secours — Madagascar</p>

              <p className="urgence-note">
                En cas d'urgence médicale, contactez
                les secours locaux ou rendez-vous
                dans un établissement de santé.
              </p>

              <p className="urgence-note">
                Le numéro d'urgence médical local
                doit être vérifié avant de proposer
                un appel direct.
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

              <Link
                to="/Setting"
                className="urgence-add-contact"
              >
                <Plus size={18} />
                Ajouter un contact
              </Link>
            </>
          )}

        </section>

        {/* RAPPEL */}

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
