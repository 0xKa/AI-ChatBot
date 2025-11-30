import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa6";
import { useRef } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  OnSubmit: (data: ChatFormData) => void;
  OnClear: () => void;
  isBotTyping: boolean;
};

const ChatInput = ({ OnSubmit, OnClear, isBotTyping }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const { ref: rhfRef, ...promptReg } = register("prompt", {
    required: true,
    validate: (value) => value.trim().length > 0,
  });

  const submitInput = handleSubmit((data) => {
    reset({ prompt: "" });
    OnSubmit(data);
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isBotTyping) submitInput();
    }
  };

  return (
    <form
      onSubmit={submitInput}
      onKeyDown={handleKeyDown}
      onClick={() => textAreaRef.current?.focus()}
      className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2"
    >
      <textarea
        {...promptReg}
        ref={(el) => {
          rhfRef(el); // give ref to RHF
          textAreaRef.current = el; // keep custom ref for focus
        }}
        maxLength={200}
        autoFocus
        placeholder="Ask Anything..."
        className="w-full resize-none p-3 border-0 focus:outline-0 rounded-md "
      ></textarea>

      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={OnClear}
              disabled={formState.isSubmitting || isBotTyping}
              aria-label="Clear Chat Screen"
              className="rounded-full w-10 h-10 hover:bg-gray-500"
            >
              <AiOutlineClear />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear Chat</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={
                formState.isSubmitting || !formState.isValid || isBotTyping
              }
              className="rounded-full w-10 h-10 hover:bg-gray-500"
            >
              <FaArrowUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send Message</TooltipContent>
        </Tooltip>
      </div>
    </form>
  );
};

export default ChatInput;
