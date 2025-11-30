import { useCallback, useState } from "react";
import useChat from "./useChat";
import type { Message } from "@/components/chat/ChatMessages";

const useChatSession = () => {
  const { sendPrompt } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState("");

  const submitChatMessage = useCallback(
    async ({ prompt }: { prompt: string }) => {
      setMessages((prev) => [...prev, { by: "user", content: prompt }]);
      setIsBotTyping(true);
      setError("");

      try {
        const { data } = await sendPrompt(prompt);
        setMessages((prev) => [...prev, { by: "bot", content: data.reply }]);
      } catch (e) {
        console.error(e);
        setError("An error occurred. Please try again.");
      } finally {
        setIsBotTyping(false);
      }
    },
    [sendPrompt]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError("");
  }, []);

  return { messages, isBotTyping, error, submitChatMessage, clearMessages };
};

export default useChatSession;
