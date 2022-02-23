import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LandingNav from "./components/LandingNav.jsx";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import InterestsPage from "./pages/InterestsPage.jsx";
import ShowProjects from "./pages/ShowProjects.jsx";
import { UserProvider } from "./context/UserContext";
import ActivationPage from "./pages/ActivationPage.jsx";
import UserInfo from "./pages/UserInfo.jsx";

function App() {
  return (
    <UserProvider>
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
          <Route path="/projects/:id" element={<ShowProjects />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
