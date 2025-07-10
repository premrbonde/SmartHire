import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaMicrophone, FaTimes, FaRobot, FaUser, FaFileUpload, FaExpand, FaCompress } from "react-icons/fa";
import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?worker";
GlobalWorkerOptions.workerSrc = pdfWorker;

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={your api key}";

const Chatbox = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Load previous chats when component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/chat/history/${currentUser._id}`);
        if (res.data.success) {
          setMessages(res.data.chat.messages || []);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    
    if (currentUser?._id) {
      fetchChatHistory();
    }
  }, [currentUser]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: input }] }],
      });

      const reply =
        res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";

      setMessages((prev) => [...prev, { type: "bot", text: reply }]);
      
      // Save chat to backend
      await axios.post("http://localhost:4000/api/v1/chat/save", {
        userId: currentUser._id,
        role: currentUser.role,
        messages: [...newMessages, { type: "bot", text: reply }],
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { 
        type: "bot", 
        text: "Sorry, I'm having trouble connecting. Please try again later." 
      }]);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await getDocument({ data: typedarray }).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ");
        }

        const prompt = `Analyze this resume and give feedback on strengths and areas for improvement:\n\n${text}`;

        const res = await axios.post(GEMINI_API_URL, {
          contents: [{ parts: [{ text: prompt }] }],
        });

        const reply =
          res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Could not analyze resume.";

        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Resume analyzed! Here's the feedback:\n\n" + reply },
        ]);
        
        // Save to backend
        await axios.post("http://localhost:4000/api/v1/chat/save", {
          userId: currentUser._id,
          role: currentUser.role,
          messages: [...messages, { type: "bot", text: "Resume analyzed:\n" + reply }],
        });
      } catch (error) {
        console.error("Error analyzing PDF:", error);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Sorry, I couldn't analyze the resume. Please try another file." },
        ]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Speech recognition is not supported in your browser." },
      ]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Listening... Speak now." },
      ]);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `Error occurred in recognition: ${event.error}` },
      ]);
    };

    recognition.start();
  };

  const speakText = (text) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = window.speechSynthesis.getVoices().find(v => v.lang.includes('en')) || null;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Styles
  const chatboxStyles = {
    container: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: isMinimized ? "350px" : "400px",
      height: isMinimized ? "40px" : "500px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
      zIndex: 1000,
      overflow: "hidden",
      border: "1px solid #e5e7eb",
    },
    header: {
      backgroundColor: "#4f46e5",
      color: "white",
      padding: "12px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      borderRadius: "12px 12px 0 0",
    },
    title: {
      fontSize: "16px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    controls: {
      display: "flex",
      gap: "12px",
    },
    controlButton: {
      background: "none",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    messagesContainer: {
      flex: 1,
      overflowY: "auto",
      padding: "16px",
      backgroundColor: "#f9fafb",
    },
    message: {
      marginBottom: "12px",
      display: "flex",
      flexDirection: "column",
    },
    userMessage: {
      alignSelf: "flex-end",
      maxWidth: "80%",
    },
    botMessage: {
      alignSelf: "flex-start",
      maxWidth: "80%",
    },
    messageContent: {
      padding: "10px 14px",
      borderRadius: "18px",
      fontSize: "14px",
      lineHeight: "1.4",
      wordWrap: "break-word",
    },
    userContent: {
      backgroundColor: "#4f46e5",
      color: "white",
      borderTopRightRadius: "4px",
    },
    botContent: {
      backgroundColor: "#e5e7eb",
      color: "#111827",
      borderTopLeftRadius: "4px",
    },
    inputContainer: {
      padding: "12px 16px",
      borderTop: "1px solid #e5e7eb",
      backgroundColor: "white",
      display: "flex",
      gap: "8px",
    },
    input: {
      flex: 1,
      padding: "10px 14px",
      borderRadius: "20px",
      border: "1px solid #e5e7eb",
      outline: "none",
      fontSize: "14px",
      resize: "none",
    },
    sendButton: {
      backgroundColor: "#4f46e5",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    uploadButton: {
      backgroundColor: "#10b981",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    voiceButton: {
      backgroundColor: "#f59e0b",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    fileInput: {
      display: "none",
    },
    resumeUpload: {
      padding: "12px 16px",
      backgroundColor: "#f9fafb",
      borderTop: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    uploadLabel: {
      fontSize: "14px",
      color: "#4f46e5",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4f46e5",
          color: "white",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          zIndex: 1000,
        }}
      >
        <FaRobot />
      </button>
    );
  }

  return (
    <div style={chatboxStyles.container}>
      <div 
        style={chatboxStyles.header}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div style={chatboxStyles.title}>
          <FaRobot /> CareerConnect AI Assistant
        </div>
        <div style={chatboxStyles.controls}>
          <button 
            style={chatboxStyles.controlButton}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
          >
            {isMinimized ? <FaExpand /> : <FaCompress />}
          </button>
          <button 
            style={chatboxStyles.controlButton}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div style={chatboxStyles.messagesContainer}>
            {messages.length === 0 ? (
              <div style={{ 
                textAlign: "center", 
                color: "#6b7280",
                padding: "20px",
              }}>
                <p>Hello {currentUser?.name || "there"}! 👋</p>
                <p>How can I help you with your job search today?</p>
                {currentUser?.role === "Job Seeker" && (
                  <p>You can upload your resume for feedback too!</p>
                )}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    ...chatboxStyles.message,
                    ...(msg.type === "user" 
                      ? chatboxStyles.userMessage 
                      : chatboxStyles.botMessage),
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}>
                    {msg.type === "user" ? (
                      <FaUser style={{ color: "#4f46e5" }} />
                    ) : (
                      <FaRobot style={{ color: "#6b7280" }} />
                    )}
                    <span style={{ 
                      fontWeight: "600", 
                      fontSize: "12px",
                      color: msg.type === "user" ? "#4f46e5" : "#6b7280",
                    }}>
                      {msg.type === "user" ? "You" : "CareerConnect AI"}
                    </span>
                  </div>
                  <div
                    style={{
                      ...chatboxStyles.messageContent,
                      ...(msg.type === "user" 
                        ? chatboxStyles.userContent 
                        : chatboxStyles.botContent),
                    }}
                  >
                    {msg.text.split('\n').map((paragraph, idx) => (
                      <p key={idx} style={{ margin: idx > 0 ? '8px 0 0' : '0' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={chatboxStyles.inputContainer}>
            <input
              type="text"
              style={chatboxStyles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button
              style={chatboxStyles.sendButton}
              onClick={handleSend}
              title="Send"
            >
              <FaPaperPlane />
            </button>
            <button
              style={chatboxStyles.voiceButton}
              onClick={startVoiceInput}
              title="Voice input"
            >
              <FaMicrophone />
            </button>
            {currentUser?.role === "Job Seeker" && (
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  style={chatboxStyles.fileInput}
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  style={chatboxStyles.uploadButton}
                  title="Upload resume"
                >
                  <FaFileUpload />
                </label>
              </>
            )}
          </div>

          {currentUser?.role === "Job Seeker" && (
            <div style={chatboxStyles.resumeUpload}>
              <label htmlFor="resume-upload" style={chatboxStyles.uploadLabel}>
                <FaFileUpload /> Upload Resume (PDF)
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chatbox;
