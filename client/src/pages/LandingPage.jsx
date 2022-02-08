import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(../images/Goal.jpg)` }}
      >
        <div className="hero-overlay bg-opacity-10"></div>
        <div className="text-center hero-content text-neutral-content bg-neutral bg-opacity-60 rounded-md p-10 w-3/5">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome To Space</h1>
            <p className="mb-5">
              A platform where anyone can collaborate and combine their ideas
              with people with the same interest all around the globe. A one and
              only platform that allows a person to cross its regional
              boundries.
            </p>
            <p className="mb-5">
              Come lets crete something better together....
            </p>
            <Link to="/register">
              <button className="btn btn-primary">
                Get Started
                <FiArrowRight className="ml-2 mt-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div
      className="hero min-h-screen"
      style={{ backgroundImage:`url(../images/Puzzle.png)`}}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome To Space</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started
          <FiArrowRight className="ml-2 mt-1"/>
          </button>
        </div>
      </div>
    </div>
    <div
      className="hero min-h-screen"
      style={{ backgroundImage:`url(../images/Growth.jpg)`}}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold ">Welcome To Space</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started
          <FiArrowRight className="ml-2 mt-1"/>
          </button>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default LandingPage;
