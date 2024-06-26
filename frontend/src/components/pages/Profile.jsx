import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Avatar from "react-avatar";
import useProfile from "../../hooks/userHook/useProfile";
import { useSelector } from "react-redux";
import { useFollowAndUnfollow } from "../../hooks/userHook/useFollowAndUnfollow";
import MyTweets from "./MyTweets";

const Profile = () => {
  const { profile, user } = useSelector((store) => store.user);
  const { id } = useParams();
  const { fetchProfile, loadingProfile } = useProfile();

  useEffect(() => {
    fetchProfile({ id });
  }, [id]);

  const { fetchFollowAndUnfollow } = useFollowAndUnfollow();

  const [loading, setLoading] = useState(false);

  const isFollowing = profile?.followers?.includes(user._id);
  console.log("Is logged-in user following the profile:", isFollowing);

  const handleFollowAndUnFollow = async () => {
    setLoading(true);
    try {
      await fetchFollowAndUnfollow({ id });
      await fetchProfile({ id });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
            <p className="text-gray-500 text-sm">post</p>
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
          {profile?._id === user?._id ? (
            <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollowAndUnFollow}
              className={`px-4 py-1 bg-black text-white rounded-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="sm:mt-16 ml-4 mt-10">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p className="mt-2">@{profile?.username}</p>
          <div className="flex gap-2">
            <p className="hover:underline hover:cursor-pointer">
              {profile?.followers?.length} Followers
            </p>
            <p className="hover:underline hover:cursor-pointer ">
              {profile?.following?.length} Following
            </p>
          </div>
        </div>

        <div className="m-4 text-sm">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
          </p>
          <MyTweets id={id}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
