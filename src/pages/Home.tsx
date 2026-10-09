import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Collapse from "../components/Collapse";
import "../styles/navbar.scss";
import "../styles/home.scss";
import homeImage from "../assets/images/f6582a18b6158c3bf409305bda0f8a88-Photoroom.webp";
import { getEvaluations } from "../services/localStorageService";


export function Home(){
     const hasHistory = localStorage.getItem("token") || getEvaluations().length > 0;
    return (
        <>
        <Navbar/>
        <section>
            <h1>Votre assistant de premier geste pour les douleurs menstruelles, utilisable même hors ligne.</h1>
            <p>Parce que chaque femme et chaque cycle sont uniques,ce questionnaire rapide nous permet de comprendre précisément votre inconfort. 
            En moins de deux minutes, découvrez  les gestes simples pour apaiser votre corps immédiatement et naturellement.</p>
            <div>
                <img className="homeImage" src={homeImage} alt="HomeImage" />
            </div>
            <Link to= "/Analyse" className="btn">Commencer à évaluer</Link>
            <hr className="hr1" />
        </section>

        <section>
            <Collapse/>
        </section>

        
        <section className="historyHome">
                <h2>Votre historique</h2>
                <p>Retrouvez vos dernières évaluations</p>

               
        {hasHistory && ( <section className="historyHome"> ... </section> )}
        </section>
        </>
    )
}