import { useNavigate } from "react-router-dom";
import { useEvaluation } from "../evaluation/useEvaluation";
import { useEffect } from "react";
import db from "../data/db.json";

// règle de sécurité db
export default function RulesAlert(){
    const { evaluation } = useEvaluation();
    const navigate = useNavigate();
    const regles = db.regles_securite;
// analyse => naviguer
    useEffect(() => {
        const douleurIntense =
            evaluation.intensiteNiveau === "intense";

        const douleurInhabituelle =
            evaluation.option === "a_change" ||
            evaluation.option === "nouvelle_ou_bien_plus_forte";

        const symptomePreoccupant = regles.some((regle) =>
            regle.declencheur.symptomes_un_de?.some((symptome) =>
                evaluation.symptomes.includes(symptome)
            )
        );

        const situationNonBaddies =
            (douleurInhabituelle && douleurIntense) ||
            symptomePreoccupant;

        if (situationNonBaddies) {
            navigate("/Alerte");
        } else {
            navigate("/Solution");
        }

    // Si une de ces valeurs change, React peut réexécuter cet effet, et l'analyse est refait
    }, [evaluation, navigate, regles]);

    return (
        <>
                <main className="loading1" role="status" aria-label="Connexion en cours">
    <div className="container">
        <div className="content">
            <div className="heart-rate">
                <svg viewBox="0 0 150 73" height="73" width="150" aria-hidden="true">
                    <polyline
                        points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                        fill="none"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                    />
                </svg>

                <div className="fade-in"></div>
                <div className="fade-out"></div>
            </div>
        </div>
        <p className="loading-text" aria-hidden="true">Analyse en cours...</p>
    </div>
</main>
      <div className="loader"></div>
        </>
    );
}

