import axios from "axios";
import { useRef, useState } from "react";
import TypingIndicator from "./chat/TypingIndicator";
import ChatMessages, { type Message } from "./chat/ChatMessages";
import ErrorMessage from "./chat/ErrorMessage";
import ChatInput, { type ChatFormData } from "./chat/ChatInput";

type AiResponse = {
  reply: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("");
  const conversationId = useRef(crypto.randomUUID());

  const OnSubmit = async ({ prompt }: ChatFormData) => {
    try {
      console.log(prompt);
      setMessages((prevMessages) => [
        ...prevMessages,
        { by: "user", content: prompt },
      ]);
      setIsBotTyping(true);
      setError("");

      const { data } = await axios.post<AiResponse>("/api/chat", {
        prompt,
        conversationId: conversationId.current,
      });
      console.log(data.reply);
      setMessages((prevMessages) => [
        ...prevMessages,
        { by: "bot", content: data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full mx-5">
      <div className="flex flex-col gap-4 flex-1 chat-scroll overflow-y-auto mb-2 rounded-lg lg:px-[10%] ">
        <ChatMessages messages={messages} />

        {isBotTyping && <TypingIndicator />}
        {error && <ErrorMessage message={error} />}
      </div>
      <ChatInput OnSubmit={OnSubmit} isBotTyping={isBotTyping} />
    </div>
  );
};

export default ChatBot;
