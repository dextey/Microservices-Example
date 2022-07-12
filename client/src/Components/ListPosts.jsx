import React from "react";
import Post from "./Post";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
function ListPosts() {
  const [posts, setPosts] = useState({});
  const fetchposts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };
  useEffect(() => {
    fetchposts();
  }, []);
  return (
    <div>
      {posts &&
        Object.values(posts).map((post) => {
          return <Post key={post.id} post={post} />;
        })}
    </div>
  );
}

export default ListPosts;
