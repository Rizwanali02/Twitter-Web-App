import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import useGetOtherUsers from "../../hooks/userHook/useGetOtherUsers";
import { useSelector } from "react-redux";

const RightSideBar = () => {
  const { user, otherUsers } = useSelector((store) => store.user);
  const { fetchOtherUsers, loading } = useGetOtherUsers();

  useEffect(() => {
    if (user?._id) {
      fetchOtherUsers();
    }
  }, [user?._id]); 

  return (
    <div className="w-full md:w-[25%] pt-3 md:block hidden">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <CiSearch size="20px" />
        <input
          type="text"
          className="bg-transparent outline-none px-2"
          placeholder="Search"
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center my-4">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-2xl my-4">
          <h1 className="font-bold text-lg">Who to follow</h1>
          {otherUsers?.map((otherUser) => (
            <div
              key={otherUser._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <Avatar size="40" src={otherUser?.profilePic} round={true} />
                <div className="ml-2">
                  <h1 className="font-bold">{otherUser?.name}</h1>
                  <p className="text-sm">@{otherUser?.username}</p>
                </div>
              </div>
              <Link to={`/profile/${otherUser?._id}`}>
                <button className="px-4 py-1 bg-black text-white rounded-full">
                  Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
