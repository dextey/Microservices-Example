import { useEffect, useState } from "react";
import AddPost from "./Components/AddPost";
import ListPosts from "./Components/ListPosts";
import axios from "axios";
function App() {
  const [posts, setPosts] = useState({});

  const fetchposts = async () => {
    const posts = await axios.get("http://localhost:4002/posts");
    setPosts(posts.data);
  };
  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <div className="">
      <div className="w-full bg-slate-600 h-[80px] flex items-center">
        <div className="text-3xl px-5 font-extrabold">Blogger</div>
      </div>
      <div className="container mx-auto">
        <AddPost />
        {posts && <ListPosts posts={posts} />}
      </div>
    </div>
  );
}

export default App;
