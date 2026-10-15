import { NavLink, Link } from "react-router-dom";
import "../styles/navbar.scss";

import {
  House,
  ClipboardList,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
} from "lucide-react";

import logo from "../assets/images/logoFinal.webp";
import defaultProfile from "../assets/images/DefaultProfile.webp";

export default function Navbar() {
  return (
    <header className="app-header">

      <div className="topNav">
        <Link to="/Home" className="brand">
          <img
            src={logo}
            className="brand-logo"
            alt="Logo BADDIES"
          />
        </Link>

        <Link to="/Setting" className="profile-link">
          <img
            src={defaultProfile}
            className="profile-avatar"
            alt="Mon profil"
          />
        </Link>
      </div>

      <nav className="bottomNav">
        <ul>
         



          <li>
            <NavLink to="/Home" className="nav-item">
               <House size={23} strokeWidth={1.7} />
              <span>Accueil</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/analyse" className="nav-item">
           
              <ClipboardList size={23} strokeWidth={1.7} />
              <span>Analyse</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/Suivi" className="nav-item">
             
              <ChartNoAxesColumnIncreasing size={23} strokeWidth={1.7} />
              <span>Suivi</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/emergencyContact"
              className="nav-item nav-emergency"
            >
              
              <HeartPulse size={23} strokeWidth={1.7} />
              <span>Urgence</span>
            </NavLink>
          </li>
        </ul>
      </nav>

    </header>
  );
}
