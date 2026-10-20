import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.scss";

import {
  House,
  ClipboardList,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
} from "lucide-react";

import logo from "../assets/images/logo-nav.webp"
import defaultProfile from "../assets/images/IM(.webp";

export default function Navbar() {
  return (
    <header className="app-header">
      <div className="topNav">
        <Link
          to="/Home"
          className="brand"
          aria-label="BADDIES - Accueil"
        >
          <img
            src={logo}
            className="brand-logo"
            alt=""
            width={105}
            height={105}
            fetchPriority="high"
          />
        </Link>

        <Link
          to="/Setting"
          className="profile-link"
          aria-label="Accéder à mon profil"
        >
          <img
            src={defaultProfile}
            className="profile-avatar"
            alt=""
            width={70}
            height={70}
          />
        </Link>
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
              <ChartNoAxesColumnIncreasing
                size={23}
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span>Suivi</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/emergencyContact"
              className="nav-item nav-emergency"
            >
              <HeartPulse size={23} strokeWidth={1.7} aria-hidden="true" />
              <span>Urgence</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}