import React from "react";
import ProjectList from "./ProjectList";

function ShowProjectsPage() {
  return (
    <div>
      <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
        <div class="flex-none hidden lg:flex">
          <button class="btn btn-square btn-ghost">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg> */}
          </button>
        </div>
        <div class="flex-1 hidden px-2 mx-2 lg:flex">
          <span class="text-lg font-bold">HOME</span>
        </div>
        <div class="flex-none">
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex-none">
          <div class="avatar">
            <div class="rounded-full w-10 h-10 m-1">
              <img src="https://i.pravatar.cc/500?img=32" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="w-3/4 p-4 ">
          <div class="form-control rounded-lg shadow-lg">
            <input type="text" placeholder="Search" class="input input-ghost" />
          </div>
        </div>
        <div>
          <button class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className = "flex flex-row w-3/5 justify-evenly m-auto">
        <div class="badge badge-outline p-4 cursor-pointer">AI/ML</div>
        <div class="badge badge-outline p-4 cursor-pointer">IOT</div>
        <div class="badge badge-outline p-4 cursor-pointer">Data Science</div>
        <div class="badge badge-outline p-4 cursor-pointer">Web development</div>
        <div class="badge badge-outline p-4 cursor-pointer">Android</div>
        <div class="badge badge-outline p-4 cursor-pointer">App development</div>
      </div>
      <div className="w-4/5 ml-2 mt-10"><ProjectList/></div>
      <div className=" absolute bottom-10 right-10">
          <button className="btn btn-primary text-3xl flex justify-center items-center rounded-full w-14 h-14" >+</button>
      </div>
    </div>
  );
}

export default ShowProjectsPage;
