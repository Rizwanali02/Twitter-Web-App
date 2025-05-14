import React from "react";
import Avatar from "react-avatar";
import { CiHeart, CiBookmark } from "react-icons/ci";
import useGetAllTweet from "../../hooks/tweetHook/useGetAllTweet";
import { useSelector } from "react-redux";
import useLikeOrDislike from "../../hooks/tweetHook/useLikeOrDislike";
import {Link} from 'react-router-dom';
import useBookmark from "../../hooks/tweetHook/useBookmark";

const Tweet = () => {
  const { user } = useSelector((store) => store.user);
  const { tweets } = useSelector((store) => store.tweets);
  const id = user?._id;

  if (id) {
    useGetAllTweet({ id });
  }

  const { likeDisLike } = useLikeOrDislike();
  const { bookmarkTweet } = useBookmark();

  const likeAndDislike = async (id) => {
    await likeDisLike({ id });
  };
  const handleBookmarkTweet = async (tweetId) => {
    await bookmarkTweet({ tweetId });
  };

  return (
    <div>
      {tweets?.map((tweet) => {
        //find if user is already liked tweet and change like btn background!
        const isLiked = tweet.like.includes(id);
        const isBookmarked = tweet.isBookmarks?.includes(id);
        return (
          <div
            key={tweet._id}
            className="max-w-full p-4 md:border-b h-52 sm:h-52"
          >
            <div className="flex items-center">
              <Avatar
                src={tweet.userId?.profilePic}
                size="50"
                round={true}
              />
              <div className="flex mb-4 mx-2 gap-1">
                <Link  to={`/profile/${tweet.userId?._id}`} className="font-bold">{tweet.userId?.name}</Link>
                <p className="text-gray-600">
                  @{tweet.userId?.username}
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
                <span>{tweet.like?.length}</span>
                </button>
              </div>
              <div className="flex items-center">
                <button
                onClick={()=>handleBookmarkTweet(tweet._id)} className=" flex gap-1 items-center hover:text-blue-500">
                  <CiBookmark size={"25px"} color={isBookmarked ? "red":""} />
                <span>{tweet.isBookmarks?.length}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tweet;
