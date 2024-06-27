// Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/Auth/Context"; // Assicurati che il percorso sia corretto

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  return (
    <header className="bg-black text-beige py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">
          Photo App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-teal">
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/admin" className="hover:text-teal">
                  Admin
                </Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/login" className="hover:text-teal">
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-teal cursor-pointer"
                >
                  Logout
                </button>
              </li>
            )}
            <li>
              <Link to="/contact" className="hover:text-teal">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
