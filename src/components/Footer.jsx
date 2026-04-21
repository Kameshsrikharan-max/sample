import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer style={styles.footer}>

      <div style={styles.glow} />

      <div style={styles.container}>

        {/* LOGO */}
        <h2 style={styles.logo}>🌍 HolidayHeaven</h2>

        <p style={styles.text}>
          Explore the world with us. Adventure, peace, and unforgettable memories
          await every journey you take.
        </p>

        {/* SOCIAL ICONS */}
        <div style={styles.socials}>

          <a href="#" style={styles.icon}>
            <FaFacebookF />
          </a>

          <a href="#" style={styles.icon}>
            <FaInstagram />
          </a>

          <a href="#" style={styles.icon}>
            <FaTwitter />
          </a>

          <a href="#" style={styles.icon}>
            <FaYoutube />
          </a>

        </div>

        <div style={styles.line} />

        <p style={styles.copy}>
          © {new Date().getFullYear()} HolidayHeaven • All Rights Reserved
        </p>

      </div>
    </footer>
  );
}

export default Footer;

const styles = {
  footer: {
    position: "relative",
    background: "linear-gradient(135deg, #000, #0a0a0a)",
    color: "#fff",
    padding: "60px 20px",
    textAlign: "center",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    top: "-120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(255,165,0,0.25), transparent 70%)",
    filter: "blur(70px)",
  },

  container: {
    position: "relative",
    maxWidth: "800px",
    margin: "auto",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },

  logo: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "10px",
  },

  text: {
    fontSize: "0.95rem",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "25px",
    lineHeight: "1.6",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "20px",
  },

  icon: {
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    color: "#fff",
    fontSize: "18px",
    textDecoration: "none",
    transition: "0.3s",
    cursor: "pointer",
  },

  line: {
    height: "1px",
    width: "80%",
    margin: "20px auto",
    background: "rgba(255,255,255,0.1)",
  },

  copy: {
    fontSize: "0.85rem",
    opacity: 0.7,
  },
};