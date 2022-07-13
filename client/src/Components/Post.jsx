import React from "react";
import Comments from "./Comments";

function Post({ post }) {
  return (
    <div className="p-4 m-3 bg-slate-700 rounded-md">
      <div className="font-medium text-2xl">{post.post}</div>
      <Comments id={post.id} comments={post.comments} />
    </div>
  );
}

export default Post;
