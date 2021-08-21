import axios from 'axios';

const setAuthToken = token => {
  /* console.log('Def header:', axios.defaults.headers.common['x-auth-token']);
  axios.defaults.headers.common['x-auth-token'] = token;
  console.log('New header:', axios.defaults.headers.common['x-auth-token']); */
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
