"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// a helper component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div>
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState();
  const handleSearchChange = (e) => {};
  //get the data
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search for a tag or a username"
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
