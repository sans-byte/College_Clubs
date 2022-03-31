import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { FiMoreVertical } from "react-icons/fi";
import UserContext from "../../context/UserContext";

function MyProjectsPage() {
  const { userData } = useContext(UserContext);
  const [myProjectsData, setmyProjectsData] = useState([]);

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
      if (res.status == 200) {
        setmyProjectsData(data);
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
        <div className="rounded-sm bg-base-100 shadow-xl w-full">
          <div className="card-body">
            <div className="w-full flex flex-row">
              <h2 className="card-title truncate text-primary">
                Title
                <div className="badge badge-success mx-2">NEW</div>
              </h2>
              <div className="ml-auto mr-4 mt-2">
                <div class="dropdown absolute">
                  <label tabindex="0" class="text-primary">
                    <FiMoreVertical />
                  </label>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 absolute"
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
            <p className="truncate w-full">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              cum aspernatur error voluptas hic animi totam neque accusantium
              enim incidunt. Cupiditate tempore natus magnam fugit eos illo
              exercitationem accusantium sapiente quae consectetur earum
              architecto, ea fugiat adipisci, quisquam odit incidunt deleniti
              modi error sunt distinctio? Tempore unde veritatis culpa.
              Accusantium?
            </p>
            <div className="card-actions justify-between">
              <div className="">
                <p>
                  Status : <span> Active </span>
                </p>
                <div className="">
                  <p>
                    Pings : <span> 10 </span>
                  </p>
                </div>
              </div>
              <button className="btn btn-sm btn-info">Info</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectsPage;
