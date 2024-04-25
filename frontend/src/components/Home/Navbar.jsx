import axios from "axios";
import React from "react";
import Avatar from "react-avatar";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../redux/userSlice";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch } from "react-redux";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  const reloadWindow = () => {
    setTimeout(() => {
      window.location.reload();
      console.log(`Window reloaded`);
    }, 2000);  
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        dispatch(getUser(null)); 
        navigate("/login");      
        toast.success(res.data.message);  
        reloadWindow();          
      }
    } catch (error) {
      console.error(error.response.data.message); 
      toast.error(error.response.data.message);
    }
  };
  
  return (
    <>
      {/* mobile navbar only show on mobile screens */}
      <div>
        <Link
          to={`/profile/${user?._id}`}
          className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
        >
          <div>
            <Avatar src={user?.profilePic} size="40" round={true} />
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
        <Link
          onClick={handleLogout}
          className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
        >
          <div>
            <FaSignOutAlt size={"30px"} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
