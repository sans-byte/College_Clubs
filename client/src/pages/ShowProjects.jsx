import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import ShowProjectsPage from "./ShowProjectsPage";
import { FiPlus } from "react-icons/fi";
import AddProjectForm from "./AddProjectForm";
import ProjectContext, { ProjectProvider } from "../context/ProjectContext";

function ShowProjects() {
  const navigate = useNavigate();
  const { getUserData, getUserInfo } = useContext(UserContext);
  const { getProjectList } = useContext(ProjectContext);
  const { id } = useParams();

  // console.log(userData, "This is from show projects page");
  // info : gettig user so that to use its info id to use to get information about the user
  const getUser = async () => {
    try {
      const res = await fetch(`/user/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.status === 200) {
        throw new Error("there is an error");
      } else {
        getUserData(data);
        getInfo();
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };

  // info : getting user information anout interest so to use it to show projects depending upon interests
  const getInfo = async () => {
    try {
      const res = await fetch(`/userinfo/${id}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      const userInfoData = await res.json();
      if (res.status === 200) {
        console.log(userInfoData, "get userinfo success in showprojects");
        getUserInfo(userInfoData);
        getProjectData(userInfoData);
      } else {
        console.log("Error in getinfo function in showprojects");
      }
    } catch (err) {
      console.log(err, "From showprojects in the catch of getinfo");
    }
  };

  // info : using interest from the getinfo show projects depending upon it.
  const getProjectData = async (userInfoData) => {
    try {
      const res = await fetch(`/projects/${userInfoData.interest}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const projectData = await res.json();
      if (res.status === 200) {
        getProjectList(projectData);
        console.log(projectData, "From projects data");
      } else {
        console.log("something is wrong here");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    // getProjectData();
  }, []);

  // return (
  //   <div>
  //     {/* // BUG : request for user data is not full filled */}
  //     {/* <Navbar /> */}

  //     <div className="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
  //       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  //       <div className="drawer-content">
  //         <ShowProjectsPage></ShowProjectsPage>
  //       </div>
  //       <Logo className="w-10 h-10 inline ml-3 cursor-pointer relative top"/>
  //       <div className="drawer-side flex items-center">
  //         <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
  //         <ul className="menu p-4 pr-0 overflow-y-auto w-80 bg-base-100 text-base-content">
  //           <li className="bg-primary-focus rounded-bl-lg rounded-tl-lg">
  //             <a>HOME</a>
  //           </li>
  //           <li>
  //             <a>COMMUNITY</a>
  //           </li>
  //           <li>
  //             <a>PROJECTS</a>
  //           </li>
  //           <li>
  //             <a>EVENTS</a>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );

  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        <div className={`${modal ? "opacity-60" : null}`}>
          <div>
            <Navbar />
          </div>
          <div>
            <ShowProjectsPage />
          </div>
          <button
            className="fixed bottom-10 right-10 btn btn-primary rounded-full w-14 h-14 shadow-lg hover:rotate-180"
            onClick={(e) => {
              e.preventDefault();
              setModal(!modal);
            }}
          >
            <FiPlus className="text-xl" />
          </button>
        </div>
        <AddProjectForm modal={modal} setModal={setModal} />
      </div>
    </>
  );
}

export default ShowProjects;
