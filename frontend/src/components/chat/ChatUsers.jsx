import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import Avatar from "react-avatar";

const ChatUsers = () => {
  const [users, setUsers] = useState([]);
  const { user, token } = useSelector((store) => store.user);
  const { onlineUsers, setSelectedChat } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/all/users`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.allUsers); // depends on your API response shape
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSelect = (u) => {
    navigate(`/chat/${u._id}`);
  };

  return (
    <div className="w-full h-full overflow-y-auto border-r p-4 bg-gray-50">
      <h2 className="text-lg font-bold mb-4">All Users</h2>
      <div className="space-y-2">
        {users?.map((u) => {
          const isOnline = onlineUsers.includes(u._id);
          return (
            <div
              key={u._id}
              onClick={() => handleSelect(u)}
              className="flex items-center gap-4 cursor-pointer p-3 rounded hover:bg-gray-200 transition"
            >
              <div className="relative w-10 h-10">
                <Avatar size="40" src={u.profilePic} round={true} />

                {/* Online Dot */}
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>
              <span>{u.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatUsers;
