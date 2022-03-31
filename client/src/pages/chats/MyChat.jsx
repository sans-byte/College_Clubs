import React, { useContext, useEffect, useState } from "react";
import ChatLoading from "../../components/ChatLoading";
import ChatContext from "../../context/ChatContext";
import ChatCardStatic from "./ChatCardStatic";

function MyChat() {
  const [currentChats, setCurrentChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setSelected } = useContext(ChatContext);

  const handleClick = (chat) => {
    setSelected(chat);
  };

  const allChats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chat`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setLoading(false);
      const data = await res.json();
      if (res.status === 200) {
        // console.log(data);
        setCurrentChats(data);
        // setSearchResults(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allChats();
  }, []);
  return (
    <div>
      {loading ? (
        <ChatLoading />
      ) : (
        currentChats?.map((chat, i) => (
          <li key={i}>
            <ChatCardStatic chat={chat} handleSelect={handleClick} />
          </li>
        ))
      )}
    </div>
  );
}

export default MyChat;
