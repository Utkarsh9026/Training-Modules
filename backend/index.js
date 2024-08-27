import cors from "cors";
import express from "express";
import "dotenv/config";

//Routes import
import AuthRoutes from "./routes/auth.routes.js";
import VideosRoutes from "./routes/video.routes.js";
import ProgressRoutes from "./routes/progress.routes.js";
import connectDb from "./config/db.config.js";

const app = express();
let PORT = process.env.PORT || 3000;

//MongoDB connection
connectDb();

app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  res.send("Welcome to the backend");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/video", VideosRoutes);
app.use("/api/progress", ProgressRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
