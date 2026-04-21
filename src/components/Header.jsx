import React, { useState } from "react";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const destinations = [
    { name: "AFRICA", icon: "🌍" },
    { name: "AMERICA", icon: "🌎" },
    { name: "ASIA", icon: "🏯" },
    { name: "CARIBBEAN", icon: "🏝️" },
    { name: "EUROPE", icon: "🏰" },
    { name: "MIDDLE EAST", icon: "🕌" },
    { name: "OCEANIA", icon: "🌊" },
  ];

  const categories = [
    { name: "ADVENTURE", icon: "🏔️" },
    { name: "HERITAGE TOURS", icon: "🏛️" },
    { name: "FAMILY TRIPS", icon: "👨‍👩‍👧‍👦" },
    { name: "WEEKEND GETAWAYS", icon: "🚗" },
    { name: "BEACHES", icon: "🏖️" },
    { name: "HIKES", icon: "🥾" },
    { name: "WATERFALLS", icon: "💧" },
    { name: "WILDLIFE", icon: "🦁" },
  ];

  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>🏝️ HolidayHeaven</h2>

      <nav style={styles.nav}>
        <a href="#home" style={styles.link}>HOME</a>

        {/* DESTINATIONS */}
        <div
          style={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("dest")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span style={styles.link}>DESTINATIONS ▾</span>

          {openDropdown === "dest" && (
            <div style={styles.dropdownMenu}>
              {destinations.map((item) => (
                <a key={item.name} href="#" style={styles.dropdownItem}>
                  <span style={styles.icon}>{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORIES */}
        <div
          style={styles.dropdown}
          onMouseEnter={() => setOpenDropdown("cat")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <span style={styles.link}>CATEGORIES ▾</span>

          {openDropdown === "cat" && (
            <div style={styles.dropdownMenu}>
              {categories.map((item) => (
                <a key={item.name} href="#" style={styles.dropdownItem}>
                  <span style={styles.icon}>{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="#gallery" style={styles.link}>GALLERY</a>
        <a href="#contact" style={styles.link}>CONTACT</a>
      </nav>
    </header>
  );
}

export default Header;

const styles = {
  header: {
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    color: "#fff",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    fontSize: "1.7rem",
    fontWeight: "700",
    letterSpacing: "1px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.95rem",
    transition: "0.3s",
  },

  dropdown: {
    position: "relative",
  },

  dropdownMenu: {
    position: "absolute",
    top: "40px",
    left: 0,
    background: "rgba(0,0,0,0.95)",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    minWidth: "220px",
  },

  dropdownItem: {
    padding: "12px 15px",
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.9rem",
    transition: "0.3s",
  },

  icon: {
    fontSize: "1.1rem",
  },
};