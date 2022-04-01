import React from "react";
import { FiMoreVertical } from "react-icons/fi";

function MyProjectsList({ project }) {
  const date = new Date();

  return (
    <div>
      <div className="rounded-sm shadow-xl w-full bg-neutral mb-2">
        <div className="card-body">
          <div className="w-full flex flex-row">
            <h2 className="card-title truncate text-primary">
              {project.title}
              {(new Date(project.generationDate).getTime())/1000 + 86400 >
              new Date().getTime() / 1000 ? (
                <div className="badge badge-success mx-2">NEW</div>
              ) : null}
            </h2>
            <div className="ml-auto mr-4 mt-2">
              <div className="dropdown absolute">
                <label tabindex="0" class="text-primary cursor-pointer">
                  <FiMoreVertical />
                </label>
                <ul
                  tabindex="0"
                  className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 absolute"
                >
                  <li>
                    <a>Edit</a>
                  </li>
                  <li>
                    <a>Delelte</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p className="truncate w-full">{project.description}</p>
          <div className="card-actions justify-between">
            <div className="">
              <p>
                Status :{" "}
                {project.lastApplyDate >= project.generationDate ? (
                  <span className="text-success">Active</span>
                ) : (
                  <span className="text-error">Inactive</span>
                )}
              </p>
              <div className="">
                <p>
                  Pings :
                  <span className = "ml-2">{project.pings.length}</span>
                </p>
              </div>
            </div>
            <button className="btn btn-sm btn-info">Info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectsList;
