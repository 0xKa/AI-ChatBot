const Dot = ({ delayInMs }: { delayInMs: number }) => (
  <span
    className={`h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:${delayInMs}ms]`}
  ></span>
);

const TypingIndicator = () => {
  return (
    <div className="max-w-[85%] px-4 py-2 mx-7 rounded-lg border wrap-break-word self-start bg-muted text-foreground border-border dark:bg-accent/30 dark:border-accent/40">
      <div className="flex items-center gap-3">
        <div className="flex gap-1" aria-label="Loading">
          <Dot delayInMs={0} />
          <Dot delayInMs={150} />
          <Dot delayInMs={300} />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
