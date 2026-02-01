import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconenection/dbConnect.js";
import personalRoutes from "./routes/personal.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://neelamohan-profile.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Express server!",
    status: true
  });
});

app.use("/personal", personalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
