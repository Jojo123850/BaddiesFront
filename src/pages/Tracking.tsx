import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { PainChart } from "../components/PainChart";

import type { HistoryEvaluation } from "../services/localStorageService";
import { getHistory } from "../services/historyService";
import { History } from "../components/History";
import { useSearchParams } from "react-router-dom";

import "../styles/tracking.scss";

export default function Tracking() {
  const [history, setHistory] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
//  

  const [searchParams, setSearchParams] = useSearchParams();

const tab = searchParams.get("tab");

const isActive =tab === "historique" || tab === "comparaison"
    ? tab
    : "suivi";

const setIsActive = (onglet: string) => {
  setSearchParams({ tab: onglet });
};
 

 
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token && navigator.onLine) {
          const data = await getHistory();
          setHistory(data);
        } else {
          const historiqueStock = localStorage.getItem("historique");

          setHistory(
            historiqueStock ? JSON.parse(historiqueStock) : []
          );
        }
      } catch (error) {
        console.error("Erreur suivi :", error);

        // Repli local si le serveur ne répond pas
        const historiqueStock = localStorage.getItem("historique");

        setHistory(
          historiqueStock ? JSON.parse(historiqueStock) : []
        );
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const evaluations = history
    .filter(
      (item) =>
        typeof item.evaluation.intensiteValeur === "number" &&
        !Number.isNaN(new Date(item.date).getTime())
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
      }),
      intensite: item.evaluation.intensiteValeur as number,
    }));

  return (
    <>
      <Navbar />

      <main className="tracking">
       
        <div className="btnSuivi">
            <div>
                <button  onClick={() => setIsActive("suivi")}
                className={`btn-fond ${isActive === "suivi" ? "active" : ""}`} >Suivi</button>
            </div>
            <div>
                <button  onClick={() => setIsActive("historique")}
                className={`btn-fond ${isActive === "historique" ? "active" : ""}`}>Historique</button>
            </div>

        </div>
        {isActive=== "suivi"  &&(
            <>
                <h1>Mon suivi</h1>

                <h2>Évolution de ma douleur</h2>
                {loading ? (
                <p>Chargement des évaluations...</p>
                ) : (
                
                <PainChart evaluations={evaluations} />
                )}
            </>
        )
         }

        {isActive=== "historique"  &&(
            <>  
                <History />
            </>
        )
         }

          
      </main>
    </>
  );
}