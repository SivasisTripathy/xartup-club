import React from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';

const About = () => {
  return (
    <div>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <Navbar />
      <div className="center-screen" style={{ backgroundColor: "#333333", height: "100%", minHeight: "90vh", color: "white" }}>
        <h1>About This Site</h1>
        <p className='my-1'>
          This is for the <b><span className="logo">X</span>artUp |{" "}
            <span className="logo">C</span>lub</b>
        </p>
        <p className='bg-tdark p'>
          <strong>Version: </strong> 1.0.0
        </p>
      </div>
    </div>
  );
};

export default About;
