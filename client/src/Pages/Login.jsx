import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Actions/Auth";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Paper } from "@material-ui/core";

const loginStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "500px",
    width: "500px",
    outline: "none",
  },

  div: {
    position: "relative",
    height: "1300px",
  },

  text: {
    color: "#e99386",
  },

  input: {
    "& .Mui-focused": {
      color: "#585858",
    },
  },

  submit: {
    backgroundColor: "#414f55",
    "&:hover": {
      backgroundColor: "#414f55",
    },
  },

  link: {
    color: "#e99386",
  },
}));

const Login = () => {
  const classes = loginStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        <Typography className={classes.text} variant="h4">
          Trello Board
        </Typography>
        <Typography className={classes.text} variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            InputProps={{
              disableUnderline: true,
            }}
            className={classes.input}
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to = "/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
