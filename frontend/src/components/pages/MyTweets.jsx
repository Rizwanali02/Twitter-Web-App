import React, { useEffect } from "react";
import useGetMyTweets from "../../hooks/tweetHook/useGetMyTweets";
import useLikeOrDislike from "../../hooks/tweetHook/useLikeOrDislike";
import Avatar from "react-avatar";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_END_POINT } from "../../utils/constant";
import toast from "react-hot-toast";

const MyTweets = ({ id }) => {
  const { myTweets } = useSelector((store) => store.tweets);
  const { user, profile, token } = useSelector((store) => store.user);
  const { likeDisLike } = useLikeOrDislike();

  const { fetchMyTweets } = useGetMyTweets();

  useEffect(() => {
    fetchMyTweets({ id });
  }, [id]);

  const likeAndDislike = async (tweetId) => {
    await likeDisLike({ id: tweetId });
    await fetchMyTweets({ id });
  };

  const deleteTweet = async (tweetId) => {
    const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${tweetId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      console.log(`tweet Deleted`,res);
      toast.success(res.data.message);
      await fetchMyTweets({ id });
    }
  };

  return (
    <div>
      {myTweets?.map((tweet) => {
        //find if user is already liked tweet and change like btn background!
        const isLiked = tweet.like.includes(user._id);
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
                <p className="font-bold">{tweet.userDetails[0].name}</p>
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
                  className={`text-blue-500 flex gap-1 items-center hover:text-blue-700 `}
                >
                  <CiHeart size={"30px"} color={isLiked ? "red" : "pink"}/>
                  <span>{tweet.like?.length}</span>
                </button>
              </div>
              <div className="flex items-center">
                <button className="text-blue-500 flex gap-1 items-center hover:text-blue-700">
                  <CiBookmark size={"25px"} color="gray" />
                  <span>2</span>
                </button>
              </div>
              {user._id === profile._id && (
                <div className="flex items-center">
                  <button className="btn-danger btn">
                    <MdDelete
                      size={25}
                      onClick={() => deleteTweet(tweet._id)}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyTweets;
