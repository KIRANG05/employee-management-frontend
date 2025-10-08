import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Employee Management System</h1>
          <p className={styles.subtitle}>
            Streamline employee records, roles, and authentication seamlessly.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.card}>
          <h2>👨‍💼 Manage Employees</h2>
          <p>Easily add, update, and track employee information.</p>
        </div>
        <div className={styles.card}>
          <h2>🔐 Secure Access</h2>
          <p>Role-based authentication ensures data protection.</p>
        </div>
        <div className={styles.card}>
          <h2>📊 Dashboard</h2>
          <p>View employee statistics and insights in one place.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;



