import { Provider } from "react-redux";
import "./App.css";
import setAuthToken from "./Actions/utils/SetAuthToken";
import { loadUser } from "./Actions/Auth";
import store from "./store";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Board from "./Components/Board/Board/Board";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/board/:id" component={Board} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
