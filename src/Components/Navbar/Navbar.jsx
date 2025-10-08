import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import styles from "./Navbar.module.css";
import Logout from "../../Pages/Logout/Logout";
import { useAuth } from "../../Context/AuthContext.jsx";

function Navbar() {
  const { isLoggedIn } = useAuth();
  const role = localStorage.getItem("role");

  return (
    <nav className={styles.navbar}>
      {/* Left Logo */}
      <div className={styles.logo}>
        <FaHome className={styles.icon} />
        <span>EMS</span>
      </div>

      {/* Center Links */}
      <div className={styles.links}>
        {!isLoggedIn ? (
          <>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : styles.link)}>About</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Services</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Contact</NavLink>
          </>
        ) : (
          <>
            {role === "ADMIN" && (
              <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Admin Dashboard</NavLink>
            )}
            {role === "HR" && (
              <NavLink to="/hr/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.link)}>HR Dashboard</NavLink>
            )}
            {role === "EMPLOYEE" && (
              <NavLink to="/employee/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.link)}>Employee Dashboard</NavLink>
            )}
          </>
        )}
      </div>

      {/* Right Side Buttons */}
      <div className={styles.authButtons}>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className={styles.login}>Login</Link>
            <Link to="/register" className={styles.register}>Register</Link>
          </>
        ) : (
          <Logout />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
