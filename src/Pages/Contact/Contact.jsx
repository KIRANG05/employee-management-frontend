import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>

      <p className={styles.subtitle}>
        Have questions or need support? Our team is here to help.
      </p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>📧 Email Support</h3>
          <p>kiran.dev@workpulse.com</p>
        </div>

        <div className={styles.card}>
          <h3>📞 Phone</h3>
          <p>+91 900000000</p>
        </div>

        <div className={styles.card}>
          <h3>🌐 Office Hours</h3>
          <p>Monday – Friday<br />9:00 AM – 6:00 PM</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
