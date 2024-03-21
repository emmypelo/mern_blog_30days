import "./index.css";
import "./App.css";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./components/posts/CreatePost";
import FetchPost from "./components/posts/FetchPost";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PostDetails from "./components/posts/postDetails";
// import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<p>HOME</p>} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/list-posts" element={<FetchPost />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={< Register/>} />
        <Route path="/posts/:postId" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
