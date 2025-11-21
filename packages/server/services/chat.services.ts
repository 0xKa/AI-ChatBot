import OpenAI from "openai";
import { conversationRepository } from "../repositories/conversation.repository";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
  id: string;
  outputText: string;
};

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string
  ): Promise<ChatResponse> {
    const response = await openai.responses.create({
      model: "gpt-4.1-nano",
      input: prompt,
      temperature: 0.3,
      max_output_tokens: 200,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);
    return {
      id: response.id,
      outputText: response.output_text,
    };
  },
};
