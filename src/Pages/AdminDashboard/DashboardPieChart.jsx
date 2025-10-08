import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styles from "./AdminDashboard.module.css";

const data = [
  { name: "Low (<30k)", value: 5 },
  { name: "Medium (30k-60k)", value: 15 },
  { name: "High (>60k)", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

function SalaryPieChart() {
  return (
    <div className={styles.pieChart}>
      <h3>Salary Distribution</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default SalaryPieChart;

