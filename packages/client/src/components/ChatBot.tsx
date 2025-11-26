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

const ChatBot = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const conversationId = useRef(crypto.randomUUID());
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  const OnSubmit = async ({ prompt }: FormData) => {
    reset();
    console.log(prompt);
    setMessages((prevMessages) => [...prevMessages, prompt]);

    const { data } = await axios.post<AiResponse>("/api/chat", {
      prompt,
      conversationId: conversationId.current,
    });
    console.log(data.reply);
    setMessages((prevMessages) => [...prevMessages, data.reply]);
  };

  const OnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(OnSubmit)();
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            className="p-4 m-4 mx-9 border border-gray-500 rounded-md"
          >
            {message}
          </div>
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
