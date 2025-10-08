import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function EmployeePieChart({ employees }) {
  // Group employees by company
  const data = employees.reduce((acc, emp) => {
    const company = emp.company;
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(data).map((company) => ({
    name: company,
    value: data[company],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ width: "45%", height: 300, background: "#fff", padding: 10, borderRadius: 8 }}>
      <h3>Employees by Company</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmployeePieChart;
