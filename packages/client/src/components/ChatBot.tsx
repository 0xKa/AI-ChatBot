import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  const OnSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  const OnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(OnSubmit)();
    }
  };

  return (
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
  );
};

export default ChatBot;
