import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "This is a Json response" });
});

const conversations = new Map<string, string>(); // storing in memory

app.post("/api/chat", async (req: Request, res: Response) => {
  const { prompt, conversationId } = req.body;

  const response = await openai.responses.create({
    model: "gpt-4.1-nano",
    input: prompt,
    temperature: 0.3,
    max_output_tokens: 200,
    previous_response_id: conversations.get(conversationId),
  });

  conversations.set(conversationId, response.id);

  res.json({ reply: response.output_text });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
