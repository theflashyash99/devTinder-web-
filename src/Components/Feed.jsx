import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feeds) return;

    try {
      const res = await axios.get(BASE_URL + "/feed" , {withCredentials:true});
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err)
     
    }
  };


  useEffect(()=>{
    getFeed();
  },[])
  return feeds && (<div className="my-4 flex justify-center"><UserCard user={feeds.data[0]}/></div>);
};

export default Feed;
