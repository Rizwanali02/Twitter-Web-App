const MessageBubble = ({ message, isSender }) => {
  return (
    <div
      className={`max-w-xs px-4 py-2 rounded-lg text-white ${
        isSender ? "bg-blue-500 self-end ml-auto" : "bg-gray-500 self-start mr-auto"
      }`}
    >
      {message.message}
    </div>
  );
};

export default MessageBubble;
