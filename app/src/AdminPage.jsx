import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./context/PostContext";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminPage = () => {
  const { posts, setPosts } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, [setPosts]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex justify-center mb-4">
        <Link
          to="/post/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4
          hover:bg-blue-700 transition duration-300"
        >
          Create New Post
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Link
                    to={`/posts/${post._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <Link
                    to={`/posts/${post._id}/edit`}
                    className="text-green-500 hover:text-green-700 mr-4"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
