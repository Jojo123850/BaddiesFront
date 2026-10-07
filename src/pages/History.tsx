import {  useState } from "react"
import type { HistoryEvaluation } from "../services/localStorageService"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export  function History(){
const navigate = useNavigate();
const [history] = useState<HistoryEvaluation[]>(() => {
        const historyStock = localStorage.getItem("historique");

        if (historyStock) {
            return JSON.parse(historyStock);
        }

        return [];
});
    return(
        <>
            <h2>Mes évaluations</h2>
            {history.length===0 ? (
                <p>Aucune évaluation actuellement</p>

            ):(history.map((item) => (
                <article key={item.id}>
                    <p>
                        {new Date(item.date).toLocaleDateString("fr-FR")}
                    </p>
                    <p>
                        Douleur {item.evaluation.intensiteNiveau}

                    </p>
                    <p>
                        Localisation:{item.evaluation.localisations.join(",")}
                    </p>
                    <button className="btn" onClick={() => navigate(`/Historique/${item.id}`)}>
                        Voir l'épisode
                    </button>
                    

                </article>
                

            ))

           ) }

            <Link to="/Home"  className="btn">
                Retour à l'accueil
            </Link>

        </>
    )
} 
