import express from "express";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/api", router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
