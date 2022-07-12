import AddPost from "./Components/AddPost";
import ListPosts from "./Components/ListPosts";

function App() {
  return (
    <div className="">
      <div className="w-full bg-slate-600 h-[80px] flex items-center">
        <div className="text-3xl px-5 font-extrabold">Blogger</div>
      </div>
      <div className="container mx-auto">
        <AddPost />
        <ListPosts />
      </div>
    </div>
  );
}

export default App;
