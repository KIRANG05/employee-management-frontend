import React, {useState} from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./AdminDashboard.module.css";


function AdminDashboard() {

  const [activePage, setActivePage] = useState("dashboard");
  return (
    <div className={styles.container}>
      {/* Sidebar */}
       <Sidebar />

      {/* Main Content */}
      <div className={styles.main}>
        <div className={styles.content}>
         
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

