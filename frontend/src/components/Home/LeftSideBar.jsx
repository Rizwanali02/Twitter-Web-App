import React from "react";
import { CiHome, CiUser, CiBookmark, CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";
import { getUser } from "../../redux/userSlice";
import Navbar from "./Navbar";

const LeftSideBar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        dispatch(getUser(null));
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error.data.message);
    }
  };

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
          <div
            onClick={handleLogout}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <FaSignOutAlt size={"24px"} />
            </div>
            <h1 className="text-lg ml-2">Logout</h1>
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
        <Navbar user={user} />
      </div>
    </>
  );
};

export default LeftSideBar;
