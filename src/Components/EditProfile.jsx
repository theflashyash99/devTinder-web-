import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  //   const [email, setEmailId] = useState("Donald@gmail.com");
  //   const [password, setPassword] = useState("Donald@12345");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [toast,setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("")
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
      console.log(res);
      dispatch(addUser(res));
      setToast(true);
      setTimeout(()=>{
        setToast(false);
      },3000)
    } catch (err) {
      console.error(err);
      setError(err.response.data);
    }
  };

  return (
    user && (
      <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">FirstName </legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    placeholder=""
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">LastName</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    placeholder=""
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    placeholder=""
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    placeholder=""
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    placeholder=""
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="text"
                    className="input"
                    value={photoURL}
                    placeholder=""
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500 p-2 font-mono">{error}</p>

              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, age, gender, about, photoURL }}
          />
        </div>
     </div>
     { toast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile save successfully.</span>
  </div>
</div>)}
      </>
    )
  );
};

export default EditProfile;
