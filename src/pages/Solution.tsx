import Navbar from "../components/Navbar";
import "../styles/navbar.scss";
import "../styles/solution.scss";
import db from "../data/db.json";
import { useEvaluation } from "../evaluation/useEvaluation";

export function Solution (){
    const {evaluation} = useEvaluation()

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
           // const symptomeOk= 
           //     !solution.symptomes_cibles ||
               
           //     solution.contextes.includes(evaluation.symptomes)
           
               return(
                   intensityOk &&
                   localisatiokOk &&
                   contexteOk 
                   // symptomeOk
               )
   
       })
       return(
           <>
           <Navbar/>
           <section>

           <h2 className="titleSolution">Geste conseillé</h2>
           <div id="solution">

            {solutionsFiltre.
             map((item) => (
                <>
                    <article className="contentSolution" key={item.id}>
                        <h3>{item.label}</h3>
                        <p className="solutionPara">{item.description}</p>
                    </article>
                </>
             ))}
           </div>
           </section>
           </>
   
       )
    }