import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type Message = {
  by: "user" | "bot";
  content: string;
};

type Props = {
  messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const CopyCleanMessage = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData("text/plain", selection);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default ChatMessages;
