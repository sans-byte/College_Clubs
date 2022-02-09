import { React, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import {
  FaDesktop,
  FaMusic,
  FaPaintBrush,
  FaPenAlt,
  FaRobot,
  FaFilm,
  FaGamepad,
  FaMoneyCheckAlt,
} from "react-icons/fa";

function InterestsPage() {
  const [buttonSelected, setButtonSelected] = useState("");

  const navigate = useNavigate();

  let interests;
  const { user } = useContext(UserContext);

  const handleClick = function (e) {
    e.preventDefault();
    interests = e.target.value;
    setButtonSelected(e.target.name);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { firstName, lastName, college, phoneNumber, password, email } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        college,
        phoneNumber,
        password,
        email,
        interests,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid registration");
    } else {
      window.alert("Registration success");
      navigate("/register/interest");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-3/4 mx-auto">
        <p className="text-3xl my-10">Tell us what you are intersted in</p>
        <p className="text-md mb-5">Choose the skill you want to work with..</p>
        <div className="card lg:card-side card-bordered shadow-sm">
          <div className="card-body ">
            <div className="grid grid-cols-4 gap-4">
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaDesktop size={"50px"} />
                </figure>
                <div className="card-body lg:px-6 p-1 mt-2">
                  <h2 className="card-title">Programing</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className={`btn btn-outline btn-primary`}
                      onClick={handleClick}
                      value="Programing"
                      name="Programing"
                    >
                      {buttonSelected === "Programing" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaMoneyCheckAlt size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Finance</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Finance"
                      name="Finance"
                    >
                      {buttonSelected === "Finance" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaPenAlt size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Research</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Research"
                      name="Research"
                    >
                      {buttonSelected === "Research" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaMusic size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Music</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Music"
                      name="Music"
                    >
                      {buttonSelected === "Music" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaRobot size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Robotics</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Robotics"
                      name="Robotics"
                    >
                      {buttonSelected === "Robotics" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaFilm size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Animation</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Animations"
                      name="Animations"
                    >
                      {buttonSelected === "Animations" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaPaintBrush size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">UI/UX</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Designing"
                      name="Designing"
                    >
                      {buttonSelected === "Designing" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="card text-center shadow-2xl">
                <figure className="px-2 pt-3">
                  <FaGamepad size={"50px"} />
                </figure>
                <div className="card-body p-1 mt-2">
                  <h2 className="card-title">Gaming</h2>
                  <p></p>
                  <div className="justify-center card-actions">
                    <button
                      className="btn btn-outline btn-primary"
                      onClick={handleClick}
                      value="Gaming"
                      name="Gaming"
                    >
                      {buttonSelected === "Gaming" ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-secondary w-3/5" onClick={handleRegister}>
          Register
        </button>
      </div>
    </>
  );
}

export default InterestsPage;
