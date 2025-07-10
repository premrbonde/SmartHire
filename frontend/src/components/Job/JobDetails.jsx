import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
        setLoading(false);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id]);

  if (!isAuthorized) {
    navigateTo("/login");
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
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
      color: "#2c3e50",
      fontSize: "2rem",
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
      width: "80px",
      height: "4px",
      backgroundColor: "#3498db",
      borderRadius: "2px"
    },
    detailContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "30px"
    },
    detailItem: {
      marginBottom: "15px"
    },
    detailLabel: {
      fontSize: "0.9rem",
      color: "#7f8c8d",
      marginBottom: "5px",
      fontWeight: "500"
    },
    detailValue: {
      fontSize: "1rem",
      color: "#2c3e50",
      fontWeight: "600"
    },
    description: {
      margin: "25px 0",
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      lineHeight: "1.6"
    },
    salary: {
      display: "inline-block",
      padding: "8px 15px",
      backgroundColor: "#e8f4fc",
      color: "#2980b9",
      borderRadius: "5px",
      fontWeight: "600",
      margin: "10px 0"
    },
    applyButton: {
      display: "inline-block",
      marginTop: "20px",
      padding: "12px 30px",
      backgroundColor: "#3498db",
      color: "white",
      borderRadius: "5px",
      textDecoration: "none",
      fontWeight: "500",
      transition: "all 0.3s ease",
      textAlign: "center",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem"
    },
    applyButtonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    },
    loading: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#7f8c8d",
      marginTop: "50px"
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.loading}>Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h3 style={styles.header}>
          Job Details
          <span style={styles.headerAfter}></span>
        </h3>
        
        <div style={styles.detailContainer}>
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>Job Title</p>
            <p style={styles.detailValue}>{job.title}</p>
          </div>
          
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>Category</p>
            <p style={styles.detailValue}>{job.category}</p>
          </div>
          
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>Country</p>
            <p style={styles.detailValue}>{job.country}</p>
          </div>
          
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>City</p>
            <p style={styles.detailValue}>{job.city}</p>
          </div>
          
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>Location</p>
            <p style={styles.detailValue}>{job.location}</p>
          </div>
          
          <div style={styles.detailItem}>
            <p style={styles.detailLabel}>Posted On</p>
            <p style={styles.detailValue}>
              {new Date(job.jobPostedOn).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div style={styles.detailItem}>
          <p style={styles.detailLabel}>Salary</p>
          <div style={styles.salary}>
            {job.fixedSalary ? (
              `$${job.fixedSalary}`
            ) : (
              `$${job.salaryFrom} - $${job.salaryTo}`
            )}
          </div>
        </div>
        
        <div style={styles.detailItem}>
          <p style={styles.detailLabel}>Job Description</p>
          <div style={styles.description}>
            {job.description || "No description provided"}
          </div>
        </div>
        
        {user && user.role === "Employer" ? null : (
          <Link
            to={`/application/${job._id}`}
            style={styles.applyButton}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.applyButtonHover)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.applyButton)}
          >
            Apply Now
          </Link>
        )}
      </div>
    </section>
  );
};

export default JobDetails;