import React from "react";
import styles from "./AdminDashboard.module.css";
import DashboardPieChart from "./DashboardPieChart";
import EmployeePieChart from "../Charts/EmployeePieChart";
import SalaryBarChart from "../Charts/SalaryBarChart";
import EmployeeGrowthChart from "../Charts/EmployeeGrowthChart";

function DashboardHome() {

    const employees = [
    { name: "John", salary: 25000, company: "Google" },
    { name: "Anna", salary: 45000, company: "Amazon" },
    { name: "Mike", salary: 60000, company: "Microsoft" },
    { name: "Sara", salary: 15000, company: "Google" },
  ];
  return (
    <div className={styles.dashboardHome}>
      <h2>Dashboard Overview</h2>
      <div className={styles.cards}>
        <div className={styles.card}>Total Employees: 25</div>
        <div className={styles.card}>HR Users: 3</div>
        <div className={styles.card}>Active Tasks: 12</div>
        <div className={styles.card}>Pending Approvals: 5</div>
      </div>
       <div className={styles.chartsRow}>
  <div className={styles.chartBox}>
    <EmployeePieChart employees={employees} />
  </div>
  <div className={styles.chartBox}>
    <SalaryBarChart employees={employees} />
  </div>
</div>

      {/* growth line chart */}
      <EmployeeGrowthChart />
    </div>
  );
}

export default DashboardHome;
    