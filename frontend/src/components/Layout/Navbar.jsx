import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShow(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  // Styles object
  const styles = {
    nav: {
      backgroundColor: "black",
      padding: "1rem 0",
      boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      display: isAuthorized ? "block" : "none",
      width: "100%",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
    },
    logo: {
      height: "70px",
      display: "flex",
      alignItems: "center",
    },
    logoImg: {
      height: "100%",
      objectFit: "contain",
    },
    menu: {
      display: "flex",
      listStyle: "none",
      alignItems: "center",
      gap: "2rem",
      transition: "all 0.3s ease",
    },
    mobileMenu: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "#34495e",
      flexDirection: "column",
      gap: "1rem",
      padding: "2rem",
      clipPath: "circle(0% at 100% 0%)",
      pointerEvents: "none",
      zIndex: 999,
    },
    showMobileMenu: {
      clipPath: "circle(150% at 100% 0%)",
      pointerEvents: "all",
    },
    menuItem: {
      position: "relative",
    },
    link: {
      color: "#ecf0f1",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "1px",
      transition: "all 0.3s ease",
      padding: "0.5rem 0",
      display: "block",
      "&:hover": {
        color: "#3498db",
      },
    },
    linkHover: {
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2px",
        backgroundColor: "#3498db",
      },
    },
    logoutBtn: {
      backgroundColor: "#e74c3c",
      color: "white",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "0.9rem",
      letterSpacing: "1px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#c0392b",
        transform: "translateY(-2px)",
      },
    },
    hamburger: {
      display: "none",
      color: "white",
      fontSize: "1.5rem",
      cursor: "pointer",
      zIndex: 1000,
    },
  };

  // Apply hover styles manually since React doesn't support pseudo-classes in inline styles
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img src="/careerconnect-white.png" alt="logo" style={styles.logoImg} />
        </div>
        
        <ul 
          style={{
            ...styles.menu,
            ...(isMobile ? styles.mobileMenu : {}),
            ...(show && isMobile ? styles.showMobileMenu : {}),
          }}
        >
          <li 
            style={styles.menuItem}
            onMouseEnter={() => !isMobile && setHoveredLink("home")}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            <Link 
              to="/" 
              onClick={() => setShow(false)} 
              style={{
                ...styles.link,
                color: hoveredLink === "home" ? "#3498db" : "#ecf0f1",
              }}
            >
              HOME
              {hoveredLink === "home" && <div style={{ 
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3498db",
                transition: "width 0.3s ease",
              }} />}
            </Link>
          </li>
          
          <li 
            style={styles.menuItem}
            onMouseEnter={() => !isMobile && setHoveredLink("jobs")}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            <Link 
              to="/job/getall" 
              onClick={() => setShow(false)} 
              style={{
                ...styles.link,
                color: hoveredLink === "jobs" ? "#3498db" : "#ecf0f1",
              }}
            >
              ALL JOBS
              {hoveredLink === "jobs" && <div style={{ 
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3498db",
                transition: "width 0.3s ease",
              }} />}
            </Link>
          </li>
          
          <li 
            style={styles.menuItem}
            onMouseEnter={() => !isMobile && setHoveredLink("applications")}
            onMouseLeave={() => !isMobile && setHoveredLink(null)}
          >
            <Link 
              to="/applications/me" 
              onClick={() => setShow(false)} 
              style={{
                ...styles.link,
                color: hoveredLink === "applications" ? "#3498db" : "#ecf0f1",
              }}
            >
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
              {hoveredLink === "applications" && <div style={{ 
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "2px",
                backgroundColor: "#3498db",
                transition: "width 0.3s ease",
              }} />}
            </Link>
          </li>
          
          {user && user.role === "Employer" && (
            <>
              <li 
                style={styles.menuItem}
                onMouseEnter={() => !isMobile && setHoveredLink("post")}
                onMouseLeave={() => !isMobile && setHoveredLink(null)}
              >
                <Link 
                  to="/job/post" 
                  onClick={() => setShow(false)} 
                  style={{
                    ...styles.link,
                    color: hoveredLink === "post" ? "#3498db" : "#ecf0f1",
                  }}
                >
                  POST NEW JOB
                  {hoveredLink === "post" && <div style={{ 
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#3498db",
                    transition: "width 0.3s ease",
                  }} />}
                </Link>
              </li>
              
              <li 
                style={styles.menuItem}
                onMouseEnter={() => !isMobile && setHoveredLink("myjobs")}
                onMouseLeave={() => !isMobile && setHoveredLink(null)}
              >
                <Link 
                  to="/job/me" 
                  onClick={() => setShow(false)} 
                  style={{
                    ...styles.link,
                    color: hoveredLink === "myjobs" ? "#3498db" : "#ecf0f1",
                  }}
                >
                  VIEW YOUR JOBS
                  {hoveredLink === "myjobs" && <div style={{ 
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#3498db",
                    transition: "width 0.3s ease",
                  }} />}
                </Link>
              </li>
            </>
          )}
          
          <li style={styles.menuItem}>
            <button 
              onClick={handleLogout} 
              style={styles.logoutBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#c0392b";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e74c3c";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              LOGOUT
            </button>
          </li>
        </ul>
        
        {isMobile && (
          <div 
            style={{
              ...styles.hamburger,
              display: "flex",
              alignItems: "center",
            }} 
            onClick={() => setShow(!show)}
          >
            {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;