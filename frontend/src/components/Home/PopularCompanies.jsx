import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { Link } from "react-router-dom";

const PopularCompanies = () => {
  // Styles object
  const styles = {
    popularCompanies: {
      padding: "80px 20px",
      backgroundColor: "#f8f9fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center"
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "60px",
      position: "relative",
      display: "inline-block"
    },
    headingAfter: {
      content: '""',
      position: "absolute",
      bottom: "-15px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100px",
      height: "4px",
      backgroundColor: "#3498db",
      borderRadius: "2px"
    },
    banner: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "30px",
      marginTop: "40px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center"
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      marginBottom: "20px"
    },
    icon: {
      fontSize: "3rem",
      color: "#3498db",
      marginBottom: "20px"
    },
    companyTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "10px"
    },
    companyLocation: {
      fontSize: "1rem",
      color: "#7f8c8d",
      lineHeight: "1.6",
      marginBottom: "15px"
    },
    button: {
      padding: "12px 25px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "auto"
    },
    buttonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)"
    }
  };

  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <section style={styles.popularCompanies} id="popular-companies">
      <div style={styles.container}>
        <h3 style={styles.heading}>
          TOP COMPANIES
          <span style={styles.headingAfter}></span>
        </h3>
        
        <div style={styles.banner}>
          {companies.map((element) => (
            <div 
              style={styles.card}
              key={element.id}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
            >
              <div style={styles.content}>
                <div style={styles.icon}>{element.icon}</div>
                <p style={styles.companyTitle}>{element.title}</p>
                <p style={styles.companyLocation}>{element.location}</p>
              </div>
              <Link 
                to="/job/getall" 
                style={styles.button}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.button)}
              >
                Open Positions {element.openPositions}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;