import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Actions/Auth";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, AppBar, Toolbar } from "@material-ui/core";


const navStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: "#fff",
  },

  link: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
    textDecoration: "none",
    fontSize: "20px",
    color: "#bbbc75"
  },
}));

export const NavBar = () => {
  const classes = navStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return "";
  }

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.navbar}>
        <Toolbar className={classes.link} variant="dense">
          <Link className={classes.link}  to="/dashboard">
            Home
          </Link>
          <Link className={classes.link} to="/dashboard">
            Trello Board
          </Link>
          <Link
            className={classes.link}
            to="/"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
