import {  useState, useEffect } from "react"
import type { HistoryEvaluation } from "../services/localStorageService"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/historyService";

export  function History(){
const navigate = useNavigate();
const [history, setHistory] = useState<HistoryEvaluation[]>([]);

useEffect(() => {
    // pour récuperer les historiques
    const loadHistory = async () => {
        try {
            const token = localStorage.getItem("token");

            if (token) {
            //  récupère l'historique depuis le backend
                const data = await getHistory();
                setHistory(data);

            } else {
                //  récupère l'historique depuis le backend, en tableau JSON, sinon pas d'historique
                const historiqueStock = localStorage.getItem("historique");

                if (historiqueStock) {
                    setHistory(JSON.parse(historiqueStock));
                } else {
                    setHistory([]);
                }
            }

        } catch (error) {
            console.error("Erreur historique :", error);
        }
    };

    loadHistory();
}, []);

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
