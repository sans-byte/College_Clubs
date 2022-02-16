import React from "react";

function ProjectList() {
  return (
    <div>
      <div className="card lg:card-side card-bordered bg-slate-300 text-neutral">
        <div className="card-body">
          <div className="avatar flex flex-row items-center">
            <div className="w-10 h-10 m-2 rounded-full">
              <img src="http://daisyui.com/tailwind-css-component-profile-2@40w.png" />
            </div>
              <p> Sanskar Jain</p>
          <div className="ml-auto"> 2 hours ago </div>
          </div>
          <h2 className="card-title">Speech to Sign language converter</h2>
          <p>
            Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit
            sit necessitatibus veritatis sed molestiae voluptates incidunt iure
            sapiente.
          </p>
          <h3 className="text-base mt-2"> Members - 5</h3>
          <h3 className="text-base mt-2"> Last date - 14/2/2022</h3>
          <div className="card-actions">
            <button className="btn btn-primary">Ping</button>
            <button className="btn btn-ghost">More info</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
