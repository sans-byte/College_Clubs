import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import UserContext from "../context/UserContext";

function ScrollableChat({ messages }) {
  const { userData } = useContext(UserContext);

  const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };

  const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };

  const isCurrentUser = (messages, userId) => {
    if (messages.sender._id === userId) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScrollableFeed className="w-full">
      {messages &&
        messages.map((m, i) => (
          <div className="flex flex-row text-neutral items-center" key={i}>
            {(isSameSender(messages, m, i, userData._id) ||
              isLastMessage(messages, i, userData._id)) && (
              <div class="avatar mt-1">
                <div class="w-8 h-8 rounded-full">
                  <img src="https://api.lorem.space/image/face?hash=92310" />
                </div>
              </div>
            )}
            <span
              className={`${
                m.sender._id === userData._id ? "bg-gray-400 ml-auto mr-2" : "bg-primary ml-2"
              } rounded-lg px-4 py-1
              )} mt-2`}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
