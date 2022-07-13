import React from "react";
import Post from "./Post";
import axios from "axios";

function ListPosts({ posts }) {
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
