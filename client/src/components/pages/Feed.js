import React from "react";
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import PostAdder from "../layout/PostAdder";
import PostItem from "../posts/PostItem";
//import Addpost from "../posts/AddPost";
//import { Link } from 'react-router-dom';
//import AuthContext from "../../context/auth/authContext";
import Posts from "../posts/Posts";

const Feed = () => {

  return (
    <div style={{
      backgroundColor: "var(--slightly-dark)", height: "100%", minHeight: "100vh"
    }}>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Navbar />
      <div className="col-md-6 offset-md-3" id="page-wrap">
        <PostAdder />
        <Posts />
      </div>
    </div>
  )
}

export default Feed
