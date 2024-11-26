import React from "react";
import Background from "../HomePage/HomePage_backGorund.png"; // Ensure the correct image path

function HomePage() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
    },
    heading: {
      fontSize: "3rem",
      marginBottom: "20px",
    },
    paragraph: {
      fontSize: "1.2rem",
      maxWidth: "600px",
      textAlign: "center",
      lineHeight: "1.6",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      textShadow: "none",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Hello, Admin!</h1>
      <p style={styles.paragraph}>
        Welcome to your dashboard. Here, you can manage your content, analyze
        your data, and oversee everything with ease. Let’s make today
        productive!
      </p>
      <button
        style={styles.button}
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = styles.button.backgroundColor)
        }
      >
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
