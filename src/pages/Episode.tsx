import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { HistoryEvaluation } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { getHistoryById } from "../services/historyService";
import { Link } from "react-router-dom";


export default function Episode() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState<HistoryEvaluation | null> (null);
    

useEffect(() => {
    const loadEpisode = async () => {
        try {
            if (!id) {
                return;
            }

            const token = localStorage.getItem("token");

            if (token) {
                const data = await getHistoryById(id);
                setEpisode(data);
            } else {
                const historiqueStock = localStorage.getItem("historique");

                if (!historiqueStock) {
                    return;
                }

                const historique: HistoryEvaluation[] = JSON.parse(historiqueStock);

                const episodeLocal = historique.find(
                    (item) => item.id === id
                );

                if (episodeLocal) {
                    setEpisode(episodeLocal);
                }
            }

        } catch (error) {
            console.error("Erreur épisode :", error);
        }
    };

    loadEpisode();
}, [id]);
    if(!episode){
        return <p>Chargement...</p>
    }
    
const handleDelete = () => {
    const historiqueStock = localStorage.getItem("historique");

    if (!historiqueStock) return;

    const historique: HistoryEvaluation[] = JSON.parse(historiqueStock);

    const nouvelHistorique = historique.filter(
        (item) => item.id !== id
    );

    localStorage.setItem(
        "historique",
        JSON.stringify(nouvelHistorique)
    );

    navigate("/Suivi?tab=historique");
};

    return (
        <>
            <h2>Mon épisode</h2>

            <p>
                Date :{" "}
                {new Date(episode.date).toLocaleDateString("fr-FR")}
            </p>

            <p>
                Douleur : {episode.evaluation.intensiteValeur}/10
            </p>

            <p>
                Intensité : {episode.evaluation.intensiteNiveau}
            </p>

            <p>
                Localisation :{" "}
                {episode.evaluation.localisations.join(", ")}
            </p>

            <p>
                Contexte : {episode.evaluation.contextes}
            </p>

            <p>
                Symptômes :{" "}
                {episode.evaluation.symptomes.join(", ")}
            </p>

            <p>
                Caractéristique : {episode.evaluation.option}
            </p>
            <h3>Geste conseillé</h3>
            {episode.solutions.map((solution) => (
                <article key={solution.id}>
                    <h4>{solution.label}</h4>
                    <p>{solution.description}</p>
                </article>
            ))}
            <button onClick={handleDelete} className="btn">
                        Supprimer cet épisode
            </button>
            <Link to="/Home">Retour à l'accueil</Link>
        </>
    );
}