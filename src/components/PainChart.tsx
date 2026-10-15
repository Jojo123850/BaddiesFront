import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../styles/painChart.scss";

type ChartEvaluation = {
  date: string;
  intensite: number;
};

type PainChartProps = {
  evaluations: ChartEvaluation[];
};

export function PainChart({ evaluations }: PainChartProps) {
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
        <LineChart
          data={evaluations}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="chart-grid"
          />

          <XAxis dataKey="date" />

          <YAxis
            domain={[0, 10]}
            allowDecimals={false}
            width={28}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="intensite"
            stroke="#741D2D"
            strokeWidth={3}
            dot={{ r: 5, fill: "#741D2D" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}