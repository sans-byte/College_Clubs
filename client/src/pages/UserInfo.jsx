import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    gender: "",
    date_of_birth: "",
    interest: "",
    college: "",
    linkdln: "",
    github: "",
    resume: "",
  });
  const { id } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const { name, value } = e.target;
    const resume = e.target.files ? e.target.files[0] : "";
    setUserInfo({ ...userInfo, [name]: value, resume: resume });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    const res = await fetch(`/userInfo/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
  };

  const options = [
    {
      label: "Select one",
      value: "",
      disabled: true,
    },
    {
      label: "Programing",
      value: "programing",
    },
    {
      label: "Finance",
      value: "finance",
    },
    {
      label: "Business",
      value: "business",
    },
    {
      label: "Design",
      value: "design",
    },
    {
      label: "Music",
      value: "music",
    },
  ];
  return (
    <>
      <div className="">
        <div className="lg:w-1/2 md:w-4/5 sm:w-4/5 m-auto flex flex-row">
          <div className="mt-5 w-full">
            <p className="text-primary">Personal information</p>
            <p className="text-2xl mt-10 mb-5">
              Please fill in your information
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-control w-full bg-neutral p-4 mb-2">
                <div className="flex p-2 justify-evenly flex-col">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="male"
                      name="gender"
                      value="male"
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="m-2">
                      Male
                    </label>
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="female"
                      name="gender"
                      value="female"
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="m-2">
                      Female
                    </label>
                    <input
                      type="radio"
                      className="radio radio-primary"
                      id="other"
                      name="gender"
                      value="other"
                      onChange={handleChange}
                    />
                    <label htmlFor="other" className="m-2">
                      Other
                    </label>
                  </div>
                  <div>
                    <label className="">Date of Birth</label>
                    <input
                      type="date"
                      placeholder="Date"
                      className="input w-full"
                      name="date_of_birth"
                      onChange={handleChange}
                      value={userInfo.date_of_birth}
                    />
                  </div>
                </div>
              </div>
              <div className="form-control w-full bg-neutral p-4 mb-2">
                <label className="">Field of interest</label>
                <select
                  className="select w-full"
                  name="interest"
                  value={userInfo.interest}
                  onChange={handleChange}
                >
                  {options.map((op, i) => (
                    <option
                      value={op.value}
                      name="interest"
                      key={i}
                      disabled={op.disabled}
                    >
                      {op.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="" className="label">
                  College
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="college name"
                  name="college"
                  onChange={handleChange}
                  value={userInfo.college}
                />
                <label htmlFor="" className="label">
                  Website
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder=" website or portfolio link"
                  name="website"
                  onChange={handleChange}
                  value={userInfo.website}
                />
                <label htmlFor="" className="label">
                  Linkdln
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="linkdln profile"
                  name="linkdln"
                  onChange={handleChange}
                  value={userInfo.linkdln}
                />
                <label htmlFor="" className="label">
                  Github
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="github account"
                  name="github"
                  onChange={handleChange}
                  value={userInfo.github}
                />
                <label htmlFor="" className="label">
                  Resume
                </label>
                <input
                  type="file"
                  className="inline w-full text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neutral file:text-primary file:cursor-pointer"
                  name="resume"
                  onChange={handleChange}
                  // value={userInfo.resume}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserInfo;
