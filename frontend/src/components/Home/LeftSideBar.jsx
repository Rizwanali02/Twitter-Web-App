import React from "react";
import { CiHome, CiUser, CiBookmark, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const LeftSideBar = () => {
  const { user } = useSelector((store) => store.user);
  return (
    <>
      <div className="sm:w-[20%] pt-3 hidden md:block">
        <div>
          <div className="px-4">
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
              alt="twitter logo"
              className="w-[24px] "
            />
          </div>
          <div>
            <Link
              to={"/"}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
            >
              <div>
                <CiHome size={"24px"} />
              </div>
              <h1 className="text-lg ml-2">Home</h1>
            </Link>
          </div>
          <div>
            <Link
              to={`/profile/${user?._id}`}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
            >
              <div>
                <CiUser size={"24px"} />
              </div>
              <h1 className=" text-lg ml-2">Profile</h1>
            </Link>
          </div>
          <div>
            <Link
              to={"/bookmark"}
              className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
            >
              <div>
                <CiBookmark size={"24px"} />
              </div>
              <h1 className=" text-lg ml-2">Bookmark</h1>
            </Link>
          </div>
          <div>
            <Link className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
              <div>
                <FaSignOutAlt size={"24px"} />
              </div>
              <h1 className="text-lg ml-2">Logout</h1>
            </Link>
          </div>
          <div>
            <Link className="flex items-center justify-center my-2 px-4 py-2 bg-custumBlueBg hover:bg-[#218bd1] hover:cursor-pointer rounded-full">
              <div className="text-white font-bold">Post</div>
            </Link>
          </div>
        </div>
      </div>

      {/* mobile screen laypit */}
      <div className="sm:hidden flex justify-between">
        <div>
          <Link
           to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <Avatar src="/images/download.jpeg" size="40" round={true} />
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link to={"/"}>
            <img
              src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
              alt="twitter logo"
              className="w-8 h-auto object-cover object-center  hover:cursor-pointer rounded-full"
            />
          </Link>
        </div>
        <div>
          <Link className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <FaSignOutAlt size={"30px"} />
            </div>
          </Link>
        </div>
      </div>
      
    </>
  );
};

export default LeftSideBar;
