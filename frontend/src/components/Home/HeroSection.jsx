import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  // Styles object
  const styles = {
    heroSection: {
      backgroundColor: "#f8f9fa",
      padding: "80px 20px 120px",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: { base: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      gap: "40px"
    },
    title: {
      flex: 1,
      maxWidth: "600px"
    },
    heading: {
      fontSize: { base: "2.5rem", md: "3.5rem" },
      fontWeight: "700",
      lineHeight: "1.2",
      color: "#2c3e50",
      marginBottom: "20px"
    },
    paragraph: {
      fontSize: "1.1rem",
      color: "#7f8c8d",
      lineHeight: "1.6",
      marginBottom: "30px",
      maxWidth: "500px"
    },
    image: {
      flex: 1,
      maxWidth: "600px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
    },
    img: {
      width: "100%",
      height: "auto",
      display: "block",
      transition: "transform 0.5s ease"
    },
    details: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "30px",
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      top: "60px",
      padding: "0 20px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "30px",
      display: "flex",
      alignItems: "center",
      gap: "20px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      minWidth: "250px",
      flex: "1 1 200px"
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
    },
    icon: {
      fontSize: "2.5rem",
      color: "#3498db",
      backgroundColor: "#e8f4fc",
      padding: "20px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    content: {
      display: "flex",
      flexDirection: "column"
    },
    statsTitle: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "5px"
    },
    statsSubtitle: {
      fontSize: "1rem",
      color: "#7f8c8d",
      fontWeight: "500"
    }
  };

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Jobs",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <section style={styles.heroSection}>
      <div style={styles.container}>
        <div style={styles.title}>
          <h1 style={styles.heading}>Find a job that suits</h1>
          <h1 style={styles.heading}>your interests and skills</h1>
          <p style={styles.paragraph}>
            Discover job opportunities that match your skills and passions.
            Connect with employers seeking talent like yours for rewarding
            careers.
          </p>
        </div>
        <div style={styles.image}>
          <img 
            src="/heroS.jpg" 
            alt="Happy professionals" 
            style={styles.img}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>
      </div>
      <div style={styles.details}>
        {details.map((element) => (
          <div 
            key={element.id}
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
          >
            <div style={styles.icon}>{element.icon}</div>
            <div style={styles.content}>
              <p style={styles.statsTitle}>{element.title}</p>
              <p style={styles.statsSubtitle}>{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;