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
      console.log(res.data);
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
    <div className=" text-center my-10">
      <h1 className="font-extrabold  font-mono text-4xl">Connections</h1>

      {connection.map((connections) => {
        const { firstName, lastName, photoURL, age, gender, about } =
          connections;

        return (
          <div className=" flex m-4 p-4 bg-base-300 rounded-2xl shadow-2xl w-1/2 mx-auto">
            <div>
              {" "}
              <img
                src={photoURL}
                alt="photoURL"
                className="w-30 h-30 rounded-lg  "
              />
            </div>
            <div className="text-left mx-50 py-6 ">
              <h2 className="font-extrabold text-xl">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              <h2>{gender + ", "+ age}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
