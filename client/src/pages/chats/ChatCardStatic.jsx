import React, { useContext } from "react";
import ChatContext from "../../context/ChatContext";

function ChatCardStatic({ chat, handleSelect }) {
  return (
    <div
      className="flex flex-row justify-start items-center bg-slate-400 rounded-md p-1 text-white mt-1 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        handleSelect(chat);
      }}
    >
      <div class="avatar">
        <div class="w-10 h-10 rounded-full mx-4">
          <img src="https://api.lorem.space/image/face?hash=92048" />
        </div>
      </div>
      <div>
        {chat.chatName === "sender" ? chat.users[1].firstName : chat.chatName}
        <p className="text-xs text-gray-600">latest message</p>
      </div>
    </div>
  );
}

export default ChatCardStatic;
