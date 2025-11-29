import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FaArrowUp } from "react-icons/fa6";

export type ChatFormData = {
  prompt: string;
};

type Props = {
  OnSubmit: (data: ChatFormData) => void;
  isBotTyping: boolean;
};

const ChatInput = ({ OnSubmit, isBotTyping }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

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
  );
};

export default ChatInput;
