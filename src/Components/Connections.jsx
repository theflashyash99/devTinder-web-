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
    <div className="flex justify-center my-10">
      <h1 className="text-bold text-2xl font-mono">Connections</h1>

      {connection.map((connection,i) => (
        <div key={i}>{connection.firstName}</div>
      ))}
    </div>
  );
};

export default Connections;
