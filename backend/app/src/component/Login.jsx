// components/Login.jsx
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-[459px] ">
      <div
        className={`signin w-1/4 mx-auto mt-10 border-2 rounded-md ${
          theme === "dark"
            ? "bg-slate-800 border-none text-slate-100"
            : " bg-slate-300 text-slate-900"
        } `}
      >
        <h2 className="text-2x text-center text-blue-700 font-bold text-2xl p-10">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-5">
          <div className="form flex flex-col gap-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mx-5 p-2 rounded-md"
            />
          </div>
          <div className="form flex flex-col gap-5">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mx-5 p-2 rounded-md"
            />
          </div>
          <div className="flex justify-between mx-5">
            <Link
              to="/forgot-password"
              className="text-blue-700 font-bold py-1 px-2"
            >
              {translations[language].forgotPassword}
            </Link>
            <Link to="/register" className="text-blue-700 font-bold py-1 px-2">
              {translations[language].signup}
            </Link>
          </div>
          <div className="grid place-items-center border m-5 p-3 rounded-md bg-blue-700 text-white text-2xl font-mono">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
