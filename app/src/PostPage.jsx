import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { PostContext } from "./context/PostContext.jsx";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

const PostPage = () => {
  const { theme } = React.useContext(ThemeContext);
  const { posts, handleDelete } = useContext(PostContext);
  const { language, translations } = React.useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post._id === id); // Compare as string

  if (!post) {
    return <div>Post not found</div>;
  }
  const handleBack = () => {
    navigate("/");
  };

  const handleEdit = () => {
    if (!user && !user.role === "admin" && user.role === "") {
      navigate("/");
    }
    navigate(`/posts/${id}/edit`);
  };

  const handleDeletePost = () => {
    handleDelete(post._id);
    navigate("/");
    toast.success("Post deleted successfully!");
  };

  return (
    <div className="min-h-[504px] flex justify-center items-center px-4">
      <div
        className={`max-w-xl w-full  rounded-md p-8 shadow-lg hover:shadow-xl transition-shadow duration-300  my-5 ${
          theme === "dark"
            ? "bg-slate-800 text-white"
            : "bg-slate-300 text-black"
        } `}
      >
        <button
          type="submit"
          className="hover:text-gray-600 white:text-black dark:text-white mb-2 text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
          onClick={handleBack}
        >
          <FaArrowLeft />
        </button>

        {post.image &&
          (post.image.endsWith(".mp4") ? (
            <video
              src={`../images/${post.image}`}
              controls
              muted
              className="w-full h-80 object-cover rounded-t-lg border-2 mt-4"
            />
          ) : (
            <img
              src={`../images/${post.image}`}
              alt={post.title}
              className="w-full h-64 object-cover rounded-t-lg border-2 mt-4"
            />
          ))}

        <div className={`${user === "" ? "flex flex-col " : ""}`}>
          <h1 className="text-2xl font-bold mb-6 dark:text-black white:text-black">
            {post.title}
          </h1>
          <p className="white:text-gray-700 mb-6 dark:text-white">
            {post.description}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleEdit}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4`}
          >
            {translations[language].edit}
          </button>
          <button
            onClick={handleDeletePost}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            {translations[language].delete}
          </button>
        </div>
      </div>
    </div>
  );
};

toast.success("Post deleted successfully!", {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export default PostPage;
