import React, { useContext, useEffect, useState } from "react";
// import { ReactComponent as Spinner} from "../../svgs/loading.svg";
import { RiLoader5Fill } from "react-icons/ri";
import ChatContext from "../../context/ChatContext";
import {
  FiMessageSquare,
  FiMic,
  FiPaperclip,
  FiPhone,
  FiPhoneCall,
  FiSend,
  FiVideo,
} from "react-icons/fi";
import ScrollableChat from "../../components/ScrollableChat";
import io from "socket.io-client";
import UserContext from "../../context/UserContext";
import Lottie from "react-lottie";
import animationData from "../../svgs/77160-typing.json";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

function ChatBox() {
  const { selected } = useContext(ChatContext);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { userData } = useContext(UserContext);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selected) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/message/${selected._id}`, {
        method: "GET",
        Accept: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status == 200) {
        console.log(data);
        setMessage(data);
        setLoading(false);

        socket.emit("join chat", selected._id);
      } else {
        console.log("error in fetching chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    socket = io(ENDPOINT, { transports: ["websocket", "polling"] });
    if (userData) {
      socket.emit("setup", userData._id);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }
  }, [userData]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selected;
  }, [selected]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        //give notification
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    });
  });
  const sendMessage = async (e) => {
    e.preventDefault();
    socket.emit("stop typing", selected._id);
    try {
      setNewMessage("");
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          chatId: selected._id,
        }),
      });
      const data = await res.json();
      setMessage([...message, data]);
      console.log(data);

      socket.emit("new message", data);
    } catch (error) {
      console.log(error);
    }
  };

  const typingHandler = (e) => {
    e.preventDefault();
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selected._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selected._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="lg:w-1/2 h-full">
      {!selected ? (
        <div className="text-center mt-10 h-full text-xl">
          No Chats Found...
        </div>
      ) : (
        <div className="w-full  bg-slate-600 rounded-md flex flex-col">
          <div className="flex flex-row rounded-md items-center px-2 py-auto bg-slate-800">
            <div className="w-10 h-10 mr-2 my-1 rounded-full bg-white">
              <img src={``} alt="" />
            </div>
            <p> {`Sanskar`} </p>
            <div className="ml-auto flex flex-row text-xl">
              <button className="mx-2">
                <FiVideo className="text-xl" />
              </button>
              <button className="mx-4">
                <FiPhone className="" />
              </button>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <RiLoader5Fill className="animate-spin text-5xl text-primary" />
            </div>
          ) : (
            <div className="flex w-full max-h-[520px] overflow-hidden">
              <ScrollableChat messages={message} />
            </div>
          )}
          <div className="flex flex-row rounded-md items-center px-2 py-auto  mt-auto">
            {isTyping ? (
              <div>
                {" "}
                <Lottie
                  options={defaultOptions}
                  // height={50}
                  width={70}
                  style={{ marginBottom: 1, marginLeft: 0 }}
                />
              </div>
            ) : null}
          </div>
          <div className="flex flex-row rounded-md items-center px-2 py-auto bg-slate-800 mt-auto w-full">
            <form
              action=""
              className="flex flex-row items-center justify-start w-full"
            >
              <input
                type="text"
                className="input w-2/3 h-12 my-2"
                value={newMessage}
                onChange={typingHandler}
              />
              <button
                className="btn btn-primary btn-outline mx-2"
                onClick={sendMessage}
              >
                <FiSend className="text-2xl" />
              </button>
            </form>
            <button className="ml-auto mr-4 text-xl">
              <FiMic />
            </button>
            <button className="mr-4 text-xl">
              <FiPaperclip />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
