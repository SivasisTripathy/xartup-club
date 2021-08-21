import React, { useContext, useEffect } from "react";
// import Navbar from "../layout/Navbar";
import GoogleButton from "react-google-button";
import axios from "axios";
import AuthContext from "../../context/auth/authContext";

// import React from 'react';
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, register } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const fetchAuthUser = async () => {
    const res = await axios
      .get("http://localhost:5000/api/auth/user", {
        withCredentials: true,
      })
      .then(console.log("Fetch user ran properly"))
      .catch((err) => {
        console.log("Not properly authenticated");
      });

    if (res && res.data) {
      console.log("User: ", res.data);
      register(res.data);
    }
    /* logres({
      googleId: res.data.id,
      fullName: res.data.displayName,
      email: res.data.emails[0].value,
      isEmailVerified: res.data.emails[0].verified,
      profilePic: res.data.photos[0].value,
    }); */
  };

  const redirectToGoogleSignin = async () => {
    let timer = null;
    const googleLoginURL = "http://localhost:5000/api/gauth";
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("Yay we're authenticated");
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };
  function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          XartUp | Club
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      // marginTop: theme.spacing("20"),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const classes = useStyles();

  return (
    <div className="bgt-dark signin text-light">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
          <Typography component="h1" variant="h2">
            <center>
              <b>
                <span className="logo">X</span>artUp |{" "}
                <span className="logo">C</span>lub
              </b>
            </center>
          </Typography>
          <GoogleButton
            className="googleButton"
            onClick={redirectToGoogleSignin}
          />
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Login;