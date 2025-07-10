import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { Link } from "react-router-dom";

const PopularCategories = () => {
  // Styles object
  const styles = {
    popularCategories: {
      padding: "80px 20px",
      backgroundColor: "#ffffff",
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
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "30px",
      marginTop: "40px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "30px 20px",
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
    icon: {
      fontSize: "2.5rem",
      color: "#3498db",
      marginBottom: "20px"
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: "10px"
    },
    cardSubTitle: {
      fontSize: "0.9rem",
      color: "#7f8c8d",
      lineHeight: "1.6"
    }
  };

  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  return (
    <section style={styles.popularCategories} id="popular-categories">
      <div style={styles.container}>
        <h3 style={styles.heading}>
          POPULAR CATEGORIES
          <span style={styles.headingAfter}></span>
        </h3>
        
        <div style={styles.banner}>
          {categories.map((element) => (
            <Link 
              to="/job/getall" 
              style={styles.card}
              key={element.id}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
            >
              <div style={styles.icon}>{element.icon}</div>
              <p style={styles.cardTitle}>{element.title}</p>
              <p style={styles.cardSubTitle}>{element.subTitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;