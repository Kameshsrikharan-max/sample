import React from "react";

function Destinations() {
  const places = [
    { name: "Maldives", img: "/images/mal.jpg", tag: "BEACH" },
    { name: "Switzerland", img: "/images/swis1.jpg", tag: "MOUNTAINS" },
    { name: "Japan", img: "/images/jap.jpg", tag: "CULTURE" },
    { name: "Brazil", img: "/images/brzil.jpg", tag: "ADVENTURE" },
    { name: "Morocco", img: "/images/moro.jpg", tag: "DESERT" },
    { name: "Iceland", img: "/images/ice.jpg", tag: "NATURE" },
    { name: "Thailand", img: "/images/thai.png", tag: "ISLANDS" },
    { name: "UK", img: "/images/uk.jpg", tag: "CITY" },
  ];

  return (
    <section style={styles.section} id="destination">
      <h2 style={styles.title}>🌍 Explore Destinations</h2>

      <p style={styles.subtitle}>
        Discover breathtaking places around the world — beaches, mountains,
        culture, and unforgettable adventures await you.
      </p>

      <div style={styles.grid}>
        {places.map((place) => (
          <div key={place.name} style={styles.card}>
            
            {/* IMAGE */}
            <div style={styles.imageWrapper}>
              <img src={place.img} alt={place.name} style={styles.image} />

              {/* TAG */}
              <span style={styles.tag}>{place.tag}</span>

              {/* DARK OVERLAY */}
              <div style={styles.overlay}></div>
            </div>

            {/* CONTENT */}
            <div style={styles.cardBody}>
              <h3 style={styles.placeName}>{place.name}</h3>
              <p style={styles.desc}>Explore the beauty of {place.name}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;

const styles = {
  section: {
    padding: "80px 20px",
    background: "linear-gradient(180deg, #000000, #000000)",
    textAlign: "center",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },

  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "10px",
    letterSpacing: "1px",
  },

  subtitle: {
    maxWidth: "750px",
    margin: "0 auto 50px auto",
    color: "rgba(255,255,255,0.7)",
    fontSize: "1rem",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "28px",
  },

  card: {
    borderRadius: "18px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "0.4s ease",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  },

  imageWrapper: {
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
  },

  tag: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(255,215,0,0.9)",
    color: "#000",
    fontSize: "0.75rem",
    fontWeight: "700",
    padding: "5px 10px",
    borderRadius: "20px",
    letterSpacing: "1px",
  },

  cardBody: {
    padding: "15px",
    textAlign: "left",
  },

  placeName: {
    fontSize: "1.3rem",
    fontWeight: "600",
    marginBottom: "5px",
  },

  desc: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.6)",
  },
};