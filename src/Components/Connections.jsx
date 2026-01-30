import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connection) return <h1>Loading...</h1>;

  if (connection.length === 0) return <h1>No Connections Found!</h1>;
 return (
  <div className="my-12 px-4">
    <h1 className="text-center font-extrabold text-4xl text-white mb-10">
      Connections
    </h1>

    {connection.map((connections) => {
      const { firstName, lastName, photoURL, age, gender, about } =
        connections;

      return (
        <div
          key={connections._id}
          className="flex items-center gap-6 bg-base-300 hover:bg-base-200
                     transition-all duration-300 rounded-2xl shadow-xl
                     p-6 mb-6 max-w-2xl mx-auto"
        >
          {/* Profile Image */}
          <img
            src={photoURL}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />

          {/* User Info */}
          <div className="flex flex-col gap-1 text-left">
            <h2 className="text-xl font-bold text-white">
              {firstName} {lastName}
            </h2>

            <p className="text-sm text-gray-300 line-clamp-2">
              {about || "No bio available"}
            </p>

            <span className="text-sm font-medium text-primary">
              {gender}, {age}
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

};

export default Connections;
