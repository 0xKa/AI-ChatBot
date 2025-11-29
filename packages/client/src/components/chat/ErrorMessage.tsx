type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="max-w-[85%] px-4 py-2 mx-7 rounded-lg border wrap-break-word self-start bg-red-100 text-red-800 border-red-300">
      {message}
    </div>
  );
};

export default ErrorMessage;
