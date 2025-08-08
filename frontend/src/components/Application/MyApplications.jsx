import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // Styles object
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px"
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
      color: "#2c3e50",
      fontSize: "2.2rem",
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
    emptyState: {
      textAlign: "center",
      marginTop: "50px",
      color: "#7f8c8d",
      fontSize: "1.2rem"
    },
    loading: {
      textAlign: "center",
      marginTop: "50px",
      color: "#7f8c8d",
      fontSize: "1.2rem"
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      gap: "25px",
      marginTop: "30px"
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const endpoint = user && user.role === "Employer" 
          ? "https://smarthire-1-g9mm.onrender.com/api/v1/application/employer/getall"
          : "https://smarthire-1-g9mm.onrender.com/api/v1/application/jobseeker/getall";
        
        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchApplications();
    }
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `https://smarthire-1-g9mm.onrender.com/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications(prev => prev.filter(app => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>
          {user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}
          <span style={styles.headerAfter}></span>
        </h1>
        
        {loading ? (
          <p style={styles.loading}>Loading applications...</p>
        ) : applications.length <= 0 ? (
          <p style={styles.emptyState}>No applications found</p>
        ) : (
          <div style={styles.cardsContainer}>
            {applications.map((element) => (
              user && user.role === "Job Seeker" ? (
                <JobSeekerCard
                  key={element._id}
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  key={element._id}
                  element={element}
                  openModal={openModal}
                />
              )
            ))}
          </div>
        )}
      </div>
      
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

// Card component styles
const cardStyles = {
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "25px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  cardHover: {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)"
  },
  detailItem: {
    marginBottom: "10px"
  },
  label: {
    color: "#3498db",
    fontWeight: "600",
    marginRight: "8px"
  },
  value: {
    color: "#2c3e50"
  },
  coverLetter: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 0",
    lineHeight: "1.6"
  },
  resumePreview: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "6px",
    border: "1px solid #eee",
    cursor: "pointer",
    transition: "transform 0.3s ease"
  },
  resumePreviewHover: {
    transform: "scale(1.02)"
  },
  viewResume: {
    color: "#3498db",
    textAlign: "center",
    margin: "5px 0",
    fontSize: "14px",
    cursor: "pointer"
  },
  deleteButton: {
    padding: "10px 15px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
    marginTop: "10px"
  },
  deleteButtonHover: {
    backgroundColor: "#c0392b"
  }
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div 
      style={cardStyles.card}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardStyles.cardHover)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyles.card)}
    >
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Name:</span>
        <span style={cardStyles.value}>{element.name}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Email:</span>
        <span style={cardStyles.value}>{element.email}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Phone:</span>
        <span style={cardStyles.value}>{element.phone}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Address:</span>
        <span style={cardStyles.value}>{element.address}</span>
      </div>
      
      <div>
        <span style={cardStyles.label}>Cover Letter:</span>
        <div style={cardStyles.coverLetter}>
          {element.coverLetter || "No cover letter provided"}
        </div>
      </div>
      
      <img
        src={element.resume.url}
        alt="Resume preview"
        style={cardStyles.resumePreview}
        onClick={() => openModal(element.resume.url)}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardStyles.resumePreviewHover)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyles.resumePreview)}
      />
      <div 
        style={cardStyles.viewResume}
        onClick={() => openModal(element.resume.url)}
      >
        Click to view full resume
      </div>
      
      <button
        style={cardStyles.deleteButton}
        onClick={() => deleteApplication(element._id)}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardStyles.deleteButtonHover)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyles.deleteButton)}
      >
        Delete Application
      </button>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div 
      style={cardStyles.card}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardStyles.cardHover)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyles.card)}
    >
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Name:</span>
        <span style={cardStyles.value}>{element.name}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Email:</span>
        <span style={cardStyles.value}>{element.email}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Phone:</span>
        <span style={cardStyles.value}>{element.phone}</span>
      </div>
      
      <div style={cardStyles.detailItem}>
        <span style={cardStyles.label}>Address:</span>
        <span style={cardStyles.value}>{element.address}</span>
      </div>
      
      <div>
        <span style={cardStyles.label}>Cover Letter:</span>
        <div style={cardStyles.coverLetter}>
          {element.coverLetter || "No cover letter provided"}
        </div>
      </div>
      
      <img
        src={element.resume.url}
        alt="Resume preview"
        style={cardStyles.resumePreview}
        onClick={() => openModal(element.resume.url)}
        onMouseEnter={(e) => Object.assign(e.currentTarget.style, cardStyles.resumePreviewHover)}
        onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyles.resumePreview)}
      />
      <div 
        style={cardStyles.viewResume}
        onClick={() => openModal(element.resume.url)}
      >
        Click to view full resume
      </div>
    </div>
  );
};

export default MyApplications;