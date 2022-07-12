import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${id}/comments`);
    setComments(Object.values(res.data));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${id}/comments`, {
      content: comment,
    });
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="text-xl font-semibold">Comments</div>
        <ul className="font-thin">
          {comments.map((data) => {
            return <li key={data.id}>{data.content}</li>;
          })}
        </ul>
        <div className="my-3 flex ">
          <input
            className="p-3 py-0 bg-transparent border-2 rounded border-white"
            type="text"
            name="comment"
            placeholder="just comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            onClick={addComment}
            type="submit"
            value="Add"
            className="px-2 py-1 m-2 bg-blue-400 text-2xl rounded-md font-semibold"
          />
        </div>
      </div>
    </div>
  );
}

export default Comments;
