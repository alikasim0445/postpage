import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaArrowUp,
  FaArrowDown,
  FaThumbsUp,
  FaComment,
  FaShare,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";
import { PostContext } from "./context/PostContext.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { theme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  const [expandedPost, setExpandedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [commentTexts, setCommentTexts] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setShowScrollDown(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDescription = (id) => {
    setExpandedPost((prevId) => (prevId === id ? null : id));
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      "" ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ""
  );

  const isValidDate = (date) => !isNaN(Date.parse(date));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5555/api/like/${postId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
        );
        setPosts(updatedPosts);
        console.log("Post liked successfully");
      } else {
        console.error("Failed to like post:", response.statusText);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId, commentText) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5555/api/comment/${postId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: commentText }),
        }
      );

      if (response.status === 200) {
        const updatedPosts = posts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), commentText] }
            : post
        );
        setPosts(updatedPosts);
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleCommentChange = (postId, text) => {
    setCommentTexts((prev) => ({ ...prev, [postId]: text }));
  };

  const handleShare = () => {};

  return (
    <div
      className={`container mx-auto py-4 min-h-screen max-w-[600px] bg-slate-300`}
    >
      <h1 className="text-3xl font-bold text-center mb-4 post-page">
        {translations[language].postPageTitle}
      </h1>
      <div className="flex justify-between items-center mb-6 px-4 bg-slate-100 py-5">
        <Link
          to="/post/new"
          className="flex items-center text-blue-600 font-bold"
        >
          <FaPlus className="mr-2 mt-1" />
          {translations[language].newPost}
        </Link>
        {showScrollDown && (
          <button
            onClick={scrollToBottom}
            className="fixed top-15 right-8 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 z-50"
          >
            <FaArrowDown />
          </button>
        )}
        <div className="relative w-full max-w-xs mr-10">
          <input
            type="search"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full border border-gray-300 p-2 w-full pl-10 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 px-4 min-w-16">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className={`border p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
          >
            <FaShare
              className="ml-[510px] text-amber-500 text-2xl hover:text-amber-200"
              onClick={handleShare}
            />
            {post.image &&
              (post.image.endsWith(".mp4") ? (
                <video
                  src={`../images/${post.image}`}
                  controls
                  autoPlay
                  loop
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
            <h3
              className={`text-xl font-semibold mb-4 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {post.title}
            </h3>
            <p
              onClick={() => toggleDescription(post._id)}
              className={`mb-4 cursor-pointer ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {expandedPost === post._id
                ? post.description
                : `${post.description.slice(0, 400)}...`}
            </p>
            <p
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } mb-4`}
            >
              {`${translations[language].posted} ${
                isValidDate(post.createdAt)
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })
                  : translations[language].unknownTime
              }`}
            </p>
            <div className="flex justify-evenly items-center mb-4">
              <FaThumbsUp
                className="text-green-500 text-2xl hover:cursor-pointer hover:text-green-300 active:text-green-500"
                onClick={() => handleLike(post._id)}
              />
              <span className="text-gray-500">{post.likes || 0}</span>
              <FaComment
                className="text-blue-500 text-2xl hover:cursor-pointer hover:text-blue-300"
                onClick={() => toggleDescription(post._id)}
              />
              <span className="text-gray-500">
                {post.comments ? post.comments.length : 0}
              </span>
              <Link
                to={`/posts/${post._id}`}
                className="block w-fit text-center py-2 px-4 bg-gradient-to-tr from-amber-500 to-amber-600 text-white font-semibold rounded-md hover:bg-amber-600 transition duration-300"
              >
                {translations[language].readMore}
              </Link>
            </div>
            {expandedPost === post._id && (
              <div className="mt-4">
                <h4
                  className={`text-lg ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {translations[language].comments}
                </h4>
                <ul className="mb-4">
                  {post.comments &&
                    post.comments.map((comment, index) => (
                      <li
                        key={index}
                        className={`${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        {comment}
                      </li>
                    ))}
                </ul>
                {user && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentTexts[post._id] || ""}
                      onChange={(e) =>
                        handleCommentChange(post._id, e.target.value)
                      }
                      placeholder="Add a comment"
                      className="border rounded-l-lg p-2 w-full"
                    />
                    <button
                      onClick={() =>
                        handleComment(post._id, commentTexts[post._id] || "")
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                    >
                      {translations[language].comment}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-gray-600 text-center col-span-full">
            No posts found.
          </p>
        )}
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-8 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
