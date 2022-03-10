import React from "react";
import { useContext, useState } from "react";
import { ReactComponent as Logo } from "../svgs/logo.svg";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import SideDrawer from "../components/SideDrawer";

function ChatsNav() {
  const { userData, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const data = (userInfo) => {
    let TYPED_ARRAY = new Uint8Array(userInfo.picture.data.data);
    const blob = new Blob([TYPED_ARRAY], { type: "image/jpeg" });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);
    return imageUrl;
  };

  return (
    <>
      <nav className="navbar z-50 shadow-lg bg-neutral text-neutral-content w-full bg-opacity-80 ">
        <div className="flex flex-row justify-between w-full">
          <Logo className="w-10 h-10 inline ml-3 cursor-pointer" />
          <div className="text-2xl text-primary">SPACE</div>
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
      </nav>
    </>
  );
}

export default ChatsNav;
