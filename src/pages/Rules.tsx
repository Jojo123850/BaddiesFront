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
            <h2>Analyse en cours</h2>
            <div className="loader"></div>
        </>
    );
}

