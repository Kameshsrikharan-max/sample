import React from "react";

function Contact() {
  return (
    <section style={styles.section} id="contact">

      <div style={styles.overlayBox}>

        <h2 style={styles.title}>Contact Us</h2>

        <p style={styles.text}>
          Stay connected with us! Whether you’re planning your next adventure
          or sharing experiences, we’re always here to help you explore the world.
        </p>

        <button style={styles.button}>
          Send Message →
        </button>

      </div>

    </section>
  );
}

export default Contact;

const styles = {
  section: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundImage: "url('/images/pic.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  },

  /* DARK OVERLAY ON IMAGE */
  sectionBefore: {
    content: "",
  },

  overlayBox: {
    background: "rgba(0,0,0,0.55)",
    backdropFilter: "blur(1px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "40px 30px",
    borderRadius: "20px",
    maxWidth: "600px",
    color: "#fff",
    boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "15px",
    letterSpacing: "1px",
  },

  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "25px",
  },

  button: {
    padding: "12px 28px",
    border: "none",
    borderRadius: "30px",
    background: "linear-gradient(90deg, #ffcc00, #ff9900)",
    color: "#000",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },
};