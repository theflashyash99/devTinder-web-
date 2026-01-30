import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!requests) return <h1 className="text-center mt-10">Loading...</h1>;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-lg font-semibold">
        No Connections Found!
      </h1>
    );

  return (
    <div className="my-12 px-4">
      <h1 className="text-center font-extrabold text-4xl text-white mb-10">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { firstName, lastName, photoURL, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex flex-col sm:flex-row sm:items-center gap-6
                       bg-base-300 hover:bg-base-200 transition-all duration-300
                       rounded-2xl shadow-xl p-6 mb-6 max-w-2xl mx-auto"
          >
            {/* Profile Image */}
            <div className="flex justify-center sm:justify-start">
              <img
                src={photoURL}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-primary"
              />
            </div>

            {/* User Info */}
            <div className="flex flex-col gap-1 text-center sm:text-left flex-1">
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-secondary w-full sm:w-auto"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
