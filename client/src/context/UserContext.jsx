import React from "react";
import { createContext } from "react";
import { useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user , setUser] = useState({
    firstName:"",lastName:"",college:"",password:"",confirmPassword:"",email:"",phoneNumber:"",interest:""
  })

  const [interest,setInterest] = useState("");

  return (
    <UserContext.Provider
      value={
        {
          user,
          setUser,
          setInterest,
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
