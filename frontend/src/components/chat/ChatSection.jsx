import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";
import { useChat } from "../../context/ChatContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SOCKET_API_END_POINT, USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";

const ChatSection = () => {
  const { id } = useParams();
  const { setSelectedChat, setMessages, socket } = useChat();
  const { token } = useSelector((store) => store.user);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedChat(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMessages = async () => {
    const res = await axios.get(
      `${SOCKET_API_END_POINT}/api/v3/message/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessages(res.data);
  };
  useEffect(() => {
    fetchUserData();
    fetchMessages();
    if (!socket) return;

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("newMessage");
  }, [id, socket]);
  return (
    <div className="flex flex-col w-full h-screen relative">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto">
        <ChatBody />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatSection;
