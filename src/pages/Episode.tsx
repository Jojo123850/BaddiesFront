import { useParams } from "react-router-dom";
import type { HistoryEvaluation } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
export default function Episode() {
    const { id } = useParams();
    const navigate = useNavigate();

    const historiqueStock = localStorage.getItem("historique");

    const historique: HistoryEvaluation[] = historiqueStock
        ? JSON.parse(historiqueStock)
        : [];

    const episode = historique.find((item) => item.id === id);

    if (!episode) {
        return <p>Épisode introuvable.</p>;
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

    navigate("/Historique");
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
            <button onClick={handleDelete} className="btn">
                        Supprimer cet épisode
            </button>
        </>
    );
}