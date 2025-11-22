import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { chatController } from "./controllers/chat.controller";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "This is a Json response" });
});

app.post("/api/chat", async (req: Request, res: Response) => {
  chatController.sendMessage(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
