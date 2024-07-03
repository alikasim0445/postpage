import { createContext, useContext, useState, useEffect } from "react";

// Create a context for likes
export const LikeContext = createContext();

// Custom hook to use the LikeContext
export const useLikeContext = () => {
  return useContext(LikeContext);
};

// Provider component to wrap around the app
export const LikeProvider = ({ children }) => {
  // Initialize state with likes from local storage or an empty object
  const [likes, setLikes] = useState(() => {
    const storedLikes = localStorage.getItem("likes");
    return storedLikes ? JSON.parse(storedLikes) : {};
  });

  // Effect to store likes in local storage whenever they change
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  // Function to handle liking a post
  const handleLike = (postId) => {
    setLikes((prevLikes) => {
      if (prevLikes[postId]) {
        return prevLikes; // Prevent multiple likes
      }
      return {
        ...prevLikes,
        [postId]: 1,
      };
    });
  };

  // Function to clear all likes
  const clearLikes = () => {
    setLikes({});
    localStorage.removeItem("likes");
  };

  return (
    <LikeContext.Provider value={{ likes, handleLike, clearLikes }}>
      {children}
    </LikeContext.Provider>
  );
};
