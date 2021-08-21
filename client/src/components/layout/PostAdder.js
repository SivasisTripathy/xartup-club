import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';

const Addpost = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const gotoadd = () => {
    window.location.href = '/addpost';
  };
  return (
    <div className="text-center">
      <h3 style={{ margin: "2rem 0", color: "black" }} ><b>"Someone will steal my idea is the biggest myth"</b></h3>
      <div className="butt1" ><img className="profilePic" src={user && user.profilePic} alt="" />
        <button className="butt2" onClick={gotoadd}><b>Post Your Idea</b></button>
      </div>
    </div>
  )
}

export default Addpost
