import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

const landingPageStyles = makeStyles(() => ({
  title: {
    fontSize: "60px",
  },

  subTitle: {
    fontSize: "20px",
  },

  link: {
    textDecoration: "none",
    color: "#a5a59e",
    transition: "0.3s",
    "&:hover": {
      color: "white",
    },
  },

  buttons: {
    color: "#a5a59e",
    transition: "0.3s",
    "&:hover": {
      color: "white",
    },
    margin: "20px",
  },

  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    padding: "200px 50px",
  },

  landing: {
    height: "100vh",
  },
}));

export const LandingPage = () => {
  const classes = landingPageStyles();

  //see if user is logged in already, if so redirect

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={classes.landing}>
      <div className={classes.container}>
        <div className={classes.landingText}>
          <h1 className={classes.title}>Trello Board</h1>
          <p className={classes.subTitle}>
            A replica of the popular{" "}
            <a className={classes.link} href="https://trello.com/">
              Trello
            </a>{" "}
            APP
          </p>
        </div>
        <div className={classes.buttonDiv}>
          <Button component = {Link} to ="/register" className={classes.buttons} >
            Sign Up
          </Button>
          <Button component = {Link} to ="/login" className={classes.buttons} >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
