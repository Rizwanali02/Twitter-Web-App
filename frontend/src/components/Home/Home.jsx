import React from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import { Outlet } from "react-router-dom";
import BottomBar from "./BottomBar";

const Home = () => {
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
