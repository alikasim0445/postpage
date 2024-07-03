import { useContext } from "react";
import { PostContext } from "../context/Postcontext";

export const usePostsContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "usePostsContext must be used within a PostContextProvider"
    );
  }

  return context;
};
