import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Login = () => {
  const [email, setEmailId] = useState("Donald@gmail.com");
  const [password, setPassword] = useState("Donald@12345");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:9999/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      ); // withcredentials : true help in frontend axios to set cookies inside the browser

      dispatch(addUser(res.data));


    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID </legend>
              <input
                type="text"
                className="input"
                value={email}
                placeholder=""
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                placeholder=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
