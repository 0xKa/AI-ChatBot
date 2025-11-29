import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import TypingIndicator from "./chat/TypingIndicator";

type FormData = {
  prompt: string;
};

type AiResponse = {
  reply: string;
};

type Message = {
  by: "user" | "bot";
  content: string;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [error, setError] = useState<string>("");
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const OnSubmit = async ({ prompt }: FormData) => {
    try {
      reset({ prompt: "" });
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

  const OnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isBotTyping) handleSubmit(OnSubmit)();
    }
  };

  const CopyCleanMessage = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col h-full mx-5">
      <div className="chat-scroll flex flex-col gap-4 flex-1 overflow-y-auto mb-1 p-3 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`max-w-[85%] px-4 py-2 mx-7 rounded-lg border wrap-break-word
        ${
          message.by === "user"
            ? "self-end bg-primary text-primary-foreground border-primary/40"
            : "self-start bg-muted text-foreground border-border dark:bg-accent dark:border-accent/40"
        }`}
          >
            <div className="markdown" onCopy={CopyCleanMessage}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isBotTyping && <TypingIndicator />}

        {error && (
          <div className="max-w-[85%] px-4 py-2 mx-7 rounded-lg border wrap-break-word self-start bg-red-100 text-red-800 border-red-300">
            {error}
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        onKeyDown={OnKeyDown}
        className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2 "
      >
        <textarea
          {...register("prompt", {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          maxLength={200}
          autoFocus
          placeholder="Ask Anything..."
          className="w-full resize-none p-3 border-0 focus:outline-0 rounded-md "
        ></textarea>
        <Button
          disabled={formState.isSubmitting || !formState.isValid || isBotTyping}
          className="rounded-full w-10 h-10 hover:bg-gray-500"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
