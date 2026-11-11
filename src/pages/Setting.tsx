import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UserRound, ChevronRight, Globe, HeartPulse, UserRoundCheck, Pencil, Plus, ShieldCheck, LogOut } from "lucide-react";

import Navbar from "../components/Navbar";
import defaultProfile from "../assets/images/IM(.webp";

import { hasAnalyticsConsent, saveAnalyticsConsent } from "../services/analytics";

import { hasHealthConsent, withdrawHealthConsent } from "../services/healthConsent";
import { apiService } from "../services/apiService";


import "../styles/pages/setting.scss";
import "../styles/components/delete.scss";


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

type SettingsProps = {
  embedded?: boolean;
  onClose?: () => void;
};

type DeleteProps = {
  onAccept: () => void;
  onRefuse: () => void;
};


function getStoredUser(): User | null {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser);

    if (
      !parsed ||
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

function getStoredCountry(): string {
  const country = localStorage.getItem("country") ?? "";
  return ["MG", "Mada", "Madagascar"].includes(country) ? "Mada" : "France";
}

function getStoredContact(): EmergencyContact {
  const stored = localStorage.getItem("emergencyContact");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);

      return {
        name: typeof parsed?.name === "string" ? parsed.name : "",
        phone: typeof parsed?.phone === "string" ? parsed.phone : ""
      };
    } catch {
      return { name: "", phone: "" };
    }
  }

  return { name: "", phone: "" };
}



function Delete({ onAccept, onRefuse }: DeleteProps) {

  return (
    <div id="delete-overlay">
      <div className="delete-card" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Supprimer le contact ?</h2>

        <p>
          Voulez-vous vraiment supprimer votre contact  ?
        </p>


        <div className="delete-actions">
          <button type="button" onClick={onRefuse}>
            Annuler
          </button>

          <button type="button" onClick={onAccept}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
export default function Settings({ embedded = false, onClose }: SettingsProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(getStoredUser);
  const [country, setCountry] = useState(getStoredCountry);
  const [contact, setContact] = useState<EmergencyContact>(getStoredContact);
  const [editingContact, setEditingContact] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(
    hasAnalyticsConsent
  );

  const hasContact = Boolean(contact.name.trim() && contact.phone.trim());
  const Container = embedded ? "div" : "main";

  const age = localStorage.getItem("baddies-age");
  const canConnect = age === "+15ans";

  const [hasConsent, setHasConsent] = useState(
    hasHealthConsent
  );
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [deleteAccountError, setDeleteAccountError] = useState("");

  const handleDeleteAccount = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (deletingAccount) return;

    setDeletingAccount(true);
    setDeleteAccountError("");

    try {
      await apiService.deleteAccount(deletePassword);
    } catch (error) {
      setDeleteAccountError(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer le compte."
      );
      setDeletingAccount(false);
      return;
    }

    // Le serveur a confirmé la suppression.
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("login");

    setDeletePassword("");
    setUser(null);
    onClose?.();
    navigate("/Home", { replace: true });
  };

  const handleDeleteConsent = () => {
    withdrawHealthConsent();
    setHasConsent(false);
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    localStorage.setItem("country", value);
    window.dispatchEvent(new Event("settings-updated"));
  };

  const handleSaveContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = contact.name.trim();
    const phone = contact.phone.trim();

    if (!name || !phone) {
      setContactMessage("Remplissez le nom et le téléphone.");
      setContactError(true);
      return;
    }

    const savedContact = { name, phone };

    localStorage.setItem("emergencyContact", JSON.stringify(savedContact));
    window.dispatchEvent(new Event("settings-updated"));

    setContact(savedContact);
    setEditingContact(false);
    setContactMessage("Contact enregistré.");
    setContactError(false);
  };

  const handleDeleteContact = () => {
    localStorage.removeItem("emergencyContact");
    window.dispatchEvent(new Event("settings-updated"));

    setContact({ name: "", phone: "" });
    setEditingContact(false);
    setContactMessage("Contact supprimé.");
    setContactError(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("login");

    setUser(null);
    onClose?.();
    navigate("/Home");
  };

  return (
    <>
      {!embedded && <Navbar />}

      <Container className="settings-page">
        {!embedded && <h1>Paramètres</h1>}

        <section className="settings-profile" aria-label="Profil utilisateur">
          <img src={user?.avatar_url || defaultProfile} alt="Photo de profil" className="settings-avatar"
            onError={(event) => {
              if (event.currentTarget.getAttribute("src") !== defaultProfile) {
                event.currentTarget.src = defaultProfile;
              }
            }}
          />

          <div className="settings-profile-info">
            {user ? (
              <>
                <h2 className="pseudo">{user.pseudo}</h2>
                <p className="paraSetting">{user.email}</p>

                <span className="setting-login">
                  Statut : Connecté
                </span>
              </>
            ) : (
              <>
                <h2 className="pseudo">BIENVENUE SUR BADDIES</h2>
                <p className="paraSetting">Utilisation sans compte</p>
                {canConnect && (
                  <Link to="/Login" className="home-btn">
                    Se connecter
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>

                )}
              </>

            )}
          </div>


        </section>

        <h2 className="settings-eyebrow">MON ESPACE</h2>

        <p className="paraSetting">
          {canConnect
            ? "Utilisation sans compte"
            : "Accès aux premiers gestes sans compte"}
        </p>

        {canConnect && user && (
          <section className="settings-section">
            <h2>Mon compte</h2>

            <Link to="/EditProfile" className="settings-item">
              <span className="settings-item-icon">
                <UserRound size={20} aria-hidden="true" />
              </span>

              <span className="settings-item-text">
                <strong>Informations personnelles</strong>
                <small>Modifier mon profil</small>
              </span>

              <ChevronRight className="settings-arrow" size={18} aria-hidden="true" />
            </Link>
          </section>
        )}

        <section className="settings-section">
          <h2>Préférences</h2>

          <div className="settings-field">
            <label htmlFor="settings-country" className="settings-field-title">
              <span className="settings-item-icon">
                <Globe size={20} aria-hidden="true" />
              </span>

              <span>
                <strong>Pays</strong>
                <small>Pour adapter les informations locales</small>
              </span>
            </label>

            <select id="settings-country" value={country}
              onChange={(event) =>
                handleCountryChange(event.target.value)
              }
              className="settings-select"
            >
              <option value="France">France</option>
              <option value="Mada">Madagascar</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h2>Sécurité</h2>

          <div className="settings-field">
            <div className="settings-field-title">
              <span className="settings-item-icon">
                <HeartPulse size={20} aria-hidden="true" />
              </span>

              <div>
                <strong>Contact d'urgence</strong>
                <small>Un proche à contacter en cas de besoin</small>
              </div>
            </div>

            {hasContact && !editingContact && (
              <div className="settings-contact-preview">
                <UserRoundCheck size={21} aria-hidden="true" />

                <div>
                  <strong>{contact.name}</strong>
                  <p>{contact.phone}</p>
                </div>
              </div>
            )}

            {!editingContact ? (
              <button type="button" className="settings-secondary-btn"
                onClick={() => {
                  setEditingContact(true);
                  setContactMessage("");
                  setContactError(false);
                }}
              >
                {hasContact ? (
                  <Pencil size={17} aria-hidden="true" />
                ) : (
                  <Plus size={18} aria-hidden="true" />
                )}

                {hasContact ? "Modifier mon contact" : "Ajouter un contact"}
              </button>
            ) : (
              <form className="settings-contact-form" onSubmit={handleSaveContact}>
                <label htmlFor="emergency-name">Nom du proche</label>

                <input id="emergency-name" name="emergency-name" type="text" autoComplete="name" value={contact.name}
                  onChange={(event) =>
                    setContact((prev) =>
                      ({ ...prev, name: event.target.value }))
                  }
                  placeholder="Marie" required
                />

                <label htmlFor="emergency-phone">Numéro de téléphone</label>

                <input id="emergency-phone" name="emergency-phone" type="tel" autoComplete="tel" value={contact.phone}
                  onChange={(event) =>
                    setContact((prev) =>
                      ({ ...prev, phone: event.target.value }))
                  }
                  placeholder="+33 6 ..." required
                />

                <div className="settings-form-actions">
                  <button type="button" className="settings-cancel-btn"
                    onClick={() => {
                      setContact(getStoredContact());
                      setEditingContact(false);
                      setContactMessage("");
                      setContactError(false);
                    }}
                  >
                    Annuler
                  </button>

                  <button type="submit" className="settings-save-btn">
                    Enregistrer
                  </button>
                </div>
              </form>
            )}

            {hasContact && !editingContact && (
              <button type="button" className="settings-delete-btn"
                onClick={() =>
                  setShowDelete(true)
                }
              >
                Supprimer le contact
              </button>
            )}

            {contactMessage && (
              <p className="settings-feedback"
                role={
                  contactError
                    ? "alert"
                    : "status"
                }
              >
                {contactMessage}
              </p>
            )}
          </div>
        </section>
        <section className="settings-section">
          <h2>Confidentialité et consentements</h2>

          <div className="settings-field">
            <label className="consent-option">
              <input type="checkbox" checked={analyticsEnabled}
                onChange={(e) => {
                  const enabled = e.target.checked;
                  saveAnalyticsConsent(enabled
                    ? "accepted"
                    : "refused");
                  setAnalyticsEnabled(enabled);
                }}
              />
              <span>
                <strong>Statistiques Google Analytics</strong>
                <small>
                  Autoriser ou refuser la mesure de fréquentation.
                </small>
              </span>
            </label>
          </div>

          {canConnect && (
            <div className="settings-field">
              <p>
                Données de santé :
                {hasConsent ? " Consentement actif" : " Non autorisé"}
              </p>

              {hasConsent && (
                <button type="button" className="settings-secondary-btn" onClick={handleDeleteConsent}>
                  Retirer mon consentement de santé
                </button>
              )}
            </div>
          )}
        </section>



        <section className="settings-section settings-privacy">
          <h2>Informations</h2>

          <div className="settings-privacy-list">
            <Link to="/LegaleNotice" className="settings-privacy-link">
              <ShieldCheck size={19} aria-hidden="true" />
              <span>Mentions légales</span>
              <ChevronRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/PrivacyPolicy" className="settings-privacy-link">
              <ShieldCheck size={19} aria-hidden="true" />
              <span>Politique de confidentialité</span>
              <ChevronRight size={18} aria-hidden="true" />
            </Link>

            <Link to="/CGU" className="settings-privacy-link">
              <ShieldCheck size={19} aria-hidden="true" />
              <span>Conditions générales d'utilisation</span>
              <ChevronRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>


        {canConnect && user && (
          <button type="button" className="settings-logout" onClick={handleLogout}>
            <LogOut size={19} aria-hidden="true" />
            Se déconnecter
          </button>
        )}
        {canConnect && user && (
          <button type="button" className="settings-logout"
            onClick={() => {
              setShowDelete(false);
              setDeletePassword("");
              setDeleteAccountError("");
              setShowDeleteAccount(true);
            }}
          >
            Supprimer définitivement mon compte
          </button>
        )}

      </Container>
      {canConnect && user && showDeleteAccount && (
        <div id="delete-overlay">
          <div className="delete-card" role="dialog" aria-modal="true" aria-labelledby="delete-account-title" aria-describedby="delete-account-description" aria-busy={deletingAccount}>
            <h2 id="delete-account-title">
              Supprimer votre compte ?
            </h2>

            <p id="delete-account-description">
              Votre compte et ses évaluations enregistrées en ligne
              seront supprimés définitivement. Les évaluations locales
              et les fichiers téléchargés resteront sur votre appareil.
            </p>

            <form onSubmit={handleDeleteAccount} className="settings-contact-form">
              <label htmlFor="delete-account-password">
                Confirmez avec votre mot de passe
              </label>

              <input id="delete-account-password" type="password" autoComplete="current-password" value={deletePassword}
                onChange={(event) =>
                  setDeletePassword(event.target.value)
                }
                disabled={deletingAccount} required
              />

              {deleteAccountError && (
                <p role="alert">{deleteAccountError}</p>
              )}

              <div className="delete-actions">
                <button type="button" disabled={deletingAccount}
                  onClick={() => {
                    setShowDeleteAccount(false);
                    setDeletePassword("");
                    setDeleteAccountError("");
                  }}
                >
                  Annuler
                </button>

                <button type="submit" disabled={deletingAccount || !deletePassword}>
                  {deletingAccount ? "Suppression…" : "Supprimer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showDelete && !showDeleteAccount && (
        <Delete
          onRefuse={() =>
            setShowDelete(false)
          }
          onAccept={() => {
            handleDeleteContact();
            setShowDelete(false);
          }}
        />
      )}
    </>
  );
}