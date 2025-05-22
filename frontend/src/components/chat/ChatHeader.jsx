import Avatar from "react-avatar";
import { useChat } from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"; // ✅ Importing back icon

const ChatHeader = () => {
  const { selectedChat, onlineUsers } = useChat();
  const isOnline = onlineUsers.includes(selectedChat?._id);
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-6 py-4 border-b bg-white shadow-sm">
      {/* Back Arrow */}
      <button
        onClick={() => navigate("/chat")}
        className="text-gray-600 hover:text-black"
      >
        <BiArrowBack className="text-2xl" />
      </button>

      {/* Avatar with Status Dot */}
      <div className="relative">
        <Avatar size="45" src={selectedChat?.profilePic} round={true} />
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>

      {/* Name and Status */}
      <div>
        <h2 className="text-lg font-semibold">{selectedChat?.name}</h2>
        <p className="text-sm text-gray-500">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatHeader;
