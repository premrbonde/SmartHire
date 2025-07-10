import React, { useContext } from 'react';
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  // Styles object
  const styles = {
    footer: {
      padding: "40px 20px",
      backgroundColor: "#2c3e50",
      color: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center",
      transition: "all 0.3s ease"
    },
    footerShow: {
      display: "block",
      opacity: 1
    },
    footerHide: {
      display: "none",
      opacity: 0
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px"
    },
    copyright: {
      fontSize: "1rem",
      color: "#ecf0f1",
      marginBottom: "10px"
    },
    socialLinks: {
      display: "flex",
      gap: "20px",
      justifyContent: "center"
    },
    socialLink: {
      color: "#ecf0f1",
      fontSize: "1.5rem",
      transition: "all 0.3s ease",
      textDecoration: "none"
    },
    socialLinkHover: {
      color: "#3498db",
      transform: "translateY(-3px)"
    }
  };

  // Combine base style with visibility style
  const footerStyle = {
    ...styles.footer,
    ...(isAuthorized ? styles.footerShow : styles.footerHide)
  };

  return (
    <footer style={footerStyle}>
      <div style={styles.container}>
        <div style={styles.copyright}>&copy; {new Date().getFullYear()} All Rights Reserved by Abhishek.</div>
        <div style={styles.socialLinks}>
          <Link 
            to="https://github.com/premrbonde" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialLinkHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialLink)}
          >
            <FaGithub />
          </Link>
          <Link 
            to="https://www.linkedin.com/in/prem-bonde-278123252/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialLinkHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialLink)}
          >
            <FaLinkedin />
          </Link>
          <Link 
            to="https://leetcode.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialLinkHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialLink)}
          >
            <SiLeetcode />
          </Link>
          <Link 
            to="https://instagram.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.socialLink}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.socialLinkHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.socialLink)}
          >
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;