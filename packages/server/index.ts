import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import z from "zod";
import { chatService } from "./services/chat.services";

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

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(200, "Prompt is too long, maximum 200 characters"),
  conversationId: z.guid(),
});

app.post("/api/chat", async (req: Request, res: Response) => {
  // validate request body
  const parseResult = chatSchema.safeParse(req.body);

  if (!parseResult.success) {
    res.status(400).json({ errorTree: z.treeifyError(parseResult.error) });
    return;
  }

  try {
    const { prompt, conversationId } = req.body;

    const response = await chatService.sendMessage(prompt, conversationId);
    res.json({ reply: response.outputText });
  } catch (error) {
    res.status(500).json({ error: "A Server Error Occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
