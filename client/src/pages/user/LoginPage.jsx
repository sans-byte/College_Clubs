import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [submit, setSubmit] = useState();
  const [alert, setAlert] = useState(false);

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
    try {
      e.preventDefault();
      setSubmit(true);
      const res = await fetch("/login", {
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
      if (res.status === 400 || !data) {
        setAlert(true);
        console.log("invalid credentials");
      } else if (res.status === 200 && data.info) {
        // console.log("login success");
        // console.log(data);
        // navigate(`/user/${data._id}`);
        navigate("/user");

        // getUserData(data);
      } else if (res.status === 200 && !data.info) {
        navigate(`/userinfo/${data._id}`);
      } else {
        console.log("Something went wrrong please try again");
      }
    } catch (error) {
      console.log(error);
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
              </div>
              <p className="text-center text-red-500">
                {submit ? formError.password : null}
              </p>
              <label className="label">
                <a href="#" className="label-text-alt">
                  Forgot password?
                </a>
              </label>
              <div className="form-control mt-4">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-secondary"
                />
              </div>
              <p className="text-xs mt-2">
                Don't have an account?
                <Link to="/register">
                  <span className="text-primary"> Create one</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
