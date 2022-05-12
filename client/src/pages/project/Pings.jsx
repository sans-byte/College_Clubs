import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

function Pings({ selectedProject, ping }) {
  const { userData } = useContext(UserContext);

  return (
    <div>
      <div className="bg-neutral p-2 flex flex-row px-4 my-2 shadow-sm rounded-sm items-center">
        <div className="flex flex-col">
          <p className="">{ping.firstName}</p>
          <p className="text-sm text-gray-500"> {ping.email} </p>
        </div>

        {selectedProject.author.id === userData._id ? (
          <div className="ml-auto">
              <button className="btn btn-info btn-sm" onClick={()=>{
                  window.open(ping.info.resume, "_blank");
              }}>See Resume</button>
            <button className="btn btn-success btn-sm mx-2">Approve</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Pings;
