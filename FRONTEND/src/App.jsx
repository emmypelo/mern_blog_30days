import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./components/posts/CreatePost";
import FetchPost from "./components/posts/FetchPost";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PostDetails from "./components/posts/postDetails";

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<p>HOME</p>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/list-posts" element={<FetchPost />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
