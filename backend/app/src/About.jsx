import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { LanguageContext } from "./context/LanguageContext";

const WebDeveloperDescription = () => {
  const { theme } = useContext(ThemeContext);
  const { language, translations } = useContext(LanguageContext);
  return (
    <div className="container mx-auto py-8">
      <div
        className={`max-w-lg mx-auto  shadow-md rounded-lg overflow-hidden ${
          theme === "dark"
            ? "bg-slate-700 text-white"
            : "bg-slate-400 text-black"
        }`}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {translations[language].web}
          </h1>
          <p className="white:text-black dark:text-white mb-6">
            A web developer is a programmer who specializes in the development
            of World Wide Web applications using a client–server model. They
            work with technologies such as HTML, CSS, JavaScript, and various
            server-side languages like PHP, Python, or Node.js. Web developers
            are responsible for designing, building, and maintaining websites
            and web applications.
          </p>
          <p className="white:text-black dark:text-white mb-6">
            In addition to coding, web developers may also be involved in tasks
            such as website design, content creation, and database management.
            They often collaborate with designers and other developers to create
            user-friendly and visually appealing websites.
          </p>
          <p className="white:text-black dark:text-white mb-6">
            Web developers play a crucial role in shaping the digital landscape
            by bringing ideas to life and delivering seamless online experiences
            to users across the globe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebDeveloperDescription;
