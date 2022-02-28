import { createContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectList, setProjectList] = useState([]);
  const getProjectList = (data) => {
    setProjectList(data);
  };
  console.log(projectList, "From project context");
  return (
    <ProjectContext.Provider value={{ getProjectList, projectList }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
