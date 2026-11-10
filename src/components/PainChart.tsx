import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,
} from "recharts";

import "../styles/components/painChart.scss";

// Les données nécessaires pour afficher un point du graphique.
type ChartEvaluation = {
  date: string;
  intensite: number;
  // Ce champ facultatif indique si la valeur vient du questionnaire.
  questionnaire?: boolean;
};

// Le composant reçoit une liste d’évaluations.
type PainChartProps = {
  evaluations: ChartEvaluation[];
};


export function PainChart({ evaluations }: PainChartProps) {
  // Sans évaluation, je montre un message à la place du graphique.
  if (evaluations.length === 0) {
    return (
      <p>
        Aucune évaluation disponible pour afficher ton évolution.
      </p>
    );
  }

  return (
    <div className="Pain-chart">
 
      <ResponsiveContainer width="100%" height="100%">
  
        <LineChart data={evaluations} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
       
          <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
         
          <XAxis dataKey="date" />
          {/* L’axe vertical va de 0 à 10, avec des graduations entières. */}
          <YAxis domain={[0, 10]} allowDecimals={false} width={28} />

          {/* Cette bulle affiche les informations du point survolé.value: valeur du point,item.payload:a les données de l'évaluation survolée et ? évite une erreur si payload absent*/}
          <Tooltip formatter={(value, _name, item) => { if (item.payload?.questionnaire) { const niveau = value === 2 ?"Légère" : value === 5 ? "Modérée" : "Intense"; return [`Douleur ${niveau}`]; }  /* Pour l’autre mode, je montre la note sur 10 et le nom Intensité. */ return [` ${value}/10`, "Intensité"]; }} />
          
          {/* r est le rayon : 5 pour les points, 7 pour le point survolé. */}
          <Line type="monotone"dataKey="intensite" stroke="#741D2D" strokeWidth={3} dot={{ r: 5, fill: "#741D2D" }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

