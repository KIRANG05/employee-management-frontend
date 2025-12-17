import styles from "./About.module.css";

function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>About WorkPulse</h1>

      <p className={styles.subtitle}>
        WorkPulse is a modern workforce platform designed to streamline employee
        operations, role management, and organizational insights.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>🎯 Our Mission</h3>
          <p>
            To simplify workforce management by providing secure, scalable, and
            data-driven solutions for modern organizations.
          </p>
        </div>

        <div className={styles.card}>
          <h3>⚙️ What We Do</h3>
          <p>
            WorkPulse enables organizations to manage employees, roles, attendance,
            tasks, and approvals through a centralized dashboard.
          </p>
        </div>

        <div className={styles.card}>
          <h3>🔐 Security First</h3>
          <p>
            Built with role-based access control and secure authentication to ensure
            data integrity and privacy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

