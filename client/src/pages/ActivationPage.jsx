import React, { useEffect } from "react";
import { useState } from "react";
import { FaExclamationCircle, FaSmile } from "react-icons/fa";
import { useParams } from "react-router-dom";

function ActivationPage() {
  const [alert, setAlert] = useState(false);
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/activation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });
    const data = await res;
    if (data.status == 422 || !data) {
      console.log("Something went wrong");
    } else {
      setAlert(true);
      console.log("Registered Successfully");
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen flex-col">
      {alert ? (
        <div className="alert shadow-lg alert-success absolute top-10">
          <FaSmile className="m-2" />
          Activation success
        </div>
      ) : null}
      <p className="m-5">Click on this button to activate your account.</p>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Activate
      </button>
    </div>
  );
}

export default ActivationPage;
