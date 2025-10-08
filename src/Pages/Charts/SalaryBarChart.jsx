import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function SalaryBarChart({ employees }) {
  // Salary Buckets
  const buckets = [
    { name: "<20k", range: [0, 20000] },
    { name: "20k-40k", range: [20001, 40000] },
    { name: "40k-60k", range: [40001, 60000] },
    { name: "60k+", range: [60001, Infinity] },
  ];

  const chartData = buckets.map((bucket) => ({
    name: bucket.name,
    count: employees.filter((e) => e.salary >= bucket.range[0] && e.salary <= bucket.range[1]).length,
  }));

  return (
    <div style={{ width: "45%", height: 300, background: "#fff", padding: 10, borderRadius: 8 }}>
      <h3>Salary Distribution</h3>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalaryBarChart;
