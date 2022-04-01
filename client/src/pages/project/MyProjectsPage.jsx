import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { FiMoreVertical } from "react-icons/fi";
import UserContext from "../../context/UserContext";
import MyProjectsList from "./MyProjectsList";

function MyProjectsPage() {
  const { userData } = useContext(UserContext);
  const [myProjectsData, setMyProjectsData] = useState([]);

  const myProjects = async () => {
    try {
      const res = await fetch("projects/myprojects", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setMyProjectsData(data);
      } else {
        console.log("Something went wrong while fetching my Projects");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    myProjects();
  }, []);
  console.log(myProjectsData);

  return (
    <div className="h-screen flex flex-col w-full">
      <Navbar front={false} />
      <div className="mt-20 w-3/5 mx-auto h-full overflow-y-scroll">
        {/* <div className="bg-gray-700 w-full p-2">
            <h1 className="card-title">Title</h1>
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dicta perferendis. Labore cupiditate et ea error, quasi culpa repellendus exercitationem placeat aspernatur quae non. Amet odit alias accusamus, eos natus architecto animi quae incidunt modi velit, ipsa cum quisquam officiis, tempora itaque recusandae ab aspernatur commodi saepe culpa quod. Recusandae!</p>
            <button className="btn btn-info">More info</button>
          </div> */}
        {myProjectsData.map((project, i) => (
          <ul>
            <li key={i}>
              <MyProjectsList project={project} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default MyProjectsPage;
