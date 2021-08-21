import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return <h1>Thanks for loggin in!</h1>;
}

export default LoginSuccess
