import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import ShowProjectsPage from "./ShowProjectsPage";

function ShowProjects() {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const { id } = useParams();

  const getUser = async () => {
    try {
      const res = await fetch(`/projects/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      if (!res.status === 200) {
        throw new Error("there is an error");
      } else {
        setUserData(data);
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {/* // BUG : request for user data is not full filled */}
      {/* <Navbar /> */}

      <div className="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <ShowProjectsPage></ShowProjectsPage>
        </div>
        <p className="absolute p-5 ml-20 text-2xl text-primary">Space</p>
        <div className="drawer-side flex items-center">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 pr-0 overflow-y-auto w-80 bg-base-100 text-base-content">
            <li className="bg-primary-focus rounded-bl-lg rounded-tl-lg">
              <a>HOME</a>
            </li>
            <li>
              <a>COMMUNITY</a>
            </li>
            <li>
              <a>PROJECTS</a>
            </li>
            <li>
              <a>EVENTS</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShowProjects;
