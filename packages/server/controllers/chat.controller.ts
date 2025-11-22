import type { Request, Response } from "express";
import { chatService } from "../services/chat.services";
import z from "zod";

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, "Prompt is required")
    .max(200, "Prompt is too long, maximum 200 characters"),
  conversationId: z.guid(),
});

export const chatController = {
  async sendMessage(req: Request, res: Response) {
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
  },
};
