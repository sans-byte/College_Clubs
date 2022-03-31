import React, { useState } from "react";
import { useEffect } from "react";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";
import TimeAgo from "react-timeago";

function ProjectCard({ project }) {
  const [authorData, setAuthorData] = useState({});

  const date = (someDate) => {
    let helpDate = new Date();
    let newDate = new Date(someDate);
    // TODO : show precise time
    // console.log((helpDate - newDate) / (1000 * 60 * 60));
    return newDate.toString().slice(0, 10);
  };

  // const getUserImage = (authorData) => {
  //   //   console.log(authorData);
  //   let TYPED_ARRAY = new Uint8Array(authorData.picture.data.data);
  //   const blob = new Blob([TYPED_ARRAY], { type: "image/jpeg" });
  //   let urlCreator = window.URL || window.webkitURL;
  //   let imageUrl = urlCreator.createObjectURL(blob);
  //   setImage(imageUrl);
  // };

  const getAuthorInfo = async (project) => {
    try {
      const res = await fetch(`/userinfo/${project.author.id}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      const data = await res.json();
      if (res.status === 200) {
        setAuthorData(data);
        // getUserImage(data);
      } else {
        console.log("Something went wrong in project list getAuthorInfo");
      }
    } catch (err) {
      console.log(err, "from projects list getAuthorInfo");
    }
  };

  useEffect(() => {
    getAuthorInfo(project);
  }, []);

  //   useEffect(() => {
  //       getUserImage(authorData);
  //   }, [authorData]);

  return (
    <div className="lg:card-side card-bordered bg-neutral text-white shadow-md mb-3 rounded-md">
      <div className="flex flex-row items-center px-2 py-auto">
        <div className="w-10 h-10 mr-2 my-1 rounded-full overflow-hidden bg-white">
          <img src={authorData.picture} alt="" />
        </div>
        <p> {project.author.userName} </p>
        <div className="ml-auto">
          {/* {date(project.generationDate)} */}
          <TimeAgo date={project.generationDate} />
        </div>
      </div>
      <hr className="border-black" />
      <div className="p-3">
        <h2 className="text-lg font-semibold">{project.title}</h2>
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
  );
}

export default ProjectCard;
