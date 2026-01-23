import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  

  const handleLogOut = async () => {
    try {
      const Logout = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err)
      
    }
  };
  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            {" "}
            👨‍💻DevTinder
          </Link>
        </div>
        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5 flex ">
              <p className="px-4 my-3 font-mono "> Welcome, {user.firstName}</p>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full  ">
                  <img alt="User Photo" src={user.photoURL} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
