import React from "react";
import { useState } from "react";
import axios from "axios";

function AddPost() {
  const [post, setPost] = useState("");

  const addPost = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", { post });
    setPost("");
  };

  return (
    <div className="p-5 m-2 rounded-md bg-[#ab8ae99a] flex flex-col">
      <div className="text-3xl font-bold m-1"> Add Posts </div>
      <div className="my-3 flex flex-col w-5/12">
        <input
          className="p-3 bg-transparent border-2 rounded border-white"
          type="text"
          value={post}
          name="post"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          placeholder="todays Post"
        />
        <input
          type="submit"
          onClick={addPost}
          value="Add"
          className="px-3 py-2 m-2 bg-blue-400 text-2xl rounded-md font-semibold"
        />
      </div>
    </div>
  );
}

export default AddPost;
