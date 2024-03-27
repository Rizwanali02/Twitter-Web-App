import React, { useState } from "react";
import CreateTweet from "../pages/CreateTweet";
import Tweet from "../pages/Tweet";

const Feed = () => {
  const [activeSection, setActiveSection] = useState("following");

  const toggleSection = (section) => {
    setActiveSection(section);
  };
  return (
    <div className="w-full sm:w-[50%] sm:border mb-16">
      <CreateTweet
        toggleSection={toggleSection}
        activeSection={activeSection}
      />
      {activeSection === "following" ? (
        <Tweet activeSection={activeSection} />
      ) : (
        <Tweet activeSection={activeSection} />
      )}
    </div>
  );
};

export default Feed;
