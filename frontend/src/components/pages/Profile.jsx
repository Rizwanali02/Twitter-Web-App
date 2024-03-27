import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar";
import useProfile from "../../hooks/useProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const { profile } = useSelector((store) => store.user);
  const { id } = useParams();
  useProfile({ id });

  return (
    <div className="w-full md:w-[50%] border-l border-r border-gray-200 mb-20 ">
      <div>
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.username}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"
          alt="banner"
          className="w-full"
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar src={profile?.profilePic} size="120" round={true} />
        </div>
        <div className="text-right m-4">
          <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
            Edit Profile
          </button>

          <button className="px-4 py-1 bg-black text-white rounded-full">
            Following
          </button>
        </div>
        <div className="sm:mt-16 ml-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
            Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me
            on this coding journey! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eveniet nobis omnis, veniam quis ex, voluptatum
            officia nesciunt amet voluptatibus odit reiciendis recusandae dolor,
            assumenda quasi earum architecto. Porro asperiores nisi animi ipsa
            ipsam enim voluptatum mollitia? Ex soluta id, excepturi quo placeat
            repellendus doloribus quod reprehenderit tempore sit minus dolore
            ipsam fuga vitae ducimus ullam necessitatibus rerum odit error, ea
            illum enim. Nulla soluta voluptatem minus doloremque magnam numquam
            totam quo fugit cupiditate porro dolorum voluptatum, reprehenderit
            autem nobis hic inventore accusantium sunt nisi ipsam quaerat? Ab
            quas dolores corporis quod, culpa voluptatum iure esse
            exercitationem, est magni asperiores? Reiciendis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
