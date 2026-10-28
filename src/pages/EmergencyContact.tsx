import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, UserRound, Plus } from "lucide-react";

import Navbar from "../components/Navbar";
import "../styles/emergencyContact.scss";

type EmergencyContact = {
    name: string;
    phone: string;
};

function getStoredCountry() {
    const country = localStorage.getItem("country") ?? "";
    return ["Mada", "MG", "Madagascar"].includes(country) ? "MG" : "FR";
}

function getContact(): EmergencyContact | null {
    try {
        const contact = JSON.parse(
            localStorage.getItem("emergencyContact") ?? "null"
        ) as Partial<EmergencyContact> | null;

        if (
            typeof contact?.name === "string" &&
            typeof contact.phone === "string" &&
            contact.name.trim() &&
            contact.phone.trim()
        ) {
            return { name: contact.name, phone: contact.phone };
        }
    } catch {
        return null;
    }

    return null;
}

export default function Urgency() {
    const [country, setCountry] = useState(getStoredCountry);
    const [contact, setContact] = useState(getContact);

    useEffect(() => {
        const updateSettings = () => {
            setCountry(getStoredCountry());
            setContact(getContact());
        };

        // Cet onglet : signal envoyé par Settings après une modification.
        window.addEventListener("settings-updated", updateSettings);
        // Autres onglets : changement du stockage partagé.
        window.addEventListener("storage", updateSettings);
        updateSettings();

        return () => {
            window.removeEventListener("settings-updated", updateSettings);
            window.removeEventListener("storage", updateSettings);
        };
    }, []);

    return (
        <>
            <Navbar />

            <main className="urgence-page">
                <span className="urgence-eyebrow">ASSISTANCE</span>
                <h1>Besoin d'aide ?</h1>

                <p className="urgence-description">
                    En cas de douleur intense ou de situation préoccupante,
                    contactez les secours ou une personne de confiance.
                </p>

                <section className="urgence-medical" aria-labelledby="urgence-medical-title">
                    <div className="urgence-section-heading">
                        <h2 id="urgence-medical-title">Urgence médicale</h2>
                    </div>

                    {country === "FR" ? (
                        <>
                            <p className="samu">SAMU — France</p>
                            <a href="tel:15" className="urgence-call" aria-label="Appeler le SAMU au 15">
                                <Phone size={20} aria-hidden="true" />
                                Appeler le SAMU
                            </a>
                        </>
                    ) : (
                        <>
                            <p>Secours — Madagascar</p>
                            <p className="urgence-note">
                                En cas d'urgence médicale, contactez les secours locaux
                                ou rendez-vous dans un établissement de santé.
                            </p>
                            <p className="urgence-note">
                                Le numéro d'urgence médical local doit être vérifié
                                avant de proposer un appel direct.
                            </p>
                        </>
                    )}
                </section>

                <section className="urgence-contact" aria-labelledby="urgence-contact-title">
                    <div className="urgence-section-heading">
                        <UserRound size={22} aria-hidden="true" />
                        <h2 id="urgence-contact-title">Mon contact d'urgence</h2>
                    </div>

                    {contact ? (
                        <>
                            <div className="urgence-contact-info">
                                <strong>{contact.name}</strong>
                                <span>{contact.phone}</span>
                            </div>
                            <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="urgence-call">
                                <Phone size={19} aria-hidden="true" />
                                Appeler mon contact
                            </a>
                        </>
                    ) : (
                        <>
                            <p>Aucun contact d'urgence enregistré.</p>
                            <Link to="/Setting" className="urgence-add-contact">
                                <Plus size={18} aria-hidden="true" />
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
