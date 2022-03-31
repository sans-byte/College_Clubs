import React, { useContext } from "react";
import ChatContext from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import { ReactComponent as Group } from "../../svgs/group.svg";

function ChatCardStatic({ chat, handleSelect }) {
  // console.log(chat);

  // const data = (userInfo) => {
  //   let TYPED_ARRAY = new Uint8Array(userInfo.picture.data.data);
  //   const blob = new Blob([TYPED_ARRAY], { type: "image/jpeg" });
  //   let urlCreator = window.URL || window.webkitURL;
  //   let imageUrl = urlCreator.createObjectURL(blob);
  //   return imageUrl;
  // };

  const { userData } = useContext(UserContext);

  return (
    <>
      {userData ? (
        <div
          className="flex flex-row justify-start items-center bg-slate-400 rounded-md p-1 text-white mt-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            handleSelect(chat);
          }}
        >
          <div class="avatar">
            <div class="w-10 h-10 rounded-full mx-4">
              {chat.isGroupChat ? (
                <img src="/images/Meeting.jpg" />
              ) : (
                <img
                  src={
                    userData._id == chat.users[0]._id
                      ? chat.users[1].info.picture
                      : chat.users[0].info.picture
                  }
                />
              )}
            </div>
          </div>
          <div>
            {chat.chatName === "sender"
              ? userData._id == chat.users[0]._id
                ? chat.users[1].firstName
                : chat.users[0].firstName
              : chat.chatName}
            <p className="text-xs text-gray-600">latest message</p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ChatCardStatic;
