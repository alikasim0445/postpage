// frontend/src/components/ResetPassword.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8888/api/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="container mx-auto py-4 min-h-[459px]">
      <h1 className="text-3xl font-bold text-center mb-4">Reset Password</h1>
      <form
        onSubmit={handleResetPassword}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Reset Password
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
