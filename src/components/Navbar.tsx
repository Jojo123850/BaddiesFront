import { useRef, useState, type SyntheticEvent } from "react";
import { NavLink, Link } from "react-router-dom";
import { House, ClipboardList, ChartNoAxesColumnIncreasing, HeartPulse, X } from "lucide-react";

import SettingsPage from "../pages/Setting";

import "../styles/navbar.scss";

import logo from "../assets/images/logo-nav.webp";
import defaultProfile from "../assets/images/IM(.webp";

function getProfileImage(): string {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) return defaultProfile;

  try {
    const user = JSON.parse(storedUser);

    return typeof user?.avatar_url === "string" && user.avatar_url.trim()
      ? user.avatar_url
      : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  if (event.currentTarget.getAttribute("src") !== defaultProfile) {
    event.currentTarget.src = defaultProfile;
  }
}

export default function Navbar() {
  const profileImage = getProfileImage();
  const settingsRef = useRef<HTMLDialogElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = () => {
    setSettingsOpen(true);

    if (!settingsRef.current?.open) {
      settingsRef.current?.showModal();
    }
  };

  const closeSettings = () => {
    settingsRef.current?.close();
  };

  return (
    <>
      <dialog ref={settingsRef} className="settings-panel" aria-labelledby="settings-panel-title" onClose={() => setSettingsOpen(false)} onClickCapture={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          closeSettings();
        }
      }}>
        <div className="settings-panel-header">
          <h2 id="settings-panel-title">Paramètres</h2>

          <button type="button" className="settings-panel-close" onClick={closeSettings} aria-label="Fermer les paramètres">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {settingsOpen && <SettingsPage embedded onClose={closeSettings} />}
      </dialog>

      <header className="app-header">
        <div className="topNav">
          <Link to="/Home" className="brand" aria-label="BADDIES - Accueil">
            <img src={logo} className="brand-logo" alt="" width={105} height={105} fetchPriority="high" />
          </Link>

          <button type="button" className="profile-link" onClick={openSettings} aria-label="Ouvrir les paramètres" aria-haspopup="dialog">
            <img key={profileImage} src={profileImage} className="profile-avatar" alt="" width={70} height={70} onError={handleImageError} />
          </button>
        </div>

        <nav className="bottomNav" aria-label="Navigation principale">
          <ul>
            <li>
              <NavLink to="/Home" className="nav-item">
                <House size={23} strokeWidth={1.7} aria-hidden="true" />
                <span>Accueil</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/analyse" className="nav-item">
                <ClipboardList size={23} strokeWidth={1.7} aria-hidden="true" />
                <span>Analyse</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/Suivi" className="nav-item">
                <ChartNoAxesColumnIncreasing size={23} strokeWidth={1.7} aria-hidden="true" />
                <span>Suivi</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/emergencyContact" className="nav-item nav-emergency">
                <HeartPulse size={23} strokeWidth={1.7} aria-hidden="true" />
                <span>Urgence</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}