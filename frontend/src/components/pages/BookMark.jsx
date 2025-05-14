import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useGetBookmark from "../../hooks/tweetHook/useGetBookmark";
import useLikeOrDislike from "../../hooks/tweetHook/useLikeOrDislike";
import useBookmark from "../../hooks/tweetHook/useBookmark";
import { useSelector } from "react-redux";

const BookMark = () => {
  const { user } = useSelector((store) => store.user);
  const { getBookmarkTweet } = useGetBookmark();
  const [bookmarks, setBookmarks] = useState([]);
  const { likeDisLike } = useLikeOrDislike();
  const { bookmarkTweet } = useBookmark();

  const fetchBookmarks = async () => {
    const data = await getBookmarkTweet();
    if (data) setBookmarks(data);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const likeAndDislike = async (id) => {
    await likeDisLike({ id });
    fetchBookmarks();
  };
  const handleBookmarkTweet = async (tweetId) => {
    await bookmarkTweet({ tweetId });
    fetchBookmarks();
  };
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {bookmarks?.map((tweet) => {
        const isLiked = tweet.like.includes(user?._id);
        return (
          <div key={tweet._id} className="w-full border-b border-gray-200 px-4 pt-4 pb-6">
            <div className="flex items-start gap-3">
              <Avatar src={tweet.userId.profilePic} size="50" round={true} />
              <div className="flex flex-col w-full">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{tweet.userId.name}</p>
                  <p className="text-gray-500 text-sm">
                    @{tweet.userId.username}
                  </p>
                </div>

                <p className="mt-2 text-sm">{tweet.description}</p>

                <div className="flex gap-6 mt-3 text-gray-600 text-sm">
                  <button className="flex items-center gap-1 ">
                    <CiHeart
                      size={20}
                      color={isLiked ? "red":"black"}
                      onClick={() => likeAndDislike(tweet._id)}
                    />
                    <span>{tweet.like.length}</span>
                  </button>
                  <button className="flex items-center gap-1 text-red-500">
                    <CiBookmark
                      onClick={() => handleBookmarkTweet(tweet._id)}
                      size={20}
                    />
                    <span>{tweet.isBookmarks?.length || 0}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookMark;
