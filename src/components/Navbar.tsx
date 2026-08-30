import { Link } from "react-router-dom";
import BurgerM from "./BurgerMenu";

export default function Navbar (){
  return(
    <header>
      <div className="topNav">
        <Link to="/">
            <img src="../src/IMG/logo.jpeg" alt="logo" />
        </Link>
        <BurgerM/>
      </div>
      <div className="bottomNav">
        <ul>
          <li>
            <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11.5L12 4l9 7.5" />
                <path d="M5.5 10v9a1 1 0 0 0 1 1H9v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4h2.5a1 1 0 0 0 1-1v-9" />
                <path d="M12 15.2c1.6-1.3 2.6-2.1 2.6-3.2a1.4 1.4 0 0 0-2.6-.8 1.4 1.4 0 0 0-2.6.8c0 1.1 1 1.9 2.6 3.2z" fill="currentColor" stroke="none" />
                </svg>
                <span>Accueil</span>
           </Link>
          </li>
          <li>
            <Link to="/Analyse">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="12" rx="2" />
                <path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
                </svg>
                <span>Analyse</span>  
            </Link>
          </li>
          <li  className="btn" ><Link to="/"><span>Obtenir de l'aide</span></Link></li>
        </ul>
      </div>
    </header>
  )
}