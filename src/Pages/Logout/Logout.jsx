import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../Services/api";
import { useAuth } from "../../Context/AuthContext.jsx";
import styles from "./Logout.module.css";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    // ✅ Show confirmation first
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to logout?",  
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          await api.post("/auth/logout", { refreshToken });
        }

        logout(); // update context state

        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully!",
        }).then(() => navigate("/login"));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: error.response?.data?.message || "Something went wrong!",
        });
      }
    }
  };

  return (
    <button onClick={handleLogout} className={styles.logout}>
      Logout
    </button>
  );
}

export default Logout;
