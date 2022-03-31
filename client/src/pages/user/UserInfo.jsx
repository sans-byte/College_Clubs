import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    gender: "",
    date_of_birth: "",
    picture: "",
    interest: "",
    college: "",
    linkdln: "",
    github: "",
    resume: "",
    formData: new FormData(),
  });

  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const imageInputRef = useRef();

  // info : on page load if the user has already been given information then redirect to projects page
  useEffect(async () => {
    const res = await fetch(`/userinfo/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      navigate(`/user/${id}`, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    } else {
      setPreview(null);
    }
  }, [image]);

  const { formData } = userInfo;

  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const value =
      name === "resume" || name === "picture"
        ? e.target.files[0]
        : e.target.value;
    if (name === "picture" && value && value.type.substr(0, 5) === "image") {
      // todo : check for image size and send alert
      setImage(value);
    }
    formData.set(name, value);
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/userinfo/${id}`, {
      method: "POST",
      body: formData,
    });
    const data = await res;
    if (res.status === 200) {
      navigate(`/user`);
    } else {
      navigate(`/login`);
    }
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
                    <label className="label">Date of Birth</label>
                    <input
                      type="date"
                      placeholder="Date"
                      className="input w-full"
                      name="date_of_birth"
                      onChange={handleChange}
                      value={userInfo.date_of_birth}
                    />
                  </div>
                  <label htmlFor="" className="label">
                    Profile Picture
                  </label>
                  <div className="flex flex-row">
                    {preview ? (
                      <div className="w-36 h-36 overflow-hidden rounded-full bg-white">
                        <img src={preview} alt="" className="object-cover" />
                      </div>
                    ) : (
                      <button
                        type="image"
                        onClick={(e) => {
                          e.preventDefault();
                          imageInputRef.current.click();
                        }}
                        className="w-36 h-36 rounded-full bg-white text-neutral"
                      >
                        Add picture
                      </button>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="inline text-sm text-slate-500 file:hidden my-auto m-4"
                      name="picture"
                      ref={imageInputRef}
                      onChange={handleChange}
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
