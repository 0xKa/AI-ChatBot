import TypingIndicator from "./chat/TypingIndicator";
import ChatMessages from "./chat/ChatMessages";
import ErrorMessage from "./chat/ErrorMessage";
import ChatInput from "./chat/ChatInput";
import useChatSession from "@/hooks/useChatSession";

const ChatBot = () => {
  const { messages, isBotTyping, error, submitChatMessage } = useChatSession();

  return (
    <div className="flex flex-col h-full mx-5">
      <div className="flex flex-col gap-4 flex-1 chat-scroll overflow-y-auto mb-2 rounded-lg lg:px-[10%] ">
        <ChatMessages messages={messages} />
        {isBotTyping && <TypingIndicator />}
        {error && <ErrorMessage message={error} />}
      </div>
      <ChatInput OnSubmit={submitChatMessage} isBotTyping={isBotTyping} />
    </div>
  );
};

export default ChatBot;
