// src/context/PostContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext({});

export const PostContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null); // changed to null to indicate no file selected initially
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/blogs");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        console.log(data[0].image);
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("title", title);
    formdata.append("description", description);
    await fetch("http://localhost:8888/api/blogs", {
      method: "POST",
      body: formdata,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Upload failed");
        }
        const savedPost = response.json();
        setPosts([savedPost, ...posts]);
        setFile(null);
        setTitle("");
        setDescription("");
        toast.success("Post created successfully!");
        navigate("/");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();
    const updatedPost = {
      image: editImage,
      title: editTitle,
      description: editDescription,
    };

    try {
      const response = await fetch(`http://localhost:8888/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const savedPost = await response.json();
      setPosts(posts.map((post) => (post._id === id ? savedPost : post)));
      setEditImage("");
      setEditTitle("");
      setEditDescription("");
      toast.success("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (error) {
      toast.error("Error updating post: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8888/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Error deleting post: " + error.message);
    }
  };

  return (
    <PostContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        posts,
        setPosts,
        loading,
        error,
        file,
        setFile,
        editImage,
        setEditImage,
        editTitle,
        editDescription,
        searchQuery,
        setSearchQuery,
        setEditDescription,
        setEditTitle,
        handleUpload,
        handleEdit,
        handleDelete,
        navigate,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

PostContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
