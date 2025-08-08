import app from "./app.js";
import cloudinary from "cloudinary";
import cors from 'cors';
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // CLOUDINARY_CLIENT_NAME
  api_key: process.env.CLOUDINARY_API_KEY,       // CLOUDINARY_CLIENT_API
  api_secret: process.env.CLOUDINARY_API_SECRET, // CLOUDINARY_CLIENT_SECRET
});
console.log('⚙️  Using DB URL:', process.env.DB_URL);
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
app.use(cors({
  origin: 'https://your-vercel-app.vercel.app',
  credentials: true
}));
