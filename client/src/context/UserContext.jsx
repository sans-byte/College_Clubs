import React from "react";
import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider
      value={{
        user,
        userData,
        setUser,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
