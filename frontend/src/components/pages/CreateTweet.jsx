import { useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import usePostTweet from "../../hooks/tweetHook/usePostTweet";

const CreateTweet = ({ activeSection, toggleSection }) => {
  const { user } = useSelector((store) => store.user);
  const [description, setDescription] = useState("");
  const { postTweet, loading } = usePostTweet();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    postTweet({ description });
    setDescription("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-evenly border-b border-gray-200">
        <div
          onClick={() => toggleSection("forYou")}
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            activeSection === "forYou" ? "bg-gray-200" : ""
          }`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
        </div>
        <div
          onClick={() => toggleSection("following")}
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            activeSection === "following" ? "bg-gray-200" : ""
          }`}
        >
          <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
        </div>
      </div>

      {activeSection === "following" && (
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
