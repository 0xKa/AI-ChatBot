import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";

const ChatBot = () => {
  return (
    <div className="flex flex-col gap-2 items-end border-2 rounded-3xl p-2 m-5">
      <textarea
        placeholder="Ask Anything..."
        className="w-full resize-none p-3 border-3 focus:outline-0 rounded-md "
        maxLength={200}
      ></textarea>
      <Button className="rounded-full w-10 h-10 hover:bg-gray-500">
        <FaArrowUp />
      </Button>
    </div>
  );
};

export default ChatBot;
