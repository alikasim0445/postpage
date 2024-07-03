// components/Register.jsx
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
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
          Register
        </h2>
        <form onSubmit={handleSubmit} className="form flex flex-col gap-5">
          <div className="form flex flex-col gap-5">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="mx-5 p-2 rounded-md"
            />
          </div>
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
          <div className="flex justify-end mx-5">
            <Link to="/login" className="text-blue-700 font-bold py-1 px-2">
              {translations[language].login}
            </Link>
          </div>
          <div className="grid place-items-center border rounded-md bg-blue-700 m-5 p-3 text-2xl text-white font-mono">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
