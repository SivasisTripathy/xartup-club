import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import PostContext from '../../context/posts/postContext'
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

const PostItem = ({ post }) => {
  const postContext = useContext(PostContext)
  const { deletePost, setCurrent, clearCurrent } = postContext
  const authContext = useContext(AuthContext)
  console.log("Batra: vs", post)
  //const { user } = authContext
  /* const post = { "_id": { "$oid": "611e32b57c506a511cd3fc0b" }, "upvotes": [], "title": "My Submission for Text Editor and Python", "description": "Sobhan is my bitch\nfyuolfyl", "user": { "$oid": "61160c3acec9fe488c1839bb" }, "userName": "Sivasis Tripathy", "userCompany": "The Hub", "userImage": "https://lh3.googleusercontent.com/a-/AOh14GgCDdD1Dby0hC31kK0ydwOTbgWjK2prP1gQizo-6g=s96-c", "date": { "$date": "2021-08-19T10:30:13.346Z" }, "comments": [], "__v": 0 } */
  return (
    <div className="card card-body mb-3 post-item">
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <img style={{ borderRadius: "100%", width: "4rem", height: "4rem" }} src={post.userImage} alt="user" />
        <div style={{ width: "70%", paddingTop: "0.25rem", marginLeft: "1rem" }}>
          <h5><b>{post.userName}</b></h5>
          <h6>{post.userCompany}</h6>
        </div>
      </div>
      <h5><b>{post.title}</b></h5>
      <p>{post.description}</p>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
