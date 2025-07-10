import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  // Styles object
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
      transition: "opacity 0.3s ease"
    },
    modalContent: {
      position: "relative",
      maxWidth: "90%",
      maxHeight: "90%",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
      overflow: "hidden",
      animation: "fadeIn 0.3s ease"
    },
    closeButton: {
      position: "absolute",
      top: "15px",
      right: "20px",
      fontSize: "30px",
      color: "#fff",
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      transition: "all 0.2s ease"
    },
    closeButtonHover: {
      backgroundColor: "rgba(231, 76, 60, 0.8)",
      transform: "rotate(90deg)"
    },
    modalImage: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "80vh",
      margin: "0 auto",
      padding: "20px"
    },
    downloadButton: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      backgroundColor: "#3498db",
      color: "white",
      padding: "10px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      border: "none",
      fontSize: "16px",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px"
    },
    downloadButtonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)"
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'resume_' + new Date().getTime();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <span 
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.closeButtonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.closeButton)}
        >
          &times;
        </span>
        
        <img 
          src={imageUrl} 
          alt="Resume" 
          style={styles.modalImage} 
        />
        
        <button
          style={styles.downloadButton}
          onClick={handleDownload}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.downloadButtonHover)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.downloadButton)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download
        </button>
      </div>
    </div>
  );
};

export default ResumeModal;