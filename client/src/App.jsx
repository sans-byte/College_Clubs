import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import InterestsPage from "./pages/InterestsPage.jsx";
import ShowProjects from "./pages/ShowProjects.jsx";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <LandingPage />
              </>
            }
          />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/interest" element={<InterestsPage />}></Route>
          <Route path="/projects" element={<ShowProjects />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
