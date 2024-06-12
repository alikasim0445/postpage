import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { PostContext } from "./context/PostContext.jsx";

const EditPost = () => {
  const {
    posts,
    handleEdit,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
  } = React.useContext(PostContext);
  const { theme } = React.useContext(ThemeContext);
  const { language, translations } = React.useContext(LanguageContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((post) => post._id === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditDescription(post.description);
    }
  }, [post, setEditTitle, setEditDescription]);

  const handleBack = () => {
    navigate(`/posts/${id}`);
  };

  const handleImageChange = () => {};

  return (
    <div className="min-h-[459px]">
      <div
        className={`p-4 rounded my-11 mx-auto max-w-sm ${
          theme === "dark"
            ? "bg-slate-600 text-white"
            : "bg-slate-300 text-black"
        }`}
      >
        <div className="flex justify-start">
          <button
            type="button"
            className="hover:text-gray-600 dark:text-white text-2xl font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleBack}
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-bold mb-4 flex justify-center ml-16">
            {translations[language].editPost}
          </h2>
        </div>
        <form onSubmit={(e) => handleEdit(e, id)}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 dark:text-white text-gray-700"
              htmlFor="title"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="png,gif,mp4"
              required
              onChange={handleImageChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 dark:text-white text-gray-700"
              htmlFor="title"
            >
              {translations[language].title}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                editTitle === "" ? "border-red-500" : "text-gray-700"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 dark:text-white text-gray-700"
              htmlFor="description"
            >
              {translations[language].description}
            </label>
            <textarea
              id="description"
              name="description"
              rows={7}
              required
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                editDescription === "" ? "border-red-500" : "text-gray-700"
              }`}
            ></textarea>
          </div>
          <div className="flex justify-around">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {translations[language].save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
