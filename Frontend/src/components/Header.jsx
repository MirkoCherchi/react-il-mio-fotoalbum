import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../components/Auth/Context";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-black text-white py-4 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo o nome dell'app */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-3xl font-bold ${
              isActive
                ? "text-teal-300 border-b-2 border-white"
                : "text-teal-400 hover:text-teal-500"
            } transition-colors duration-300`
          }
        >
          Photo App
        </NavLink>

        <nav className="flex items-center space-x-6">
          {/* Link per il profilo utente */}
          {isAuthenticated && user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-lg transition-colors duration-300 ${
                  isActive
                    ? "text-teal-300 border-b-2 border-white"
                    : "hover:text-teal-500"
                }`
              }
            >
              {/* Immagine profilo circolare con bordo */}
              {user.img_path && (
                <img
                  className="rounded-full h-10 w-10 border-2 border-teal-400"
                  src={user.img_path}
                  alt="Immagine profilo"
                />
              )}
              {/* Nome dell'utente con font-bold */}
              <span className="font-bold">{user.name}</span>
            </NavLink>
          )}

          {/* Altri link nell'header */}
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-lg transition-colors duration-300 ${
                    isActive
                      ? "text-teal-300 border-b-2 border-white"
                      : "hover:text-teal-500"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-lg transition-colors duration-300 ${
                      isActive
                        ? "text-teal-300 border-b-2 border-white"
                        : "hover:text-teal-500"
                    }`
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-lg transition-colors duration-300 ${
                      isActive
                        ? "text-teal-300 border-b-2 border-white"
                        : "hover:text-teal-500"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-lg transition-colors duration-300 hover:text-teal-300"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-lg transition-colors duration-300 ${
                    isActive
                      ? "text-teal-300 border-b-2 border-white"
                      : "hover:text-teal-500"
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
