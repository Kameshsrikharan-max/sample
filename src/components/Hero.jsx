import React from "react";

function Hero() {
  return (
    <section style={styles.hero} id="home">
      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.heading}>
          Find Peace, Adventure & Unforgettable Memories 
        </h1>

        <p style={styles.text}>
          Discover breathtaking destinations, hidden gems, and curated travel
          experiences made just for you.
        </p>

        <div style={styles.buttonGroup}>
          <button style={styles.buttonPrimary}>
            ✈️ BEGIN YOUR JOURNEY
          </button>

          <button style={styles.buttonSecondary}>
            🌄 EXPLORE DESTINATIONS
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

const styles = {
  hero: {
    height: "95vh",
    width: "206vh",
    position: "relative",
    backgroundImage:
      "url('/images/hhi2.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    padding: "20px",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background:
      "linear-gradient(120deg, rgba(0,0,0,0.75), rgba(0,0,0,0.4))",
  },

  content: {
    position: "relative",
    maxWidth: "800px",
    zIndex: 2,
    animation: "fadeIn 1s ease-in-out",
  },

  heading: {
    fontSize: "3.2rem",
    fontWeight: "800",
    marginBottom: "15px",
    lineHeight: "1.2",
    background: "linear-gradient(90deg, #fff, #ffd580)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  text: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#f1f1f1",
  },

  buttonGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  buttonPrimary: {
    padding: "12px 25px",
    background: "linear-gradient(135deg, #ff9800, #ff5722)",
    border: "none",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(255, 152, 0, 0.3)",
    transition: "0.3s",
  },

  buttonSecondary: {
    padding: "12px 25px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "30px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#fff",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
  },
};