import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function EmployeeGrowthChart() {
  // Mock Data: employees added per month
  const data = [
    { month: "Jan", employees: 10 },
    { month: "Feb", employees: 15 },
    { month: "Mar", employees: 20 },
    { month: "Apr", employees: 25 },
    { month: "May", employees: 28 },
    { month: "Jun", employees: 35 },
    { month: "Jul", employees: 40 },
  ];

  return (
    <div style={{ width: "100%", height: 300, background: "#fff", padding: 10, borderRadius: 8, marginTop: 20 }}>
      <h3>Employee Growth Over Time</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="employees" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EmployeeGrowthChart;
