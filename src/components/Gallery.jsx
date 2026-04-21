import React from "react";

function Categories() {
  const categories = [
    {
      title: "Adventure",
      icon: "🏞️",
      desc: "For thrill seekers and nature lovers ready to explore beyond the ordinary.",
      bg: "/images/adv.jpg",
    },
    {
      title: "Heritage Tours",
      icon: "🏰",
      desc: "Dive into culture, history, and architecture of timeless places.",
      bg: "/images/her.jpg",
    },
    {
      title: "Family Trips",
      icon: "👨‍👩‍👧‍👦",
      desc: "Fun-filled itineraries and activities for the whole family.",
      bg: "/images/fam.jpg",
    },
    {
      title: "Weekend Getaways",
      icon: "✈️",
      desc: "Quick escapes to refresh your mind and soul.",
      bg: "/images/wk.jpg",
    },
  ];

  return (
    <section style={styles.section} id="categories">
      <h2 style={styles.title}>🌍 Travel Experiences</h2>

      <p style={styles.subtitle}>
        Choose your journey style — adventure, culture, relaxation, or quick escapes.
      </p>

      <div style={styles.grid}>
        {categories.map((cat) => (
          <div
            key={cat.title}
            style={{
              ...styles.card,
              backgroundImage: `url(${cat.bg})`,
            }}
          >
            {/* DARK OVERLAY */}
            <div style={styles.overlay}></div>

            {/* CONTENT */}
            <div style={styles.content}>
              <div style={styles.icon}>{cat.icon}</div>
              <h3 style={styles.heading}>{cat.title}</h3>
              <p style={styles.text}>{cat.desc}</p>

             
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;

const styles = {
  section: {
    padding: "90px 20px",
    background: "linear-gradient(180deg, #000, #000000)",
    textAlign: "center",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },

  title: {
    fontSize: "2.8rem",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    color: "rgba(255,255,255,0.6)",
    marginBottom: "50px",
    fontSize: "1rem",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px",
    maxWidth: "1100px",
    margin: "auto",
  },

  card: {
    position: "relative",
    height: "320px",
    borderRadius: "40px",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    transition: "0.4s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0, 0, 0, 0.2))",
  },

  content: {
    position: "relative",
    zIndex: 2,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%",
    textAlign: "left",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "2px",
    filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.7))",
  },

  heading: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "2px",
  },

  text: {
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.75)",
    marginBottom: "50px",
    lineHeight: "1.4",
  },

 

};