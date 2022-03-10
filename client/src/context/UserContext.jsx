import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [userData, setUserData] = useState();
  const [userInfo, setUserInfo] = useState();

  const getId = (id) => {
    setId(id);
    console.log(id);
  };

  const getUser = async (id) => {
    try {
      const res = await fetch(`/user/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json().then((data) => {
        setUserData(data);
        setUserInfo(data.info);
        console.log(data);
        console.log(data.info);
      });
      if (!res.status === 200) {
        throw new Error("there is an error");
      } else {
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <UserContext.Provider
      value={{
        userData,
        getUser,
        userInfo,
        getId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
