import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [loading, setLoading] = useState(false);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

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
    inputGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px"
    },
    input: {
      padding: "14px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      width: "100%"
    },
    inputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    },
    select: {
      padding: "14px 16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      transition: "all 0.3s ease",
      outline: "none",
      backgroundColor: "white",
      cursor: "pointer"
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
    salaryContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    salaryInputGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px"
    },
    salaryNote: {
      color: "#7f8c8d",
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
    }
  };

  const handleJobPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Clear unused salary fields
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      const payload = fixedSalary.length >= 4
        ? {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
          }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            salaryFrom,
            salaryTo,
          };

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Reset form on success
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setCity("");
      setLocation("");
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
      setSalaryType("default");

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h3 style={styles.header}>
          POST NEW JOB
          <span style={styles.headerAfter}></span>
        </h3>
        
        <form onSubmit={handleJobPost} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
              required
              style={styles.input}
              onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
            />
            
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="Business Development Executive">Business Development Executive</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN Stack Development</option>
              <option value="MERN Stack Development">MERN Stack Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required
              style={styles.input}
              onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
            />
            
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
              style={styles.input}
              onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
            />
          </div>
          
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            required
            style={styles.input}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
          />
          
          <div style={styles.salaryContainer}>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              required
              style={styles.select}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            
            {salaryType === "default" ? (
              <p style={styles.salaryNote}>Please select a salary type</p>
            ) : salaryType === "Fixed Salary" ? (
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
                required
                min="0"
                style={styles.input}
                onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
              />
            ) : (
              <div style={styles.salaryInputGroup}>
                <input
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  required
                  min="0"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                />
                <input
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  required
                  min={salaryFrom || "0"}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                />
              </div>
            )}
          </div>
          
          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
            required
            style={styles.textarea}
            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
            onBlur={(e) => Object.assign(e.currentTarget.style, styles.textarea)}
          />
          
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
            {loading ? "Posting Job..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;