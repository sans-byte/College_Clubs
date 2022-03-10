import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectContext from "../../context/ProjectContext";
import UserContext from "../../context/UserContext";

function AddProjectForm({ modal, setModal, userId }) {
  const { getProjectData } = useContext(ProjectContext);

  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    membersRequired: "",
    pings: "",
    lastApplyDate: "",
    field: "",
    likes: "",
    comment: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const value = e.target.value;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);
    const {
      title,
      description,
      membersRequired,
      pings,
      lastApplyDate,
      field,
      likes,
      comment,
    } = projectData;
    const res = await fetch(`/projects/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        membersRequired,
        pings,
        lastApplyDate,
        field,
        likes,
        comment,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setProjectData({
        title: "",
        description: "",
        membersRequired: "",
        pings: "",
        lastApplyDate: "",
        field: "",
        likes: "",
        comment: "",
      });
      getProjectData();
    } else {
      console.log("error in posting project");
      // navigate(`/login`);
    }
  };

  const area = [
    {
      title: "Select project's area",
      value: "",
      disabled: true,
    },
    {
      title: "AI/ML",
      value: "ai/ml",
    },
    {
      title: "Web Devlopment",
      value: "webdev",
    },
    {
      title: "Cyber security",
      value: "cyber",
    },
  ];

  return (
    <>
      <div
        className={`${
          modal ? "flex" : "hidden"
        } w-full h-full fixed justify-center items-center`}
      >
        <div className="w-3/5 h-[70%] bg-white rounded-md px-10">
          <form action="" className="" onSubmit={handleSubmit}>
            <label htmlFor="" className="label text-neutral">
              Title
            </label>
            <input
              type="text"
              placeholder="title"
              className="input w-full"
              value={projectData.title}
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="" className="label text-neutral">
              Description
            </label>
            <textarea
              type=""
              placeholder="description"
              className="input w-full h-24"
              value={projectData.description}
              name="description"
              onChange={handleChange}
            />
            <div className="flex w-full">
              <div className="w-1/5">
                <label htmlFor="" className="label text-neutral">
                  Members
                </label>
                <input
                  type="number"
                  placeholder="2-5"
                  className="input w-full"
                  max={5}
                  min={2}
                  value={projectData.membersRequired}
                  name="membersRequired"
                  onChange={handleChange}
                />
              </div>
              <div className="w-4/5 ml-3">
                <label htmlFor="" className="label text-neutral">
                  Last Date
                </label>
                <input
                  type="date"
                  className="input w-full"
                  min={new Date().toISOString().slice(0, 10)}
                  value={projectData.lastApplyDate}
                  name="lastApplyDate"
                  onChange={handleChange}
                />
              </div>
            </div>
            <label className="label text-neutral">Area</label>
            <select
              className="select w-full"
              name="field"
              value={projectData.field}
              onChange={handleChange}
            >
              {area.map((option, i) => (
                <option
                  value={option.value}
                  name="interest"
                  key={i}
                  disabled={option.disabled}
                >
                  {option.title}
                </option>
              ))}
            </select>
            <div className="w-full flex mt-3 justify-between">
              <button className="w-3/4 btn btn-success" type="submit">
                Post
              </button>
              <button
                className="btn btn-error"
                onClick={(e) => {
                  e.preventDefault();
                  setModal(!modal);
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProjectForm;
