# SmartHire – AI-Powered Job Portal (MERN Stack)

A comprehensive job hiring portal built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. SmartHire allows job seekers to explore job listings, apply with their resume, and interact with an integrated Gemini AI chatbot for career guidance. Employers can post jobs and manage applications with ease.

## Features

- **User Authentication:** Secure JWT-based login system with roles (Job Seeker & Employer)
- **Job Management:** Employers can post, update, delete, and manage job listings.
- **Application Tracking:** Job seekers can apply with resume files and track applications.
- **Cloudinary Integration:** Secure resume uploads and storage.
- **Gemini AI Chatbox:** Users can chat with Google's Gemini-powered assistant for resume feedback, career advice, and job insights.
- **Responsive Design:** Fully responsive UI for desktop and mobile devices.

## Technologies Used

- **Frontend:** React.js, React Router, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt
- **File Uploads:** Cloudinary
- **AI Chatbot:** Gemini API (Google's LLM)
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js v18+ or v22+
- MongoDB Atlas account or local MongoDB server
- Cloudinary account for image/resume storage
- Google Gemini API key (free from Google AI Studio)

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/premrbonde/SmartHire.git

2. Install NPM packages:
   ```sh
   cd SmartHire
   cd backend
   npm install
   cd ../frontend
   npm install

3. Set up environment variables:
   Create a config.env file inside the backend/config/ directory and add the following:
      ```sh
      PORT=4000
      CLOUDINARY_API_KEY=your_key
      CLOUDINARY_API_SECRET=your_secret
      CLOUDINARY_CLOUD_NAME=your_cloud_name
      FRONTEND_URL=http://localhost:5173
      DB_URL=mongodb://127.0.0.1:27017/smarthire
      JWT_SECRET_KEY=your_jwt_secret
      JWT_EXPIRE=7d
      COOKIE_EXPIRE=7
      
      Replace the values with your real credentials.

4. Run the backend server:
   ```sh
   cd backend
   npm run dev

5. Run the frontend:
   ```sh
   cd ../frontend
   npm run dev

6. Open your browser and visit: 
   ```sh
   http://localhost:5173

7. To enable Gemini AI chat:
   ```sh
   Open frontend/src/components/Chatbox.jsx

   Replace YOUR_API_KEY in:
   const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY";



