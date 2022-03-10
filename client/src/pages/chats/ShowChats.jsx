import React, { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { FiSearch } from "react-icons/fi";
import ChatLoading from "../../components/ChatLoading";
import ChatCardStatic from "./ChatCardStatic";
import MyChat from "./MyChat";
function 
ShowChats() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChat, setSelectedChat] = useState();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      window.prompt("nothing to search");
    }
    try {
      setLoading(true);
      setTimeout(() => {}, 5000);
      const res = await fetch(`/find?search=${search}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setLoading(false);
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        setSearchResults(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccessChat = async (userId) => {
    try {
      setLoading(true);
      console.log(userId);
      const res = await fetch(`/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        console.log(data);
        setSearch("");
        setSelectedChat(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:w-1/4 p-4">
      <div className="flex flex-row">
        <input
          type="search"
          className="input input-primary input-bordered w-full mb-2"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
          }}
        />
        <button className="btn btn-primary ml-2" onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>
      <div className="">
        <ul>
          {!search ? (
            <MyChat />
          ) : loading ? (
            <ChatLoading />
          ) : (
            searchResults?.map((user, i) => (
              <li key={i}>
                <ChatCard userData={user} handleAccessChat={handleAccessChat} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShowChats;
