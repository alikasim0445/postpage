import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
import Home from "./Home";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import WebDeveloperDescription from "./About";
import Footer from "./Footer";
import Missing from "./Missing";
import EditPost from "./EditPost";
// import { ThemeProvider, ThemeContext } from "./context/ThemeContext"; // Import ThemeContext as well
import { PostContextProvider } from "./context/PostContext";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./component/Login";
import SignUp from "./component/Register";
import { AuthProvider } from "./context/AuthContext";
import { LikeProvider } from "./context/LikeContext";
import { CommentProvider } from "./context/CommentContext";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";

function App() {
  // const { theme } = useContext(ThemeContext);
  return (
    <AuthProvider>
      <PostContextProvider>
        <LanguageContextProvider>
          <ThemeProvider>
            <LikeProvider>
              <CommentProvider>
                <ToastContainer />
                <Nav />
                <div className={`relative  overflow-y-auto`}>
                  <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/post/new" element={<NewPost />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<ResetPassword />}
                    />
                    <Route path="/posts/:id" element={<PostPage />} />
                    <Route path="/posts/:id/edit" element={<EditPost />} />
                    <Route
                      path="/about"
                      element={<WebDeveloperDescription />}
                    />
                    <Route path="*" element={<Missing />} />
                  </Routes>
                  <Footer />
                </div>
              </CommentProvider>
            </LikeProvider>
          </ThemeProvider>
        </LanguageContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
