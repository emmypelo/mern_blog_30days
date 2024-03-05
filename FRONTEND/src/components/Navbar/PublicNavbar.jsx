import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/create-post">Create</Link>
          </li>
          <li>
            <Link to="/list-posts">List All</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavbar;
