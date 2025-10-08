import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <span>Welcome, Admin</span>
      <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
    </div>
  );
}

export default Navbar;
