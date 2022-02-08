import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom"

function SignInPage() {

  const [user , setUser] = useState({
    firstName:"",lastName:"",college:"",password:"",confirmPassword:"",email:"",phoneNumber:"",
  })
  const handleChange = (e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user,[name]:value});
    console.log(user);
  }

  return (
    <>
      <div className="hero min-h-screen" style={{backgroundImage:`url(../images/Puzzle.png)`,
      backgroundSize:"cover",backgroundRepeat:"no-repeat"
      }}>
        <div className="flex-col justify-center hero-content lg:flex-row ">
          <div className="text-center lg:text-left">
            <h1 className="mb-5 text-5xl font-bold text-neutral">Register</h1>
            <p className="mb-5 text-neutral">
              Get started with the amazing world of collaboration and
              brainstroming and show the world your talent...
            </p>
          </div>
          <div className="rounded-md shadow-2xl bg-base-100 bg-opacity-90
          ">
            <div className="p-5">
              <form method="post" action="/register">
                <div className="form-control flex flex-row">
                  <div className="w-full">
                    <label className="label" htmlFor="firstName">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First name"
                      className="input input-primary w-full"
                      name="firstName"
                      autoComplete="off"
                      onChange={handleChange}
                      value={user.firstName}
                    />
                  </div>
                  <div className="ml-2 w-full">
                    <label className="label" htmlFor="lastName">
                      <span className="label-text">Last Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-primary w-full"
                      name="lastName"
                      autoComplete="off"
                      onChange={handleChange}
                      placeholder="Last name"
                      value={user.lastName}
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="phoneNumber">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone number"
                    autoComplete="off"
                    onChange={handleChange}
                    className="input input-primary"
                    value={user.phoneNumber}
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="input input-primary"
                    autoComplete = "off"
                    onChange={handleChange}
                    value={user.email}
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="college">
                    <span className="label-text">College</span>
                  </label>
                  <input
                    type="text"
                    id="college"
                    name="college"
                    placeholder="College"
                    className="input input-primary"
                    autoComplete="off"
                    onChange={handleChange}
                    value={user.college}
                  />
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="input input-primary"
                    autoComplete="off"
                    onChange={handleChange}
                    value={user.password}
                  />
                </div>
                {/* <div className="form-control">
                  <label className="label" htmlFor="password">
                    <span className="label-text">Confirm password</span>
                  </label>
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    className="input input-primary"
                  />
                </div> */}
                <div className="form-control mt-6">
                  <input
                    type="button"
                    value="Register"
                    className="btn btn-secondary"
                  />
                </div>
                <p className="text-neutral">Already have an account ?<Link to="/login"><span className="text-primary"> Login </span></Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInPage;
