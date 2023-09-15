"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  useEffect(() => {
    (async () => {
      if (session?.user.id) {
        const response = await fetch(`api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    })();
  }, []);

  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <Profile
      name="My"
      desc="welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
