import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);

  const getProjectData = async () => {
    console.log("running");
    if (userInfo) {
      try {
        const res = await fetch(`/projects/${userInfo.interest}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const projectData = await res.json();
        if (res.status === 200) {
          setProjectList(projectData.reverse());
        } else {
          console.log("something is wrong here");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getProjectData();
  }, [userInfo]);

  // console.log(projectList, "From project context");
  return (
    <ProjectContext.Provider
      value={{
        projectList,
        getProjectData,
        setSelectedProject,
        selectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
