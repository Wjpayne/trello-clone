import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../Actions/Alert";
import { register } from "../Actions/Auth";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";


const registerStyles = makeStyles((theme) => ({
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
    marginTop: "10px",
  },

  link: {
    color: "#e99386",
  },
}));

const Register = () => {
  const classes = registerStyles();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert("Passwords do not match", "error"));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={classes.div}>
      <Paper className={classes.paper}>
        <Typography className = {classes.text} variant="h4">
          Trello Board
        </Typography>
        <Typography className = {classes.text} variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className={classes.input}
                variant="filled"
                autoComplete="name"
                name="name"
                required
                fullWidth
                label="Your Name"
                autoFocus
                value={name}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className={classes.input}
                variant="filled"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className={classes.input}
                variant="filled"
    
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  disableUnderline: true,
                }}
                className={classes.input}
                variant="filled"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className = {classes.link} to = "./login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
