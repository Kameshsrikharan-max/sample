import React from "react";

function Gallery() {
  return (
    <section style={styles.section} id="gallery">
      <h2 style={styles.title}>📸 Travel Gallery</h2>

      <div className="gallery-grid">
        {/* ITEM 1 */}
        <div className="gallery-item tall">
          <img src="/images/sb.jpg" alt="Serene Beach" />
          <div className="overlay"><p>Serene Beach</p></div>
        </div>

        {/* ITEM 2 */}
        <div className="gallery-item">
          <img src="/images/mt.jpg" alt="Mountain Adventure" />
          <div className="overlay"><p>Mountain Adventure</p></div>
        </div>

        {/* ITEM 3 */}
        <div className="gallery-item wide">
          <img src="/images/tj.jpg" alt="Cultural Heritage" />
          <div className="overlay"><p>Cultural Heritage</p></div>
        </div>

        {/* ITEM 4 */}
        <div className="gallery-item tall offset">
          <img src="/images/fm.jpg" alt="Family Memories" />
          <div className="overlay"><p>Family Memories</p></div>
        </div>

        {/* ITEM 5 */}
        <div className="gallery-item">
          <img src="/images/oo.jpg" alt="Weekend Escapes" />
          <div className="overlay"><p>Weekend Escapes</p></div>
        </div>

        {/* ITEM 6 */}
        <div className="gallery-item wide offset">
          <img src="/images/ed.jpg" alt="Exotic Destinations" />
          <div className="overlay"><p>Exotic Destinations</p></div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          grid-auto-rows: 200px;
          gap: 20px;
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          background: #000;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease, filter 0.5s ease;
        }

        .gallery-item .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
          color: #fff;
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          text-align: center;
          padding: 10px;
          transition: opacity 0.4s ease, transform 0.4s ease;
          transform: translateY(20px);
        }

        .gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }

        .gallery-item:hover img {
          transform: scale(1.1);
          filter: blur(2px);
        }

        .gallery-item:hover .overlay {
          opacity: 1;
          transform: translateY(0);
        }

        /* Sizes */
        .gallery-item.tall {
          grid-row-end: span 2;
        }

        .gallery-item.wide {
          grid-column-end: span 2;
        }

        .gallery-item.offset {
          transform: translateY(20px);
        }

        .gallery-item.offset:hover {
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .gallery-item.wide,
          .gallery-item.tall {
            grid-column: auto;
            grid-row: auto;
          }

          .gallery-item.offset {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Gallery;

const styles = {
  section: {
    padding: "80px 20px",
    background: "#000",
    textAlign: "center",
    color: "#fff",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    fontWeight: "700",
  },
};