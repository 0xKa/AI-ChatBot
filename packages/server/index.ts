import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import z from "zod";
import { conversationRepository } from "./repositories/conversation.repository";

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

    const response = await openai.responses.create({
      model: "gpt-4.1-nano",
      input: prompt,
      temperature: 0.3,
      max_output_tokens: 200,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    res.json({ reply: response.output_text });
  } catch (error) {
    res.status(500).json({ error: "A Server Error Occurred." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
