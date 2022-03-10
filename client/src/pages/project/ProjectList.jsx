import React, { useState } from "react";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import { useContext } from "react";
import ProjectCard from "./ProjectCard";
import ProjectContext from "../../context/ProjectContext";

function ProjectList() {
  const { projectList } = useContext(ProjectContext);

  return (
    <>
      {projectList.length > 0 ? (
        <ul className="">
          {projectList.map((project, i) => (
            <li key={i}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-neutral text-4xl pt-10 bg-white h-full">No Projects </div>
      )}
    </>
  );
}

export default ProjectList;
