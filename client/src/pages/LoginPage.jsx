import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "react-google-login";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState();
  const [alert, setAlert] = useState(false);

  const { getUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const validate = (email, password) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!regex.test(email)) {
      errors.email = "Enter valid email";
    }
    if (!password) {
      errors.password = "Please enter your password";
    }
    return errors;
  };
  useEffect(() => {
    setFormError(validate(email, password));
  }, [email, password]);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3 * 1000);
  }, [alert]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      setAlert(true);
      console.log("invalid credentials");
    } else {
      console.log("login success");
      // getUserData(data);
      navigate(`/userinfo/${data._id}`);
    }
  };

  const googleSuccess = async (res) => {
    console.log(res);
  };
  const googleFailure = (err) => {
    console.log(err, "error form google failure function");
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        {alert ? (
          <div className="alert shadow-lg alert-error absolute z-10 top-10">
            <FaExclamationCircle className="m-2" />
            Invalid Credentials
          </div>
        ) : null}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 bg-opacity-90">
          <div className="card-body">
            <GoogleLogin
              clientId="479218861110-hm1rhtjklh99es8qkb60l6iiolqgfkhi.apps.googleusercontent.com"
              render={(renderProps) => (
                <>
                  <div className="w-full btn btn-primary">
                    <FaGoogle className="m-2" />
                    <button
                      className=""
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      color="primary"
                      varient="content"
                      icon={<FaGoogle />}
                    >
                      Sign In with Google
                    </button>
                  </div>
                </>
              )}
              icon={<FaGoogle />}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <div className="divider">OR</div>
            <form method="POST" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-primary"
                  value={email}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <p className="text-center text-red-500">
                {submit ? formError.email : null}
              </p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-primary"
                  value={password}
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                />
                <label className="label">
                  <a href="#" className="label-text-alt">
                    Forgot password?
                  </a>
                </label>
              </div>
              <p className="text-center text-red-500">
                {submit ? formError.password : null}
              </p>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-secondary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
