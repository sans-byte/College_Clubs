import React from "react";
import { useContext } from "react";
import { FiArrowRight } from "react-icons/fi";
import { ReactComponent as Logo } from "../svgs/logo.svg";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function LandingNav() {
  const { userData } = useContext(UserContext);

  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content fixed w-full bg-opacity-80">
      <div className="flex flex-row justify-between w-full">
        <Logo className="w-10 h-10 inline ml-3 cursor-pointer" />
        <div className="text-2xl text-primary">SPACE</div>
        <div className="flex flex-row">
          <Link to="/register">
            <button className="px-3 py-2 mx-2 btn-primary rounded-lg cursor-pointer">
              Register
              <FiArrowRight className="ml-1 inline" />
            </button>
          </Link>

          <Link to="/login">
            <button className="px-3 py-2 mx-2 btn-primary rounded-lg cursor-pointer">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
