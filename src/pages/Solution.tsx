import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";


export default function Solution (){

     const navigate = useNavigate();

     

    const handleContinue = () => {
        if (Symptom === null) return;
        navigate("/Home");
    };
    return(
        <>
             <Navbar/>
                    <div className="switch">
                        <Link to="/Localisation" className="retour">
                                <i className="fa-solid fa-chevron-left"></i>
                        </Link>
                        <button className="btn">Ajouter au favoris</button>
                    </div>
            <Symptom/>
            <Character/>
         
         
             <button disabled = {Symptom === null} onClick={handleContinue} className="btn">Voir les solutions</button>

        </>
    )
}