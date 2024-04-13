import { useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import usePostTweet from "../../hooks/tweetHook/usePostTweet";
import { getIsActiveTab } from "../../redux/tweetSlice";

const CreateTweet = ({}) => {
  const { user } = useSelector((store) => store.user);
  const { isActiveTab } = useSelector((store) => store.tweets);
  const [description, setDescription] = useState("");
  const { postTweet, loading } = usePostTweet();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    postTweet({ description });
    setDescription("");
  };
  const forYouTab = () => {
    dispatch(getIsActiveTab(true));
  };
  const followingYouTab = () => { 
    dispatch(getIsActiveTab(false));
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly border-b border-gray-200">
        <div
          onClick={forYouTab}
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            isActiveTab === true ? "bg-gray-200" : ""
          }`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
        </div>
        <div
          onClick={followingYouTab}
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            !isActiveTab ? "bg-gray-200" : ""
          }`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
        </div>
      </div>

      {isActiveTab === true && (
        <form onSubmit={handleSubmit}>
          <div className="hidden md:block">
            <div className="flex items-center p-4">
              <div>
                <Avatar src={user?.profilePic} size="40" round={true} />
              </div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full outline-none border-none text-xl ml-2"
                placeholder="What is happening?!"
              />
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <button
                type="submit"
                className="bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTweet;
