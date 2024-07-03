// frontend/src/components/ForgotPassword.jsx
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", email);
    try {
      const response = await fetch(
        "http://localhost:8888/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      console.log(data.message);
      setMessage(data.message);
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      setMessage("Error sending request");
    }
  };

  return (
    <div className="container mx-auto py-4 min-h-[459px]">
      <h1
        className={`text-3xl font-bold text-center mb-4 ${
          theme === "dark" ? "text-slate-800" : "text-black"
        }`}
      >
        Forgot Password
      </h1>
      <form
        onSubmit={handleForgotPassword}
        className={`max-w-md mx-auto  p-6 rounded-lg shadow-md ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-slate-400 text-slate-800"
        }`}
      >
        <div className="mb-4">
          <label
            className="block dark:text-gray-700 font-bold mb-2 white:text-slate-200"
            htmlFor="email "
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Send Reset Link
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
