import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { PostContext } from "./context/PostContext.jsx";
// import { AuthContext } from "./context/AuthContext.jsx";
import React from "react";
const NewPost = () => {
  const { theme } = React.useContext(ThemeContext);
  const { language, translations } = React.useContext(LanguageContext);
  const {
    title,
    setTitle,
    description,
    setDescription,
    setFile,
    handleUpload,
  } = React.useContext(PostContext);
  // const { user } = React.useContext(AuthContext);

  // useEffect(() => {
  //   if (!user || user.role !== "admin") {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  return (
    <div className="min-h-[459px]">
      <div
        className={`p-4 rounded my-11 mx-auto max-w-sm ${
          theme === "dark"
            ? "bg-slate-600 text-white"
            : "bg-slate-300 text-black"
        } `}
      >
        <h2 className="text-2xl font-bold mb-4 flex justify-center">
          {translations[language].newPost}
        </h2>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2 dark:text-white text-gray-700"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*, video/*"
              onChange={(e) => setFile(e.target.files[0])}
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline `}
            ></textarea>
          </div>
          <div className="flex justify-around">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // onClick={handleUpload}
            >
              {translations[language].save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
