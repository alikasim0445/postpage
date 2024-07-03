import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext();

const translations = {
  en: {
    web: "Web Developer",
    welcomeToAC: "Welcome To AC",
    arada: "Arada Daily",
    postPageTitle: "Post Page",
    newPost: "New Post",
    searchPlaceholder: "Search here",
    noPostsFound: "No posts found",
    readMore: "Read More",
    posted: "Posted",
    title: "Title",
    description: "Description",
    addPost: "Add Post",
    editPost: "Edit Post",
    edit: "Edit",
    delete: "Delete",
    language: "English",
    home: "Home",
    about: "About",
    save: "Save",
    login: "Login",
    logout: "Logout",
    forgotPassword: "Forgot Password",
    signup: "Sign Up",
    comment: "Comment",
  },
  am: {
    web: "የድር ገንቢ",
    welcomeToAC: "እንኳን ወደ መለያው በደህና መጡ",
    arada: "አራዳ ዲላይ",
    postPageTitle: "መነሻ ገጽ",
    newPost: "አዲስ መልእክት",
    searchPlaceholder: "እዚህ ፈልግ",
    noPostsFound: "ምንም መልእክቶች አልተገኙም",
    readMore: "ተጨማሪ አንብብ",
    posted: "ተለግሷል",
    title: "ሪኢሰ",
    description: "ሃታታ",
    addPost: "ልጥፍ ጨምር",
    editPost: "ልጥፍ አርትዕ",
    edit: "አርትዕ",
    delete: "አትፋ",
    language: "አማርኛ",
    home: "በት",
    about: "ስላኛ",
    save: "ማስቀመጥ",
    login: "ግባ",
    logout: "ውጣ",
    forgotPassword: "መክፈቻ ቁልፉን ረሳኽው",
    signup: "ተመዝገቢ",
    comment: "አስታየት",
  },
};

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "am" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, translations }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
