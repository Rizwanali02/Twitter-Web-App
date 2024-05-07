import React from "react";
import Avatar from "react-avatar";
import { CiHeart, CiBookmark } from "react-icons/ci";
import useGetAllTweet from "../../hooks/tweetHook/useGetAllTweet";
import { useSelector } from "react-redux";
import useLikeOrDislike from "../../hooks/tweetHook/useLikeOrDislike";
import {Link} from 'react-router-dom';

const Tweet = () => {
  const { user } = useSelector((store) => store.user);
  const { tweets } = useSelector((store) => store.tweets);
  const id = user?._id;

  if (id) {
    useGetAllTweet({ id });
  }

  const { likeDisLike } = useLikeOrDislike();

  const likeAndDislike = async (id) => {
    await likeDisLike({ id });
  };

  return (
    <div>
      {tweets?.map((tweet) => {
        //find if user is already liked tweet and change like btn background!
        const isLiked = tweet.like.includes(id);
        return (
          <div
            key={tweet._id}
            className="max-w-full p-4 md:border-b h-52 sm:h-52"
          >
            <div className="flex items-center">
              <Avatar
                src={tweet.userDetails[0].profilePic}
                size="50"
                round={true}
              />
              <div className="flex mb-4 mx-2 gap-1">
                <Link  to={`/profile/${tweet.userDetails[0]._id}`} className="font-bold">{tweet.userDetails[0].name}</Link>
                <p className="text-gray-600">
                  @{tweet.userDetails[0].username}
                </p>
              </div>
            </div>
            <p className="mt-4">{tweet.description}</p>
            <div className="flex justify-evenly mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => likeAndDislike(tweet._id)}
                  className={` text-blue-500 flex gap-1 items-center hover:text-blue-700`}
                >
                  <CiHeart
                    size={"30px"}
                    color={isLiked ? "red":"black"}
                    className={`hover:bg-pink-200 rounded-full cursor-pointer `}
                  />
                </button>
                <span>{tweet.like?.length}</span>
              </div>
              <div className="flex items-center">
                <button className="text-blue-500 flex gap-1 items-center hover:text-blue-700">
                  <CiBookmark size={"25px"} color="gray" />
                </button>
                <span>2</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tweet;
