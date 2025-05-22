import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import moment from "moment";

const ChatBody = () => {
  const { messages } = useChat();
  const { user } = useSelector((store) => store.user);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4  text-white">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No messages yet</div>
      ) : (
        messages.map((msg) => {
          const isSender = msg.senderId === user._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm px-4 py-3 rounded-xl shadow-md ${
                  isSender
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-800 text-white rounded-bl-none"
                }`}
              >
                {/* Message Text */}
                <div className="text-sm whitespace-pre-wrap">{msg.message}</div>
                {/* this code is commented bcz iam not show profile icon and name  */}
                {/* {!isSender && (
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar name={msg.senderName} size="30" round />
                    <span className="text-xs text-gray-400">
                      {moment(msg.createdAt).format("hh:mm A")}
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatBody;
