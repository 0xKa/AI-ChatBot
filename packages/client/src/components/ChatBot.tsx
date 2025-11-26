import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";
import { useRef, useState } from "react";

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
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  const OnSubmit = async ({ prompt }: FormData) => {
    reset();
    console.log(prompt);
    setMessages((prevMessages) => [
      ...prevMessages,
      { by: "user", content: prompt },
    ]);

    const { data } = await axios.post<AiResponse>("/api/chat", {
      prompt,
      conversationId: conversationId.current,
    });
    console.log(data.reply);
    setMessages((prevMessages) => [
      ...prevMessages,
      { by: "bot", content: data.reply },
    ]);
  };

  const OnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(OnSubmit)();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-10">
        {messages.map((message, index) => (
          <p
            key={index}
            className={`max-w-[85%] px-4 py-2 mx-7 rounded-lg border wrap-break-word
              ${
                message.by === "user"
                  ? "self-start bg-primary text-primary-foreground border-primary/40"
                  : "self-end bg-muted text-foreground border-border dark:bg-accent dark:border-accent/40"
              }`}
          >
            {message.by === "user" ? "You: " : "Bot: "}
            {message.content}
          </p>
        ))}
      </div>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        onKeyDown={OnKeyDown}
        className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2 m-5"
      >
        <textarea
          {...register("prompt", {
            required: true,
            validate: (value) => value.trim().length > 0,
          })}
          placeholder="Ask Anything..."
          className="w-full resize-none p-3 border-0 focus:outline-0 rounded-md "
          maxLength={200}
        ></textarea>
        <Button
          disabled={formState.isSubmitting || !formState.isValid}
          className="rounded-full w-10 h-10 hover:bg-gray-500"
        >
          <FaArrowUp />
        </Button>
      </form>
    </div>
  );
};

export default ChatBot;
