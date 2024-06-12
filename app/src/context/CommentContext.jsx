// CommentContext.js
import { createContext, useContext, useState } from "react";

const CommentContext = createContext();

export const useCommentContext = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState({});

  const handleComment = async (postId, commentText) => {
    // Make API request to handle commenting on post
    try {
      const response = await fetch(
        `http://localhost:5555/api/comment/${postId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers if required
          },
          body: JSON.stringify({ comment: commentText }),
        }
      );
      if (response.ok) {
        const updatedComments = {
          ...comments,
          [postId]: [...(comments[postId] || []), commentText],
        };
        setComments(updatedComments);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <CommentContext.Provider value={{ comments, handleComment }}>
      {children}
    </CommentContext.Provider>
  );
};
