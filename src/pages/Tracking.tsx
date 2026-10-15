import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { PainChart } from "../components/PainChart";

import type { HistoryEvaluation } from "../services/localStorageService";
import { getHistory } from "../services/historyService";
import { History } from "./History";

import "../styles/tracking.scss";

export default function Tracking() {
  const [history, setHistory] = useState<HistoryEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState("suivi")

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
            <button  onClick={() => setIsActive("suivi")}
            className={`btn-fond ${isActive === "suivi" ? "active" : ""}`} >Suivi</button>
            <button  onClick={() => setIsActive("historique")}
            className={`btn-fond ${isActive === "historique" ? "active" : ""}`}>Historique</button>
            <button  onClick={() => setIsActive("comparaison")}
            className={` btn-fond ${isActive === "comparaison" ? "active" : ""}`}>Comparaison</button>
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
                <h1>Votre historique </h1>

                <h2>Historique de ma douleur</h2>
                <History />
            </>
        )
         }

          {isActive=== "comparaison"  &&(
            <>
                <h1>Comparaison de votre douleur </h1>
                {/* <History /> */}
            </>
        )
         }
      </main>
    </>
  );
}