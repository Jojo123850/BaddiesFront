import {  useState, useEffect } from "react"
import type { HistoryEvaluation } from "../services/localStorageService"
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/historyService";
import "../styles/tracking.scss";
import { MapPin } from "lucide-react";

export  function History(){
const navigate = useNavigate();
const [history, setHistory] = useState<HistoryEvaluation[]>([]);
 const [filtre, setFiltre] = useState("recent")


  const historyFiltree = [...history]
  .filter((item) => {
    if (filtre === "intense") {
      return item.evaluation.intensiteNiveau === "intense";
    }

    if (filtre === "moderee") {
      return item.evaluation.intensiteNiveau === "moderee";
    }

    if (filtre === "legere") {
      return item.evaluation.intensiteNiveau === "legere";
    }

    return true;
  })
  .sort((a, b) => {
    const datePainA = new Date(a.date).getTime();
    const datePainB= new Date(b.date).getTime();

    if (filtre === "ancien") {
      return datePainA - datePainB;
    }

    return datePainB - datePainA;
  });


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
        <h1>Mon historique </h1>
        <article className="filtreArt">
            <h2>Evaluation</h2>
            <div className="historyFilters">
                <select value={filtre} onChange={(e) => setFiltre(e.target.value)}>
                    <option value="recent">Plus récentes</option>
                    <option value="ancien">Plus anciennes</option>
                    <option value="intense">Douleur intense</option>
                    <option value="moderee">Douleur modérée</option>
                    <option value="legere">Douleur légère</option>
                </select>
            </div>
        </article>
            {history.length===0 ? (
                
                <p>Aucune évaluation actuellement
                   <br /> <span>Commencez à faire une évaluation pour pouvoir l'enregistrer</span>
                </p>

            ):(historyFiltree.map((item) => (
               <article key={item.id} className="historyArticle">
                <div className="historyContent">
                    <div className="blocHistory">
                    <p className="date">
                        {new Date(item.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        })}
                    </p>
                    <p className="paraHistory">
                        {item.evaluation.intensiteNiveau}
                    </p>
                    </div>

                    <div className="zone">
                    <MapPin className="map" />
                    <p>{item.evaluation.localisations.join(", ")}</p>
                    </div>

                    <p className="intensity">
                    {item.evaluation.intensiteValeur}/10
                    </p>
                </div>

                <button
                    className="btnEpisode"
                    onClick={() => navigate(`/Historique/${item.id}`)}
                >
                    Voir l'épisode
                </button>
                </article>
                                

                            ))

                        ) }


                        </>
                    )
                } 
