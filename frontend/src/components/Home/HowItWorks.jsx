import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  // Styles object
  const styles = {
    howItWorks: {
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
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "30px",
      marginTop: "40px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "40px 30px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit"
    },
    cardHover: {
      transform: "translateY(-10px)",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
    },
    icon: {
      fontSize: "3rem",
      color: "#3498db",
      marginBottom: "20px"
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "15px"
    },
    cardDescription: {
      fontSize: "1rem",
      color: "#7f8c8d",
      lineHeight: "1.6"
    }
  };

  return (
    <section style={styles.howItWorks} id="how-it-works">
      <div style={styles.container}>
        <h3 style={styles.heading}>
          How Career Connect Works!
          <span style={styles.headingAfter}></span>
        </h3>
        
        <div style={styles.banner}>
          <Link 
           
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
          >
            <div style={styles.icon}>
              <FaUserPlus />
            </div>
            <p style={styles.cardTitle}>Create Account</p>
            <p style={styles.cardDescription}>
              Sign up in seconds to unlock access to thousands of job opportunities or talented candidates.
            </p>
          </Link>
          
          <Link 
            to="/job/getall" 
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
          >
            <div style={styles.icon}>
              <MdFindInPage />
            </div>
            <p style={styles.cardTitle}>Find a Job/Post a Job</p>
            <p style={styles.cardDescription}>
              Browse jobs that match your skills or post openings to find the perfect candidates for your company.
            </p>
          </Link>
          
          <div 
            style={styles.card}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
          >
            <div style={styles.icon}>
              <IoMdSend />
            </div>
            <p style={styles.cardTitle}>Apply For Job/Recruit Candidates</p>
            <p style={styles.cardDescription}>
              Submit applications with ease or review candidates to build your dream team.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;