import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../AdminDashboard/AdminDashboard.module.css"; // 🔥 reuse same CSS

function HrSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // submenu handling for Settings
  const isSettingsRoute = location.pathname.startsWith("/hr-dashboard/settings");
  const [showSettings, setShowSettings] = useState(isSettingsRoute);

  const isLeaveRoute = location.pathname.startsWith("/hr-dashboard/leaves");
  const [showLeaves, setShowLeaves] = useState(isLeaveRoute);

  const isTaskRoute = location.pathname.startsWith("/hr-dashboard/tasks");
  const [showTasks, setShowTasks] = useState(isTaskRoute);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>HR Portal</h2>
      <ul>
        <li
          className={isActive("/hr-dashboard") ? styles.active : ""}
          onClick={() => navigate("/hr-dashboard")}
        >
          🏠 Dashboard
        </li>

        <li
          className={isActive("/hr-dashboard/reportees") ? styles.active : ""}
          onClick={() => navigate("/hr-dashboard/reportees")}
        >
          👨‍💼 Reportees
        </li>

       {/* 📅 Leave MAIN MODULE */}
<li
  onClick={() => setShowLeaves(!showLeaves)}
  className={styles.settingsMenu}
>
  <span>📅 Leave</span>
  <span>{showLeaves ? "▲" : "▼"}</span>
</li>

{/* 🔽 Leave submenu */}
{showLeaves && (
  <ul className={styles.submenu}>
    <li
      className={isActive("/hr-dashboard/leaves/apply") ? styles.active : ""}
      onClick={() => navigate("/hr-dashboard/leaves/apply")}
    >
      📝 Apply Leave
    </li>
    <li
      className={isActive("/hr-dashboard/leaves/requests") ? styles.active : ""}
      onClick={() => navigate("/hr-dashboard/leaves/requests")}
    >
      📩 Leave Requests
    </li>
    <li
      className={isActive("/hr-dashboard/leaves/summary") ? styles.active : ""}
      onClick={() => navigate("/hr-dashboard/leaves/summary")}
    >
      📊 Leave Summary
    </li>
  </ul>
)}


  
        {/* Task module */}
        <li onClick={() => setShowTasks(!showTasks)} className={styles.settingsMenu}>
          <span>📝 Tasks</span>
          <span>{showTasks ? "▲" : "▼"}</span>
        </li>
        {showTasks && (
          <ul className={styles.submenu}>
            <li
              className={isActive("/hr-dashboard/tasks/add") ? styles.active : ""}
              onClick={() => navigate("/hr-dashboard/tasks/add")}
            >
              ➕ Add Task
            </li>
            <li
              className={isActive("/hr-dashboard/tasks/details") ? styles.active : ""}
              onClick={() => navigate("/hr-dashboard/tasks/details")}
            >
              📋 Task Details
            </li>
          </ul>
        )}

        <li
          className={isActive("/hr-dashboard/attendance") ? styles.active : ""}
          onClick={() => navigate("/hr-dashboard/attendance")}
        >
          📋 Attendance
        </li>

        {/* ⚙️ Settings main item */}
        <li
          onClick={() => setShowSettings(!showSettings)}
          className={styles.settingsMenu}
        >
          <span>⚙️ Settings</span>
          <span>{showSettings ? "▲" : "▼"}</span>
        </li>

        {/* 🔽 Settings submenu */}
        {showSettings && (
          <ul className={styles.submenu}>
            <li
              className={isActive("/hr-dashboard/settings/profile") ? styles.active : ""}
              onClick={() => navigate("/hr-dashboard/settings/profile")}
            >
              🧍 Profile
            </li>
            <li
              className={isActive("/hr-dashboard/settings/change-password") ? styles.active : ""}
              onClick={() => navigate("/hr-dashboard/settings/change-password")}
            >
              🔒 Change Password
            </li>
          </ul>
        )}

        <li
          className={isActive("/hr-dashboard/notification") ? styles.active : ""}
          onClick={() => navigate("/hr-dashboard/notification")}
        >
          🔔 Notifications
        </li>
      </ul>
    </div>
  );
}

export default HrSidebar;
