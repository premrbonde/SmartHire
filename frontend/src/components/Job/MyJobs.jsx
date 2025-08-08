import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthorized, user } = useContext(Context);
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
    banner: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      gap: "25px",
      marginTop: "30px"
    },
    card: {
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
      padding: "25px",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column"
    },
    cardHover: {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)"
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    },
    shortFields: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "15px"
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    },
    fieldLabel: {
      color: "#7f8c8d",
      fontSize: "14px",
      fontWeight: "500"
    },
    input: {
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px",
      transition: "all 0.2s ease",
      outline: "none"
    },
    inputFocus: {
      borderColor: "#3498db",
      boxShadow: "0 0 0 2px rgba(52, 152, 219, 0.2)"
    },
    inputDisabled: {
      backgroundColor: "#f8f9fa",
      borderColor: "#eee",
      cursor: "not-allowed"
    },
    select: {
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px",
      backgroundColor: "white",
      cursor: "pointer"
    },
    selectDisabled: {
      backgroundColor: "#f8f9fa",
      cursor: "not-allowed"
    },
    longField: {
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    textarea: {
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "14px",
      minHeight: "100px",
      resize: "vertical",
      transition: "all 0.2s ease",
      outline: "none"
    },
    salaryRange: {
      display: "flex",
      gap: "10px"
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px"
    },
    editButtonWrapper: {
      display: "flex",
      gap: "10px"
    },
    button: {
      padding: "10px 15px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    editButton: {
      backgroundColor: "#3498db",
      color: "white"
    },
    editButtonHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)"
    },
    checkButton: {
      backgroundColor: "#2ecc71",
      color: "white",
      padding: "8px 12px"
    },
    checkButtonHover: {
      backgroundColor: "#27ae60",
      transform: "translateY(-2px)"
    },
    crossButton: {
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "8px 12px"
    },
    crossButtonHover: {
      backgroundColor: "#c0392b",
      transform: "translateY(-2px)"
    },
    deleteButton: {
      backgroundColor: "#e74c3c",
      color: "white"
    },
    deleteButtonHover: {
      backgroundColor: "#c0392b",
      transform: "translateY(-2px)"
    },
    emptyState: {
      textAlign: "center",
      color: "#7f8c8d",
      fontSize: "1.2rem",
      marginTop: "50px"
    },
    loading: {
      textAlign: "center",
      color: "#7f8c8d",
      fontSize: "1.2rem",
      marginTop: "50px"
    }
  };

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://https://smarthire-1-g9mm.onrender.com/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
        setMyJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    try {
      const updatedJob = myJobs.find((job) => job._id === jobId);
      const { data } = await axios.put(
        `http://https://smarthire-1-g9mm.onrender.com/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `http://https://smarthire-1-g9mm.onrender.com/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.loading}>Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>
          Your Posted Jobs
          <span style={styles.headerAfter}></span>
        </h1>
        
        {myJobs.length > 0 ? (
          <div style={styles.banner}>
            {myJobs.map((element) => (
              <div 
                key={element._id}
                style={{
                  ...styles.card,
                  ...(editingMode === element._id ? styles.cardHover : {})
                }}
              >
                <div style={styles.content}>
                  <div style={styles.shortFields}>
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        style={{
                          ...styles.input,
                          ...(editingMode !== element._id ? styles.inputDisabled : {}),
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                      />
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                        style={{
                          ...styles.input,
                          ...(editingMode !== element._id ? styles.inputDisabled : {}),
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                      />
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        style={{
                          ...styles.input,
                          ...(editingMode !== element._id ? styles.inputDisabled : {}),
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                      />
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Category:</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        style={{
                          ...styles.select,
                          ...(editingMode !== element._id ? styles.selectDisabled : {}),
                        }}
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN Stack Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN Stack Development</option>
                        <option value="MEVN Stack Development">MEVN Stack Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Salary:</span>
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(element._id, "fixedSalary", e.target.value)
                          }
                          style={{
                            ...styles.input,
                            ...(editingMode !== element._id ? styles.inputDisabled : {}),
                          }}
                          onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                          onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                        />
                      ) : (
                        <div style={styles.salaryRange}>
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryFrom", e.target.value)
                            }
                            style={{
                              ...styles.input,
                              ...(editingMode !== element._id ? styles.inputDisabled : {}),
                            }}
                            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryTo", e.target.value)
                            }
                            style={{
                              ...styles.input,
                              ...(editingMode !== element._id ? styles.inputDisabled : {}),
                            }}
                            onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                            onBlur={(e) => Object.assign(e.currentTarget.style, styles.input)}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        style={{
                          ...styles.select,
                          ...(editingMode !== element._id ? styles.selectDisabled : {}),
                        }}
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={styles.longField}>
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                        style={{
                          ...styles.textarea,
                          ...(editingMode !== element._id ? styles.inputDisabled : {}),
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, styles.textarea)}
                      />
                    </div>
                    
                    <div style={styles.fieldGroup}>
                      <span style={styles.fieldLabel}>Location:</span>
                      <textarea
                        value={element.location}
                        rows={5}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "location", e.target.value)
                        }
                        style={{
                          ...styles.textarea,
                          ...(editingMode !== element._id ? styles.inputDisabled : {}),
                        }}
                        onFocus={(e) => Object.assign(e.currentTarget.style, styles.inputFocus)}
                        onBlur={(e) => Object.assign(e.currentTarget.style, styles.textarea)}
                      />
                    </div>
                  </div>
                </div>
                
                <div style={styles.buttonWrapper}>
                  <div style={styles.editButtonWrapper}>
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          style={styles.checkButton}
                          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.checkButtonHover)}
                          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.checkButton)}
                        >
                          <FaCheck /> Save
                        </button>
                        <button
                          onClick={handleDisableEdit}
                          style={styles.crossButton}
                          onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.crossButtonHover)}
                          onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.crossButton)}
                        >
                          <RxCross2 /> Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        style={styles.editButton}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.editButtonHover)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.editButton)}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    style={styles.deleteButton}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.deleteButtonHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.deleteButton)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.emptyState}>
            You haven't posted any jobs or may have deleted all of them!
          </p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;