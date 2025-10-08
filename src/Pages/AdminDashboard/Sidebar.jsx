import React from "react";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {

  const navigate = useNavigate();
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Portal</h2>
      <ul>
        <li onClick={() => navigate("/admin-dashboard") }>🏠 Dashboard</li>
        <li onClick={() => navigate("/admin-dashboard/employees")}>👨‍💼 Employees</li>
        <li onClick={() => navigate("/admin-dashboard/tasks")}>📝 Tasks</li>
        <li onClick={() => navigate("/admin-dashboard/reports")}>📊 Reports</li>
        <li onClick={() => navigate("/admin-dashboard/settings")}>⚙️ Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
