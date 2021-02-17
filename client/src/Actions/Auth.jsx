import axios from "axios";
import { setAlert } from "./Alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./Types";
import setAuthToken from "./utils/SetAuthToken";



// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/users", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};


//LOCAL!!!!!!


// const url = "http://localhost:5000"

// // Load User
// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get(url + "/auth");

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

// // Register User
// export const register = ({ name, email, password }) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ name, email, password });

//   try {
//     const res = await axios.post(url + "/users", body, config);

//     dispatch({
//       type: REGISTER_SUCCESS,
//       payload: res.data,
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
//     }

//     dispatch({
//       type: REGISTER_FAIL,
//     });
//   }
// };



// // Login User
// export const login = (email, password) => async (dispatch) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   const body = JSON.stringify({ email, password });

//   try {
//     const res = await axios.post(url + "/auth", body, config);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data,
//     });

//     dispatch(loadUser());
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
//     }

//     dispatch({
//       type: LOGIN_FAIL,
//     });
//   }
// };

// // Logout
// export const logout = () => async (dispatch) => {
//   dispatch({ type: LOGOUT });
// };

