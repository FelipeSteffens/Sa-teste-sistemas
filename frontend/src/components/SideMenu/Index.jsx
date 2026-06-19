import { NavLink, useNavigate } from "react-router";
import { MdDashboard, MdExitToApp, MdMenu, MdClose } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const SideMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`h-screen bg-cyan-800 text-white flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-cyan-700">
        {!isCollapsed && <h1 className="text-lg font-bold">Catálogo</h1>}
        <button
          onClick={toggleMenu}
          className="text-white hover:text-cyan-300 focus:outline-none"
        >
          {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 ${isActive ? "text-cyan-300" : "text-white"}`
              }
            >
              <MdDashboard size={20} />
              {!isCollapsed && <span>Início</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/celulares"
              className={({ isActive }) =>
                `flex items-center gap-3 ${isActive ? "text-cyan-300" : "text-white"}`
              }
            >
              <FaMobileAlt size={20} />
              {!isCollapsed && <span>Celulares</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-cyan-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-300 hover:text-red-500 w-full cursor-pointer"
        >
          <MdExitToApp size={20} />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
