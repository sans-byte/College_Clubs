import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import LoginPage from "./pages/LoginPage";
import InterestsPage from "./pages/InterestsPage.jsx";
import {UserProvider} from "./context/UserContext";

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
          <Route path="/register" element={<SignInPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/interest" element={<InterestsPage />}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
