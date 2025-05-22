import React from "react";
import { BiChat } from "react-icons/bi";
import { CiHome,  CiBookmark, CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoChatbubblesOutline } from "react-icons/io5"
const BottomBar = () => {
  return (
    <>
      <div className="sm:hidden fixed bottom-0 w-full bg-[#f5f2f2] flex justify-between">
        <div>
          <Link
            to={"/"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiHome size={"30px"} />
            </div>
          </Link>
        </div>

        <div>
          <Link to={"/chat"} className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <IoChatbubblesOutline   size={"30px"} />
            </div>
          </Link>
        </div>
        <div>
          <Link className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiSearch   size={"30px"} />
            </div>
          </Link>
        </div>

        <div>
          <Link
            to={"/bookmark"}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiBookmark size={"30px"} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BottomBar;
