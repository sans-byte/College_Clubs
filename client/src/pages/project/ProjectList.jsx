import { FaSkullCrossbones } from "react-icons/fa";
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
        <div className="flex justify-center items-center h-5/6 w-full flex-col">
          <FaSkullCrossbones className="text-xl"/>
          <p>No Projects Found...</p>
        </div>
      )}
    </>
  );
}

export default ProjectList;
