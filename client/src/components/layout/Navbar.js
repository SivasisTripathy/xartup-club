import React, { Fragment, useContext } from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
/* import ContactContext from '../../context/contact/contactContext'; */

const Navbar = () => {

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li><img className="profilePic" src={user && user.profilePic} alt="" /></li>
      <li style={{ paddingTop: "0.75rem", marginLeft: "0.60rem" }}>{user && user.fullName} </li>
      <li style={{ paddingTop: "0.75rem" }}>
        <a onClick={onLogout} href='/login'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span >Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bgt-dark sticky'>
      <h1 style={{ paddingLeft: '4rem', marginBottom: '0' }}>
        <Link to='/'><b><span className="logo">X</span>artUp |{" "}
          <span className="logo">C</span>lub</b></Link>
      </h1>
      <ul style={{
        paddingLeft: "0px",
        marginBottom: "0px",
        fontFamily: "Roboto",
        fontSize: "1rem",
        lineHeight: "1.6",
      }}>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
