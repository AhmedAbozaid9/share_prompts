"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// a helper component
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-10 prompt_layout">
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
  const [posts, setPosts] = useState([]);
  //get the data
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    })();
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (post.creator.username.includes(searchText)) return true;
    if (post.prompt.includes(searchText)) return true;
    if (post.tag.includes(searchText)) return true;
  });
  const handleTagClick = (tag) => {
    setSearchText(tag);
  };
  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search for a tag or a username"
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
