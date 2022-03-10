import React from "react";
import { useContext } from "react";
import ChatsNav from "../../components/ChatsNav";
import ChatContext from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import ChatBox from "./ChatBox";
import Online from "./Online";
import ShowChats from "./ShowChats";

function ChatsPage() {
  const { userData } = useContext(UserContext);
  const { selected } = useContext(ChatContext);
  console.log(selected);
  return (
    <div className="text-white h-screen">
      <ChatsNav />
      <div className="flex flex-row h-[80%]">
        <ShowChats />
        <ChatBox />
        <Online />
      </div>
    </div>
  );
}

export default ChatsPage;
