import { useState } from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  const [userAuth, setUserAuth] =  useState(false)
  return (
    <nav className="bg-[#ffffff] flex w-full items-center h-6 border-b-2 border-blue-300 p-2">
      <div className="w-1/4">
        <h1>LOGO</h1>
      </div>
      <ul className="flex justify-around w-3/4  ">
        {/* <li>
          <Link to="/">Home</Link>
        </li> */}
        <li>
          <Link to="/create-post">Create</Link>
        </li>
        <li>
          <Link to="/list-posts">All Post</Link>
        </li>
        <li>
          <Link to="/list-posts">Sign In</Link>
        </li>
        <li>
          <Link to="/list-posts">Register</Link>
        </li>

        {userAuth && (
          <li>
            <Link to="/list-posts">Sign Out</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PublicNavbar;
