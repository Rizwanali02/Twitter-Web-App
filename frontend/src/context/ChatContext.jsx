import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SOCKET_API_END_POINT } from "../utils/constant";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useSelector((store) => store.user);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_API_END_POINT, {
      query: {
        userId:user?._id,
      },
    });
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat, onlineUsers, socket ,messages, setMessages}}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
