import React from "react";
import ProjectList from "./ProjectList";
import { FiSearch } from "react-icons/fi";

function ShowProjectsPage() {
  return (
    <div className="lg:w-1/2 md:w-3/5 sm:w-3/5 m-auto pt-14 h-screen flex flex-col">
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
      <div className="h-screen overflow-y-scroll px-1">
        <ProjectList />
      </div>
    </div>
  );
}

export default ShowProjectsPage;
