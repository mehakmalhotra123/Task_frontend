import {
  FaTasks,
  FaProjectDiagram,
  FaChartBar,
} from "react-icons/fa";
import {
  useAuth,
} from "../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";
import {
  Link,
} from "react-router-dom";

const Sidebar = () => {
const { logout } = useAuth();

const navigate =
  useNavigate();

  const logoutHandler = () => {
  logout();

  navigate("/login");
};

  return (
    <div
      className="
      w-64
      bg-slate-900
      border-r
      border-slate-800
      h-screen
      p-5
      "
    >

      <h1
        className="
        text-2xl
        font-bold
        text-indigo-500
        mb-10
        "
      >
        TeamFlow
      </h1>

      <nav
        className="
        flex
        flex-col
        gap-5
        "
      >

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <FaChartBar />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3"
        >
          <FaProjectDiagram />
          Projects
        </Link>

        {/* <Link
          to="/tasks"
          className="flex items-center gap-3"
        >
          <FaTasks />
          Tasks
        </Link> */}

        <button
  onClick={logoutHandler}
  className="
  mt-10
  bg-red-600
  py-2
  rounded
  "
>
  Logout
</button>

      </nav>

    </div>
  );
};

export default Sidebar;