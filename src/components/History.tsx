
import { useState, useEffect } from "react";
import type { HistoryEvaluation } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { getHistory } from "../services/historyService";
import { MapPin } from "lucide-react";
import db from "../data/db.json";

import "../styles/tracking.scss";

export function History() {
    const navigate = useNavigate();

    const [history, setHistory] = useState<HistoryEvaluation[]>([]);
    const [filtre, setFiltre] = useState("recent");
    const [loading, setLoading] = useState(true);

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
            const datePainB = new Date(b.date).getTime();

            if (filtre === "ancien") {
                return datePainA - datePainB;
            }

            return datePainB - datePainA;
        });

    useEffect(() => {
        let active = true;

        const getLocalHistory = (): HistoryEvaluation[] => {
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

                    if (active) {
                        setHistory(data);
                    }
                } else {
                    if (active) {
                        setHistory(getLocalHistory());
                    }
                }
            } catch (error) {
                console.error("Erreur historique :", error);

                if (active) {
                    setHistory(getLocalHistory());
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadHistory();

        return () => {
            active = false;
        };
    }, []);

    return (
        <>
            <h2>Mon historique</h2>

            <section className="filtreArt" aria-labelledby="history-filter-title">
                    <label htmlFor="history-filter">Trier ou filtrer les évaluations</label>
                <div className="historyFilters">

                    <select id="history-filter" value={filtre} onChange={(e) => setFiltre(e.target.value)}>
                        <option value="recent">Plus récentes</option>
                        <option value="ancien">Plus anciennes</option>
                        <option value="intense">Douleur intense</option>
                        <option value="moderee">Douleur modérée</option>
                        <option value="legere">Douleur légère</option>
                    </select>
                </div>
            </section>

            {loading ? (
                <p role="status">Chargement de l'historique...</p>
            ) : history.length === 0 ? 
            (
                <p>
                    Aucune évaluation actuellement.
                    <span> Commencez une évaluation pour pouvoir l'enregistrer.</span>
                </p>
            ) : historyFiltree.length === 0 ? (
                <p>Aucune évaluation ne correspond à ce filtre.</p>
            ) : (
                <div className="historyList">
                    {historyFiltree.map((item) => (
                    <article key={item.id} className="historyArticle">
                        <div className="historyContent">
                            <div className="blocHistory">
                                <p className="date">{new Date(item.date).toLocaleDateString("fr-FR",{ day: "numeric", month: "long", year: "numeric" })}              
                                </p>
                               <p className="paraHistory">
                                    {db.evaluation_douleur.echelle_intensite.niveaux.find(
                                        (niveau) => niveau.id === item.evaluation.intensiteNiveau
                                    )?.label ?? "Intensité non renseignée"}
                                </p>
                            </div>
                            <div className="zone">
                                    <MapPin className="map" aria-hidden="true" />
                                    <p>{item.evaluation.localisations.join(", ") || "Non renseignée"}</p>
                            </div>
                                {item.evaluation.intensiteValeur != null && (
                                    <p className="intensity">
                                        {item.evaluation.intensiteValeur}/10
                                    </p>
                                )}
                            </div>

                            <button type="button" className="btnEpisode" onClick={() => navigate(`/Historique/${item.id}`)}>
                                Voir l'épisode
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}
