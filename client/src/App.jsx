import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingNav from "./components/LandingNav.jsx";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/user/SignUpPage";
import LoginPage from "./pages/user/LoginPage";
import ShowProjects from "./pages/project/ShowProjects";
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import ActivationPage from "./pages/user/ActivationPage.jsx";
import UserInfo from "./pages/user/UserInfo.jsx";
import ChatsPage from "./pages/chats/ChatsPage.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import MyProjectsPage from "./pages/project/MyProjectsPage.jsx";
import MoreInfoPage from "./pages/project/MoreInfoPage.jsx";

function App() {
  return (
    <UserProvider>
      <ProjectProvider>
        <ChatProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LandingNav />
                    <LandingPage />
                  </>
                }
              />
              <Route path="/register" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/register/interest" element={<InterestsPage />}></Route> */}
              <Route
                path="user/activation/:token"
                element={<ActivationPage />}
              ></Route>
              <Route path="/userinfo/:id" element={<UserInfo />}></Route>
              <Route path="/user" element={<ShowProjects />}></Route>
              <Route path="/api/chat" element={<ChatsPage />}></Route>
              <Route path="/myprojects" element={<MyProjectsPage />}></Route>
              <Route path="/moreinfo" element={<MoreInfoPage />}></Route>
            </Routes>
          </Router>
        </ChatProvider>
      </ProjectProvider>
    </UserProvider>
  );
}

export default App;
