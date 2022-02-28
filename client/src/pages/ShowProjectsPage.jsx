import React from "react";
import ProjectList from "./ProjectList";
import { FiSearch } from "react-icons/fi";

function ShowProjectsPage() {

  return (
    <div className="lg:w-2/3 md:w-3/5 sm:w-3/5 m-auto h-full pt-14 ">
      {/* <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
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
      </div> */}
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
            <FiSearch className="text-xl" />
          </button>
        </div>
      </div>
      {/* <div className="flex flex-row w-3/5 justify-evenly m-auto">
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
      </div> */}
      <div className="">
        <ProjectList />
      </div>
    </div>
  );
}

export default ShowProjectsPage;
