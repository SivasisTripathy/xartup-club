import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      localStorage.setItem('authState', JSON.stringify({
        ...state,
        user: action.payload
      }));
      //console.log("Bleh:", action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      }
    case AUTH_ERROR:
    case LOGOUT:
    case REGISTER_FAIL:
      localStorage.removeItem('authState');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;