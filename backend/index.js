import cors from "cors";
import express from "express";
import "dotenv/config";

//Routes import
import AuthRoutes from "./routes/auth.routes.js";
import VideosRoutes from "./routes/video.routes.js";
import ProgressRoutes from "./routes/progress.routes.js";
import connectDb from "./config/db.config.js";

const app = express();
let PORT = process.env.PORT || 5000;

//MongoDB connection
connectDb();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
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
  console.log("Listening on port -> ", +PORT);
});
