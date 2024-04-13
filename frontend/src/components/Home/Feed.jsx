import React from "react";
import CreateTweet from "../pages/CreateTweet";
import Tweet from "../pages/Tweet";

const Feed = () => {

  return (
    // <div className="w-full sm:w-[50%] sm:border mb-16">
    //   <CreateTweet
    //     toggleSection={toggleSection}
    //     activeSection={activeSection}
    //   />
    //   {activeSection === "following" ? (
    //     <Tweet activeSection={activeSection} />
    //   ) : (
    //     <Tweet activeSection={activeSection} />
    //   )}
    // </div>
    <div className="w-full sm:w-[50%] sm:border mb-16">
      <CreateTweet />

      <Tweet />
    </div>
  );
};

export default Feed;
