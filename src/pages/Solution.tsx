
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/home.scss";
import { Link } from "react-router-dom";
export function SolutionPain(){
    return (
        <>
        <Navbar/>
        <div>
            <Link to="/Localisation" className="retour">
                    <i className="fa-solid fa-chevron-left"></i>
            </Link>
            <button className="btn">Ajouter au favoris</button>
        </div>
        




        </>
    )
}