import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Allplants from "./Plants/Allplants";
import Nave from "./Navebar/Nave";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import jwt_decode from "jwt-decode";
import { Switch, Route, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default class App extends Component {
  state = {
    user: null,
    isLogin: false,
  };

  componentDidMount() {
    this.userLogin();
  }

  //Login jwt decoding
  userLogin = async() => {
    if (localStorage.token) {
      let user = await jwt_decode(localStorage.token).user;
      this.setState({
        user,
        isLogin: true,
      });
    } else {
      this.setState({
        user: null,
        isLogin: false,
      });
    }
  };
  render() {
    return (
      <div>
        {console.log('User------',this.state.user)}
        <Nave user={this.state.user} />
        <Switch>
          <Route exact path="/" component={Allplants} />
          <Route
            path="/login"
            render={(props) => <Login {...props} userLogin={this.userLogin} />}
          />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}
