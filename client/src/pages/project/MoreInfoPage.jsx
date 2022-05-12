import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProjectContext from "../../context/ProjectContext";
import UserContext from "../../context/UserContext";
import Pings from "./Pings";

function MoreInfoPage() {
  const { userData } = useContext(UserContext);
  console.log(userData);
  const { selectedProject } = useContext(ProjectContext);
  return (
    <div className="h-full flex flex-col w-full">
      <Navbar front={false} />
      {selectedProject ? (
        <div className="mt-20 w-3/5 mx-auto h-full">
          <div className="text-3xl bg-primary p-3 text-neutral font-semibold">
            {selectedProject.title}
          </div>
          <div className="p-3">
            <p className="text-xl text-primary"> Objective : </p>
            <div className="text-justify">{selectedProject.description}</div>
            <div className="flex flex-row justify-start items-center mt-5">
              <p className="text-lg capitalize text-primary">Posted By : </p>
              <Link to="/profile">
                <div className="capitalize ml-2">
                  {selectedProject.author.userName}
                </div>
              </Link>
            </div>
            <div className="w-full mt-4 flex flex-col  p-2">
              <p className="text-lg text-neutral font-semibold"> Pings </p>
              <hr className="h-[1px] bg-black border-0" />
              {selectedProject.pings.map((ping)=>(<Pings selectedProject = {selectedProject} ping = {ping}/>))}
            </div>
            <div className="w-full mt-4 flex flex-col p-2">
              <p className="text-lg text-neutral font-semibold"> Comments </p>
              <hr className="h-[1px] bg-black border-0" />
              <div className=" p-2 px-4  shadow-sm rounded-sm items-center">
                <div className="flex flex-row justify-start items-center text-gray-400">
                  <div class="avatar mx-2">
                    <div class="w-8 h-8 rounded-full">
                      <img src="https://api.lorem.space/image/face?hash=92310" />
                    </div>
                  </div>
                  <p className="">Sanskar Jain</p>
                  <p className="text-sm">{`< sanskarj2@gmail.com >`}</p>
                </div>
                <p className="ml-12 text-sm">This is the comment</p>
              </div>
              <div className=" p-2 px-4 shadow-sm rounded-sm items-center">
                <div className="flex flex-row justify-start items-center text-gray-400">
                  <div class="avatar mx-2">
                    <div class="w-8 h-8 rounded-full">
                      <img src="https://api.lorem.space/image/face?hash=92310" />
                    </div>
                  </div>
                  <p className="">Sanskar Jain</p>
                  <p className="text-sm">{`< sanskarj2@gmail.com >`}</p>
                </div>
                <p className="ml-12 text-sm">This is the comment</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MoreInfoPage;
