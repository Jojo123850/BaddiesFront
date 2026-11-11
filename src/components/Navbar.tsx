
import { useRef, useState, type SyntheticEvent } from "react";
import { NavLink, Link } from "react-router-dom";
import {  
House, ClipboardList, ChartNoAxesColumnIncreasing, HeartPulse, HeartHandshake, X
} from "lucide-react";

import SettingsPage from "../pages/Setting";
import { useEvaluation } from "../evaluation/useEvaluation";

import logo from "../assets/images/logo-nav.webp";
import defaultProfile from "../assets/images/IM(.webp";

import "../styles/components/navbar.scss";

function getProfileImage(): string {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token || !storedUser) {
    return defaultProfile;
  }

  try {
    const user = JSON.parse(storedUser);

    return typeof user?.avatar_url === "string" &&
      user.avatar_url.trim()
      ? user.avatar_url
      : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function handleImageError(
  event: SyntheticEvent<HTMLImageElement>
) {
  if (event.currentTarget.getAttribute("src") !== defaultProfile) {
    event.currentTarget.src = defaultProfile;
  }
}

export default function Navbar() {
  const { resetEvaluation } = useEvaluation();

  const profileImage = getProfileImage();

  const settingsRef = useRef<HTMLDialogElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const age = localStorage.getItem("baddies-age");
  const canEvaluate = age === "+15ans";

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
      {/* FENÊTRE PARAMÈTRES */}

      <dialog ref={settingsRef} className="settings-panel" aria-labelledby="settings-panel-title"
        onClose={() =>
          setSettingsOpen(false)
        }
        onClick={(event) => { /* Fermer seulement si le clic est à l'extérieur du panneau. */ if (event.target !== event.currentTarget) return;
          const panel = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < panel.left || event.clientX > panel.right || event.clientY < panel.top || event.clientY > panel.bottom;
          if (outside) closeSettings();
        }}
        onClickCapture={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            closeSettings();
          }
        }}
      >

        <div className="settings-panel-header">
          <h2 id="settings-panel-title">Paramètres</h2>

          <button type="button" className="settings-panel-close" onClick={closeSettings} aria-label="Fermer les paramètres">
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {settingsOpen && (
          <SettingsPage embedded onClose={closeSettings} />
        )}
      </dialog>

      <header className="app-header">
        {/* HEADER COMMUN MOBILE ET DESKTOP */}

        <div className="topNav">


          {/* LOGO AVEC TEXTE AU SURVOL */}

          <Link to="/Home" className="brand" aria-label="BADDIES - Accueil">

            <img src={logo} className="brand-logo" alt="" width={105} height={105} fetchPriority="high" />

            <span className="brand-name">
              BADDIES
            </span>
          </Link>



          {/* NAVIGATION DESKTOP */}

          <nav className="desktopNav" aria-label="Navigation desktop">

            <NavLink to="/Home" end>
              Accueil
            </NavLink>

            {canEvaluate ? (
              <>
                <NavLink to="/analyse" onClick={resetEvaluation}>
                  Analyser
                </NavLink>

                <NavLink to="/Suivi">
                  Suivi
                </NavLink>
              </>
            ) : (
              <NavLink to="/ImmediateHelp">
                Premiers gestes
              </NavLink>
            )}

            <NavLink to="/emergencyContact">
              Urgence
            </NavLink>
          </nav>


          {/* AVATAR */}

          <button type="button" className="profile-link" onClick={openSettings} aria-label="Ouvrir les paramètres" aria-haspopup="dialog">
            <img key={profileImage} src={profileImage} className="profile-avatar" alt="" width={70} height={70} onError={handleImageError} />
          </button>

        </div>


        {/* NAVIGATION MOBILE */}
        <nav className="bottomNav" aria-label="Navigation principale mobile">
          <ul>
            <li>
              <NavLink to="/Home" className="nav-item">
                <House size={23} strokeWidth={1.7} aria-hidden="true" />
                <span>Accueil</span>
              </NavLink>
            </li>

            {canEvaluate ? (
              <>
                <li>
                  <NavLink to="/analyse" onClick={resetEvaluation} className="nav-item">
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
              </>
            ) : (
              <li>
                <NavLink to="/ImmediateHelp" className="nav-item">

                  <HeartHandshake size={23} strokeWidth={1.7} aria-hidden="true" />
                  <span>Premiers gestes</span>
                </NavLink>
              </li>
            )}

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
