import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Styles object
  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      padding: "60px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    container: {
      maxWidth: "800px",
      width: "100%",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
      padding: "40px",
      margin: "20px"
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
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
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    input: {
      padding: "14px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none"
    },
    inputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    },
    textarea: {
      padding: "14px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      minHeight: "150px",
      resize: "vertical",
      transition: "all 0.3s ease",
      outline: "none"
    },
    fileContainer: {
      marginBottom: "10px"
    },
    fileLabel: {
      display: "block",
      fontSize: "16px",
      marginBottom: "8px",
      color: "#2c3e50",
      fontWeight: "500"
    },
    fileHint: {
      color: "#7f8c8d",
      fontSize: "14px",
      margin: "5px 0 10px 0"
    },
    fileInput: {
      width: "100%",
      padding: "10px",
      border: "1px dashed #ddd",
      borderRadius: "8px",
      backgroundColor: "#f8f9fa",
      cursor: "pointer"
    },
    error: {
      color: "#e74c3c",
      fontSize: "14px",
      marginTop: "5px"
    },
    button: {
      padding: "16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#3498db",
      color: "white",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px"
    },
    buttonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    },
    buttonDisabled: {
      opacity: 0.7,
      cursor: "not-allowed",
      backgroundColor: "#95a5a6"
    },
    successMessage: {
      color: "#27ae60",
      textAlign: "center",
      marginTop: "20px"
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");
    
    if (!file) {
      setResume(null);
      return;
    }
    
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select a valid image file (PNG, JPEG, or WEBP)");
      setResume(null);
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB");
      setResume(null);
      return;
    }
    
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is currently unavailable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <h3 style={styles.header}>
          Application Form
          <span style={styles.headerAfter}></span>
        </h3>
        
        <form onSubmit={handleApplication} style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
          />
          
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
          />
          
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
          />
          
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
          />
          
          <textarea
            placeholder="Your Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            style={styles.textarea}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.textarea)}
          />
          
          <div style={styles.fileContainer}>
            <label style={styles.fileLabel}>Upload Resume</label>
            <p style={styles.fileHint}>Supported formats: PNG, JPEG, WEBP (Max size: 2MB)</p>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            {fileError && <p style={styles.error}>{fileError}</p>}
            {resume && (
              <p style={{ color: "#27ae60", marginTop: "5px" }}>
                Selected: {resume.name}
              </p>
            )}
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
            onMouseEnter={(e) => !loading && Object.assign(e.currentTarget.style, styles.buttonHover)}
            onMouseLeave={(e) => !loading && Object.assign(e.currentTarget.style, styles.button)}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;