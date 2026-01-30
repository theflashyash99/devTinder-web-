import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [toast, setToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 px-4">

        {/* Edit Profile Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">Edit Profile</h2>

              {/* First Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              {/* Last Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              {/* Age */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              {/* About */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea textarea-bordered w-full min-h-[120px] resize-y"
                  value={about}
                  placeholder="Tell us about yourself..."
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>

              {/* Gender */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>

              {/* Photo URL */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </fieldset>

              {/* Error */}
              {error && (
                <p className="text-red-500 text-sm font-mono mt-2">
                  {error}
                </p>
              )}

              {/* Save Button */}
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary w-full" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="w-full max-w-md mx-auto lg:mx-0 lg:sticky lg:top-20">
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoURL }}
          />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully ✅</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
