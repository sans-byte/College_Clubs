import React from "react";
import { useContext, useState } from "react";
import { FiArrowRight, FiMenu } from "react-icons/fi";
import { ReactComponent as Logo } from "../svgs/logo.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import SideDrawer from "../components/SideDrawer";

function Navbar() {
  const { userData, userInfo } = useContext(UserContext);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const data = (userInfo) => {
    let TYPED_ARRAY = new Uint8Array(userInfo.picture.data.data);
    const blob = new Blob([TYPED_ARRAY], { type: "image/jpeg" });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  };

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("/logout", {
        method: "GET",
        Accept: "application/json",
      });
      if (res.status === 200) {
        console.log("UserLogout");
        navigate("/login", { replace: true });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar z-50 shadow-lg bg-neutral text-neutral-content w-full bg-opacity-80 fixed ">
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
            setShowSideDrawer(!showSideDrawer);
          }}
        >
          <FiMenu className="mx-3" />
        </button>
        <div className="flex flex-row justify-between w-full">
          <Logo className="w-10 h-10 inline ml-3 cursor-pointer" />
          <div className="text-2xl text-primary">SPACE</div>
          <div className="flex flex-row">
            {!userData ? (
              <Link to="/register">
                <button className="px-3 py-2 mx-2 btn-primary rounded-lg cursor-pointer">
                  Register
                  <FiArrowRight className="ml-1 inline" />
                </button>
              </Link>
            ) : (
              <p className="m-auto text-primary">
                {"Welcome " +
                  `${userData.firstName}`.charAt(0).toUpperCase() +
                  `${userData.firstName}`.slice(1)}
              </p>
            )}

            {!userData ? (
              <Link to="/login">
                <button className="px-3 py-2 mx-2 btn-primary rounded-lg cursor-pointer">
                  Login
                </button>
              </Link>
            ) : (
              <Link to="">
                <button
                  className="px-3 py-2 mx-2 btn-primary rounded-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Link>
            )}
            {userInfo ? (
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={`${data(userInfo)}`}
                    alt=""
                    className="object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
      <SideDrawer sidebar={showSideDrawer} />
    </>
  );
}

export default Navbar;
