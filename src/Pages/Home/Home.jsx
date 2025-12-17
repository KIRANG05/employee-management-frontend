import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>WorkPulse</h1>
          <p className={styles.subtitle}>
            Real-time visibility into attendance, tasks, and workforce activity.
          </p>
          <button className={styles.ctaButton} onClick={() => navigate("/login")}>Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.card}>
          <h2>👨‍💼 Manage Employees</h2>
          <p>Manage employee profiles, roles, and organizational structure.</p>
        </div>
        <div className={styles.card}>
          <h2>🔐 Role-Based Access</h2>
          <p>Secure authentication with Admin, HR, and Employee permissions.</p>
        </div>
        <div className={styles.card}>
          <h2>📊 Operational Insights</h2>
          <p>Track attendance, tasks, and leave status through dashboards.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;



