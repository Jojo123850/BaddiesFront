
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Settings as SettingsIcon,
  ArrowRight,
  UserRound,
  ChevronRight,
  Globe,
  HeartPulse,
  UserRoundCheck,
  Pencil,
  Plus,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import Navbar from "../components/Navbar";
import defaultProfile from "../assets/images/DefaultProfile.webp";

import "../styles/setting.scss";

type User = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string | null;
};

type EmergencyContact = {
  name: string;
  phone: string;
};

function getStoredUser(): User | null {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser);

    if (
      typeof parsed.pseudo !== "string" ||
      typeof parsed.email !== "string"
    ) {
      return null;
    }

    return parsed as User;
  } catch {
    return null;
  }
}

function getStoredContact(): EmergencyContact {
  const stored = localStorage.getItem("emergencyContact");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);

      return {
        name: parsed.name || "",
        phone: parsed.phone || "",
      };
    } catch {
      // On utilise les valeurs par défaut.
    }
  }

  return { name: "", phone: "" };
}

export function Settings() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(
    getStoredUser
  );

  const [country, setCountry] = useState(() =>
    localStorage.getItem("country") || "FR"
  );

  const [contact, setContact] = useState<EmergencyContact>(
    getStoredContact
  );

  const [editingContact, setEditingContact] = useState(false);

  const [contactMessage, setContactMessage] = useState("");

  const handleCountryChange = (value: string) => {
    setCountry(value);
    localStorage.setItem("country", value);
  };

  const handleSaveContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = contact.name.trim();
    const phone = contact.phone.trim();

    if (!name || !phone) {
      setContactMessage(
        "Remplissez le nom et le téléphone."
      );
      return;
    }

    const savedContact = { name, phone };

    localStorage.setItem(
      "emergencyContact",
      JSON.stringify(savedContact)
    );

    setContact(savedContact);
    setEditingContact(false);
    setContactMessage("Contact enregistré.");
  };

  const handleDeleteContact = () => {
    localStorage.removeItem("emergencyContact");

    setContact({ name: "", phone: "" });
    setEditingContact(false);
    setContactMessage("Contact supprimé.");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("login");

    setUser(null);
    navigate("/Home");
  };

  const hasContact = Boolean(contact.name && contact.phone);

  return (
    <>
      <Navbar />

      <main className="settings-page">
        {/* EN-TÊTE */}

        <div className="settings-heading">
          <div>
            <span className="settings-eyebrow">
              MON ESPACE
            </span>

            <h1>Paramètres</h1>

            <p>
              Personnalisez votre expérience BADDIES.
            </p>
          </div>

          <SettingsIcon
            className="settings-heading-icon"
            size={24}
          />
        </div>

        {/* PROFIL */}

        <section className="settings-profile">
          <img
            src={user?.avatar_url || defaultProfile}
            alt="Photo de profil"
            className="settings-avatar"
            onError={(event) => {
              event.currentTarget.src = defaultProfile;
            }}
          />

          <div className="settings-profile-info">
            {user ? (
              <>
                <h2>{user.pseudo}</h2>
                <p>{user.email}</p>

                <span className="settings-account-status">
                  Compte connecté
                </span>
              </>
            ) : (
              <>
                <h2>Bienvenue sur BADDIES</h2>

                <p>Utilisation sans compte</p>

                <Link
                  to="/Login"
                  className="settings-login"
                >
                  Se connecter
                  <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>
        </section>

        {/* MON COMPTE */}

        {user && (
          <section className="settings-section">
            <h2>Mon compte</h2>

            <Link
              to="/EditProfile"
              className="settings-item"
            >
              <span className="settings-item-icon">
                <UserRound size={20} />
              </span>

              <span className="settings-item-text">
                <strong>
                  Informations personnelles
                </strong>

                <small>
                  Modifier mon pseudo et ma photo
                </small>
              </span>

              <ChevronRight
                className="settings-arrow"
                size={18}
              />
            </Link>
          </section>
        )}

        {/* PRÉFÉRENCES */}

        <section className="settings-section">
          <h2>Préférences</h2>

          <div className="settings-field">
            <label
              htmlFor="settings-country"
              className="settings-field-title"
            >
              <span className="settings-item-icon">
                <Globe size={20} />
              </span>

              <span>
                <strong>Pays</strong>
                <small>
                  Pour adapter les informations locales
                </small>
              </span>
            </label>

            <select
              id="settings-country"
              value={country}
              onChange={(event) =>
                handleCountryChange(event.target.value)
              }
              className="settings-select"
            >
              <option value="FR">France</option>
              <option value="MG">Madagascar</option>
            </select>
          </div>
        </section>

        {/* SÉCURITÉ */}

        <section className="settings-section">
          <h2>Sécurité</h2>

          <div className="settings-field">
            <div className="settings-field-title">
              <span className="settings-item-icon">
                <HeartPulse size={20} />
              </span>

              <div>
                <strong>Contact d'urgence</strong>

                <small>
                  Un proche à contacter en cas de besoin
                </small>
              </div>
            </div>

            {hasContact && !editingContact && (
              <div className="settings-contact-preview">
                <UserRoundCheck size={21} />

                <div>
                  <strong>{contact.name}</strong>
                  <p>{contact.phone}</p>
                </div>
              </div>
            )}

            {!editingContact ? (
              <button
                type="button"
                className="settings-secondary-btn"
                onClick={() => {
                  setEditingContact(true);
                  setContactMessage("");
                }}
              >
                {hasContact ? (
                  <Pencil size={17} />
                ) : (
                  <Plus size={18} />
                )}

                {hasContact
                  ? "Modifier mon contact"
                  : "Ajouter un contact"}
              </button>
            ) : (
              <form
                className="settings-contact-form"
                onSubmit={handleSaveContact}
              >
                <label htmlFor="emergency-name">
                  Nom du proche
                </label>

                <input
                  id="emergency-name"
                  type="text"
                  value={contact.name}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Marie"
                  required
                />

                <label htmlFor="emergency-phone">
                  Numéro de téléphone
                </label>

                <input
                  id="emergency-phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="+33 6 ..."
                  required
                />

                <div className="settings-form-actions">
                  <button
                    type="button"
                    className="settings-cancel-btn"
                    onClick={() => {
                      setContact(getStoredContact());
                      setEditingContact(false);
                    }}
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    className="settings-save-btn"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            )}

            {hasContact && !editingContact && (
              <button
                type="button"
                className="settings-delete-btn"
                onClick={handleDeleteContact}
              >
                Supprimer le contact
              </button>
            )}

            {contactMessage && (
              <p
                className="settings-feedback"
                role="status"
              >
                {contactMessage}
              </p>
            )}
          </div>
        </section>

        {/* CONFIDENTIALITÉ */}

        <section className="settings-section">
          <h2>Confidentialité</h2>

          <div className="settings-item settings-static-item">
            <span className="settings-item-icon">
              <ShieldCheck size={20} />
            </span>

            <span className="settings-item-text">
              <strong>
                Données enregistrées
              </strong>

              <small>
                Vos préférences et votre contact d'urgence
                sont enregistrés sur cet appareil.
              </small>
            </span>
          </div>
        </section>

        {/* DÉCONNEXION */}

        {user && (
          <button
            type="button"
            className="settings-logout"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            Se déconnecter
          </button>
        )}

        <p className="settings-footer">
          BADDIES · Prenez soin de vous
        </p>
      </main>
    </>
  );
}
