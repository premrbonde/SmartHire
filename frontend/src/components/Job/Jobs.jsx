import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://smarthire-1-g9mm.onrender.com/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  // Styles object
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      padding: "40px 0",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 20px"
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      color: "#2c3e50",
      fontSize: "2.5rem",
      fontWeight: "600",
      position: "relative",
      paddingBottom: "15px"
    },
    headerAfter: {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100px",
      height: "4px",
      backgroundColor: "#3498db",
      borderRadius: "2px"
    },
    banner: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "25px",
      marginTop: "30px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "25px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      borderLeft: "4px solid #3498db",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
      display: "block"
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
    },
    title: {
      fontSize: "1.3rem",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#2c3e50"
    },
    detail: {
      fontSize: "0.95rem",
      color: "#7f8c8d",
      marginBottom: "8px",
      display: "flex",
      alignItems: "center"
    },
    detailIcon: {
      marginRight: "8px",
      color: "#3498db"
    },
    link: {
      display: "inline-block",
      marginTop: "15px",
      padding: "8px 20px",
      backgroundColor: "#3498db",
      color: "white",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "500",
      transition: "background-color 0.3s ease"
    },
    linkHover: {
      backgroundColor: "#2980b9"
    },
    loading: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#7f8c8d",
      marginTop: "50px"
    },
    empty: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#7f8c8d",
      marginTop: "50px",
      gridColumn: "1/-1"
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>
          ALL AVAILABLE JOBS
          <span style={styles.headerAfter}></span>
        </h1>
        
        {loading ? (
          <p style={styles.loading}>Loading jobs...</p>
        ) : (
          <div style={styles.banner}>
            {jobs.jobs && jobs.jobs.length > 0 ? (
              jobs.jobs.map((job) => (
                <Link 
                  to={`/job/${job._id}`} 
                  key={job._id}
                  style={styles.card}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.card)}
                >
                  <h3 style={styles.title}>{job.title}</h3>
                  <p style={styles.detail}>
                    <span style={styles.detailIcon}>📌</span>
                    {job.category}
                  </p>
                  <p style={styles.detail}>
                    <span style={styles.detailIcon}>🌎</span>
                    {job.country}
                  </p>
                  <span 
                    style={styles.link}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.linkHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.link)}
                  >
                    View Details
                  </span>
                </Link>
              ))
            ) : (
              <p style={styles.empty}>No jobs available at the moment</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;