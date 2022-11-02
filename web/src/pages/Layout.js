import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/server">To Server</Link>
          </li>
          <li>
            <Link to="/manager">To Manager</Link>
          </li>
          <li>
            <Link to="/login">To Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
