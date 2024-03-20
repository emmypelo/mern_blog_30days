import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-[#ffffff] flex w-full items-center h-6 border-b-2 border-blue-300 p-2">
      <div className="w-1/3">
        <h1>LOGO</h1>
      </div>
      <ul className="flex justify-around w-2/3  ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create-post">Create</Link>
        </li>
        <li>
          <Link to="/list-posts">List All</Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
