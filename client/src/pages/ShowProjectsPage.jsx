import React from "react";
import ProjectList from "./ProjectList";
import Navbar from "../components/Navbar";

function ShowProjectsPage() {
  return (
    <div>
      {/* <Navbar/> */}
      <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div className="flex-none hidden lg:flex">
          <button className="btn btn-square btn-ghost"></button>
        </div>
        <div className="flex-1 hidden px-2 mx-2 lg:flex">
          <span className="text-lg font-bold">HOME</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            TODO : add a notification button
          </button>
        </div>
        <div className="flex-none">
          <div className="avatar">
            <div className="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="w-3/4 p-4 ">
          <div className="form-control rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search"
              className="input input-ghost"
            />
          </div>
        </div>
        <div>
          <button className="btn btn-square btn-ghost">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg> */}
          </button>
        </div>
      </div>
      <div className="flex flex-row w-3/5 justify-evenly m-auto">
        <div className="badge badge-outline p-4 cursor-pointer">AI/ML</div>
        <div className="badge badge-outline p-4 cursor-pointer">IOT</div>
        <div className="badge badge-outline p-4 cursor-pointer">
          Data Science
        </div>
        <div className="badge badge-outline p-4 cursor-pointer">
          Web development
        </div>
        <div className="badge badge-outline p-4 cursor-pointer">Android</div>
        <div className="badge badge-outline p-4 cursor-pointer">
          App development
        </div>
      </div>
      <div className="w-4/5 ml-2 mt-10">
        <ProjectList />
      </div>
      <div className=" absolute bottom-10 right-10">
        <button className="btn btn-primary text-3xl flex justify-center items-center rounded-full w-14 h-14">
          +
        </button>
      </div>
    </div>
  );
}

export default ShowProjectsPage;
