import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/solution.scss";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";
// import MedicalAlert from "./MedicalAlert";
import { Link } from "react-router-dom";
import { saveEvaluation } from "../services/localStorageService";
import { useState } from "react";
import { createHistory } from "../services/historyService";

export function Solution (){
    const {evaluation} = useEvaluation()
    const [saved, setSaved] = useState(false);
    
const handleSave = async () => {
    if (saved) return;

    const token = localStorage.getItem("token");

    try {
        if (token) {
            await createHistory(evaluation, solutionsFiltre);
        } else {
            saveEvaluation(evaluation, solutionsFiltre);
        }

        setSaved(true);
    } catch (error) {
        console.error("Erreur enregistrement :", error);
    }
};
    const solutionsFiltre = db.solutions.filter((solution) => {
           const intensityOk =
               !solution.intensites || 
               (evaluation.intensiteNiveau !== null &&
                   solution.intensites.includes(evaluation.intensiteNiveau));
               
           const localisatiokOk = 
               !solution.localisations ||
               evaluation.localisations.some((localisation) =>
               solution.localisations.includes(localisation))
   
           const contexteOk =
               !solution.contextes ||
               (evaluation.contextes !== null &&
                   solution.contextes.includes(evaluation.contextes));
            const symptomeOk =
                !solution.symptomes_cibles ||
                solution.symptomes_cibles.some(symptome =>
                evaluation.symptomes.includes(symptome)
             );
           
               return(
                   intensityOk &&
                   localisatiokOk &&
                   contexteOk &&
                    symptomeOk
               )
   
       })
       return(
           <>
           <Navbar/>
           <Link to="/Localisation" className="retour">
                                <i className="fa-solid fa-chevron-left"></i>
            </Link>
           <section>

           <h2 className="titleSolution">Geste conseillé</h2>
           <div id="solution">
            {/* <MedicalAlert/> */}
            {solutionsFiltre.
             map((item) => (
                    <article className="contentSolution" key={item.id}>
                        <h3>{item.label}</h3>
                        <p className="solutionPara">{item.description}</p>
                    </article>
                
             ))}
           </div>
           </section>
           <section>
            <button
                className="btn"
            onClick={handleSave} disabled={saved}
            >
                   {saved ? "Épisode enregistré" : "+ Enregistrer cet épisode"}
        </button>
           <Link to="/Home">Evaluation terminé</Link>
            <p>Information générale, ne remplace pas un avis médical</p>

           </section>
           </>
   
       )
    }