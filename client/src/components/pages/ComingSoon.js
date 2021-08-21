import React from 'react'
import Navbar from '../layout/Navbar'
import Sidebar from '../layout/Sidebar'

const ComingSoon = () => {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Navbar />
      <div className="center-screen" style={{ backgroundColor: "#333333", height: "100%", minHeight: "90vh" }}>
        <h1 style={{ color: "white" }}>
          <b><span className="logo">X</span>artUp |{" "}
            <span className="logo">C</span>lub Fellowship</b></h1>
        <h6 style={{ color: "white" }}>Meet your cofounder, build a startup and pitch to investors in an 8-week live program</h6>
        <br />
        <button className="button1">Apply Now</button>
        <h6 style={{ color: "white" }}>$75,000 free credits</h6>
      </div>
    </div>
  )
}

export default ComingSoon
