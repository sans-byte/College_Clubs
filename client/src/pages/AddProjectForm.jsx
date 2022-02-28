import React, { useState } from "react";

function AddProjectForm({ modal, setModal }) {

  const [projectData, setProjectData] = useState({
    area:"",
  });

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
        } w-full h-full fixed justify-center items-center `}
      >
        <div className="w-3/5 h-[70%] bg-white rounded-md px-10">
          <form action="" className="">
            <label htmlFor="" className="label text-neutral">
              Title
            </label>
            <input type="text" placeholder="title" className="input w-full" />
            <label htmlFor="" className="label text-neutral">
              Description
            </label>
            <textarea
              type=""
              placeholder="description"
              className="input w-full h-24"
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
                />
              </div>
            </div>
            <label className="label text-neutral">Area</label>
            <select className="select w-full" name="interest" value={projectData.area}>
              {area.map((op, i) => (
                <option
                  value={op.value}
                  name="interest"
                  key={i}
                  disabled={op.disabled}
                >
                  {op.title}
                </option>
              ))}
            </select>
            <div className="w-full flex mt-3 justify-between">
              <button className="w-3/4 btn btn-success">Post</button>
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
