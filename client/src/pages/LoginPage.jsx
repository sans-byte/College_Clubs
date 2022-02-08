import React from "react";

function LoginPage() {
  return (
    <div>
      <div
        className="hero min-h-screen bg-base-200"
        style={{
          "backgroundImage": `url(../images/Growth.jpg)`,
        }}
      >
        <div className="flex-col justify-center hero-content lg:flex-row text-neutral">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold">Login</h1>
            <p className="mb-5">
              Welcome back to space nice to see you again, hope you are doing
              well...
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-90">
            <div className="card-body">
              <form action="/login" method="post">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="input input-primary"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Password"
                    className="input input-primary"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="button"
                    value="Login"
                    className="btn btn-secondary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
