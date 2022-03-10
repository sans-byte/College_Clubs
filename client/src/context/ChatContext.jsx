import React, { createContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selected, setSelected] = useState();
  return (
    <ChatContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
