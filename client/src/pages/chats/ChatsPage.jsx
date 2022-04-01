import React from "react";
import { useContext } from "react";
import ChatsNav from "../../components/ChatsNav";
import Navbar from "../../components/Navbar";
import ChatContext from "../../context/ChatContext";
import UserContext from "../../context/UserContext";
import ChatBox from "./ChatBox";
import Online from "./Online";
import ShowChats from "./ShowChats";

function ChatsPage() {
  // const { userData } = useContext(UserContext);
  // const { selected } = useContext(ChatContext);
  return (
    <div className="text-white h-screen">
      {/* <ChatsNav /> */}
      <Navbar front={false}/>
      <div className="flex flex-row h-screen pt-20">
        <ShowChats />
        <ChatBox />
        {/* <Online /> */}
      </div>
    </div>
  );
}

export default ChatsPage;
