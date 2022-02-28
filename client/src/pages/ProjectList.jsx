import React from "react";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { useContext } from "react";
import ProjectContext from "../context/ProjectContext";

function ProjectList() {
  const date = (someDate) => {
    let helpDate = new Date();
    let newDate = new Date(someDate);
    // TODO : show precise time
    console.log((helpDate - newDate)/(1000*60*60));
    return newDate.toString().slice(0, 10);
  };

  const { projectList } = useContext(ProjectContext);
  return (
    <div>
      <div>This is the project list</div>
      <ul>
        {projectList.map((project, i) => (
          <li key={i}>
            <div className="lg:card-side card-bordered bg-neutral text-white shadow-md my-3 rounded-md">
              <div className="flex flex-row items-center px-2 py-auto">
                <div className="w-10 h-10 mr-2 my-1 rounded-full overflow-hidden bg-white">
                  <img src="" />
                </div>
                <p> {project.author.userName} </p>
                <div className="ml-auto">{date(project.generationDate)}</div>
              </div>
              <hr className="border-black" />
              <div className="p-3">
                <h2 className="text-lg font-semibold">
                  Speech to Sign language converter
                </h2>
                <p>{project.description}</p>
                <div className="flex flex-row justify-between">
                  <h3 className="text-base mt-2 font-semibold">
                    Members Required - {project.membersRequired}
                  </h3>
                  <h3 className="text-base mt-2 font-semibold">
                    Last Date - {date(project.lastApplyDate)}
                  </h3>
                </div>
                <div className="mt-2 flex flex-row justify-between">
                  <button className="btn btn-success ">Ping</button>
                  <button className="btn btn-info">More info</button>
                </div>
              </div>
              <hr className="border-black" />
              <div>
                <button className="btn text-xl btn-ghost">
                  <FiHeart />
                </button>
                <button className="btn text-xl btn-ghost">
                  <FiMessageCircle />
                </button>
                <button className="btn text-xl btn-ghost">
                  <FiSend />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
