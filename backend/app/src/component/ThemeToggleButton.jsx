// src/components/ThemeToggleButton.js
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 text-1xl rounded m-5 ml-20 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } text-${theme === "light" ? "black" : "white"}`}
    >
      {theme === "light" ? (
        <FaMoon className="mr-2" />
      ) : (
        <FaSun className="mr-2" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
