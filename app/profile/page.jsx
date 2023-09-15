"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userid");
  useEffect(() => {
    (async () => {
      const response = await fetch(`api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    })();
  }, [session]);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?",
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={session?.user.id === userId ? "My" : posts[0]?.creator.username}
      desc={
        session?.user.id === userId
          ? "welcome to your personalized profile page"
          : `welcome to ${posts[0]?.creator.username || " "} profile page`
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
