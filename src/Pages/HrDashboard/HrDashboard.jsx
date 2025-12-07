import React from "react";
import { Outlet } from "react-router-dom";
import HrSidebar from "../../Pages/HrDashboard/HrSidebar";
import styles from "../AdminDashboard/AdminDashboard.module.css"; // reuse CSS

function HrDashboard() {
  return (
    <div className={styles.container}>
      <HrSidebar />
      <div className={styles.main}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
