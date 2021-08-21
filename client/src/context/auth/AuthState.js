import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../types';

const AuthState = (props) => {

  const inst = JSON.parse(localStorage.getItem('authState'));
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null
  };
  if (inst) {
    initialState.isAuthenticated = inst.isAuthenticated;
    initialState.user = inst.user;
    initialState.error = inst.error;
  }
  localStorage.setItem('authState', JSON.stringify(initialState));
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    //console.log("Token lu:", localStorage.getItem('token'));
    setAuthToken(localStorage.getItem('token'));

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.msg
      });
    }
  };
  const register = async (received) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      //console.log(received);
      const tok = await axios.post("http://localhost:5000/api/auth/logres", received, config)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: tok.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  }

  // Logout
  const logout = async () => {
    dispatch({ type: LOGOUT })
    const res = await axios.get('http://localhost:5000/api/gauth/logout')
    console.log(res)
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        error: state.error,
        isLoading: state.isLoading,
        register,
        loadUser,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
