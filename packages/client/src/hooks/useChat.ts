import axios from "axios";
import { useRef } from "react";

type AiResponse = {
  reply: string;
};

const useChat = () => {
  const conversationIdRef = useRef<string>(crypto.randomUUID());

  const sendPrompt = async (prompt: string) => {
    return await axios.post<AiResponse>("/api/chat", {
      prompt,
      conversationId: conversationIdRef.current,
    });
  };

  return { sendPrompt, conversationId: conversationIdRef.current };
};

export default useChat;
