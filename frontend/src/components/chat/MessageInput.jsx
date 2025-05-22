import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import axios from "axios";
import { useSelector } from "react-redux";
import { SOCKET_API_END_POINT } from "../../utils/constant";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { selectedChat, socket, setMessages } = useChat();
  const { token } = useSelector((store) => store.user);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      `${SOCKET_API_END_POINT}/api/v3/message/send/${selectedChat._id}`,
      { message: text },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const newMessage = res.data.newMessage;
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", newMessage);
    setText("");
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white px-4 py-3 border-t flex items-center z-10">
  <input
    type="text"
    className="flex-grow rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    placeholder="Type your message..."
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />
  <button
    onClick={sendMessage}
    className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
  >
    Send
  </button>
</div>

  );
};

export default MessageInput;
