import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import ThemeToggleButton from "./component/ThemeToggleButton";
import { LanguageContext } from "./context/LanguageContext";
import { AuthContext } from "./context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Nav = () => {
  const { toggleLanguage } = useContext(LanguageContext);
  const { language, translations } = useContext(LanguageContext);
  const { logout } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-sky-950">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8 py-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-white font-mono font-extrabold text-2xl hover:text-slate-300 transition duration-300">
            {translations[language].arada}
          </h1>
        </Link>

        <nav className="flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl lg:hidden"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul
            className={`flex flex-col lg:flex-row items-center lg:space-x-6 transition-transform duration-300 ease-in-out text-white ${
              isOpen ? "block" : "hidden lg:flex"
            }`}
          >
            <li className="my-2 lg:my-0">
              <Link
                to="/"
                className="hover:bg-green-500 active:bg-green-400 px-2 py-1 rounded transition duration-300 border border-transparent hover:border-green-500"
              >
                {translations[language].home}
              </Link>
            </li>
            <li className="my-2 lg:my-0">
              <Link
                to="/about"
                className="hover:bg-green-500 active:bg-green-400 px-2 py-1 rounded transition duration-300 border border-transparent hover:border-green-500"
              >
                {translations[language].about}
              </Link>
            </li>
            <li className="my-2 lg:my-0">
              <Link
                to="/login"
                className="hover:bg-green-500 active:bg-green-400 px-2 py-1 rounded transition duration-300 border border-transparent hover:border-green-500"
              >
                {translations[language].login}
              </Link>
            </li>
            {user && (
              <li className="my-2 lg:my-0">
                <Link
                  to="/"
                  onClick={handleClick}
                  className="hover:bg-green-500 active:bg-green-400 px-2 py-1 rounded transition duration-300 border border-transparent hover:border-green-500"
                >
                  {translations[language].logout}
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div
          className={`flex items-center gap-2 transition-transform duration-300 ease-in-out ${
            isOpen ? "block" : "hidden lg:flex"
          }`}
        >
          <button
            onClick={toggleLanguage}
            className="p-2 bg-gray-700 rounded text-white hover:bg-gray-600 transition duration-300"
          >
            {translations[language].language}
          </button>
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Nav;
