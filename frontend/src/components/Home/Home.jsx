import React, { useEffect } from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import BottomBar from "./BottomBar";
import { useSelector } from "react-redux";

const Home = () => {
  const {user}=useSelector(store=>store.user)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user) navigate("/login");
  },[])
  return (
    <div className="sm:flex justify-between sm:w-[80%] mx-auto mb-1">
      <LeftSideBar />
      <Outlet />
      <BottomBar />
      <RightSideBar />
    </div>
  );
};

export default Home;
