import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import Symptom from "../components/Symptom";
import Character from "../components/Pain_Character";
import { Recap } from "../components/Recap";


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
            <section>
                <Recap/>
            </section>
            <section>
                <div>
                     <Symptom/>  
                </div>
                <div>
                    <Character/>
                </div>
            </section>
         
         
             <button disabled = {Symptom === null} onClick={handleContinue} className="btn">Voir les solutions</button>

        </>
    )
}