import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { PainChart } from "../components/PainChart";
import { History } from "../components/History";

import type { HistoryEvaluation } from "../services/localStorageService";
import { getHistory } from "../services/historyService";

import "../styles/tracking.scss";

export default function Tracking() {
    const [history, setHistory] = useState<HistoryEvaluation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const tab = searchParams.get("tab");
    const isActive = tab === "historique" ? "historique" : "suivi";

    const setIsActive = (onglet: "suivi" | "historique") => {
        setSearchParams({ tab: onglet });
    };

    useEffect(() => {
        let active = true;

        const loadLocalHistory = (): HistoryEvaluation[] => {
            try {
                const historiqueStock = localStorage.getItem("historique");
                return historiqueStock ? JSON.parse(historiqueStock) : [];
            } catch (error) {
                console.error("Erreur historique local :", error);
                return [];
            }
        };

        const loadHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token && navigator.onLine) {
                    const data = await getHistory();
                    if (active) setHistory(data);
                } else {
                    if (active) setHistory(loadLocalHistory());
                }
            } catch (error) {
                console.error("Erreur suivi :", error);
                if (active) setHistory(loadLocalHistory());
            } finally {
                if (active) setLoading(false);
            }
        };

        loadHistory();
        return () => { active = false; };
    }, []);

    // Repères visuels uniquement : les réponses enregistrées ne sont pas modifiées.
    const niveauxQuestionnaire: Record<string, number> = {
        legere: 2,
        moderee: 5,
        intense: 8,
    };

    const evaluations = [...history]
        .filter((item) => !Number.isNaN(new Date(item.date).getTime()))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((item) => {
            const note = item.evaluation.intensiteValeur;
            const noteValide = typeof note === "number" &&
                Number.isFinite(note) && note >= 0 && note <= 10;

            return {
                date: new Date(item.date).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                intensite: noteValide
                    ? note
                    : niveauxQuestionnaire[item.evaluation.intensiteNiveau ?? ""],
                questionnaire: !noteValide,
            };
        })
        .filter((item) => typeof item.intensite === "number");

    return (
        <>
            <Navbar />
            <main className="tracking">
                <h1>{isActive === "suivi" ? "Mon suivi" : "Mon historique"}</h1>

                <nav className="btnSuivi" aria-label="Navigation du suivi">
                    <div>
                        <button type="button" onClick={() => setIsActive("suivi")} className={`btn-fond ${isActive === "suivi" ? "active" : ""}`} aria-current={isActive === "suivi" ? "page" : undefined}>
                            Suivi
                        </button>
                    </div>
                    <div>
                        <button type="button" onClick={() => setIsActive("historique")} className={`btn-fond ${isActive === "historique" ? "active" : ""}`} aria-current={isActive === "historique" ? "page" : undefined}>
                            Historique
                        </button>
                    </div>
                </nav>

                {isActive === "suivi" && (
                    <section aria-labelledby="evolution-title">
                        <h2 id="evolution-title">Évolution de ma douleur</h2>
                        {loading ? (
                            <p role="status">Chargement des évaluations...</p>
                        ) : (
                            <PainChart evaluations={evaluations} />
                        )}
                    </section>
                )}

                {isActive === "historique" && (
                    <section aria-label="Liste de mes évaluations">
                        <History />
                    </section>
                )}
            </main>
        </>
    );
}
