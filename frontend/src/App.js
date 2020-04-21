import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Allplants from "./Plants/Allplants";
import {AddPlant} from "./Plants/AddPlant";
import Nave from "./Navebar/Nave";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Switch, Route, Redirect } from "react-router-dom";
import { Editplant } from "./Plants/Editplant";
import { Alert, Spinner } from "react-bootstrap";
import URL from './config/api'


const App = (props) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // state = {
  //   user: null,
  //   isLogin: false,
  //   userInfo: {}
  // };

  useEffect(() => {
    userLogin();
    getProfileHandle();
  });


  //Login jwt decoding
  const userLogin = () => {
    console.log(user);
    if (user == null) {
      if (localStorage.token) {
        setUser(jwt_decode(localStorage.token).user);
        setIsLogin(true);
        // console.log(user,isLogin)
      } else {
        setUser(null);
        setIsLogin(false);
      }
    } else {
      console.log("hello");
    }
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserInfo({});
    setIsLogin(false);
  };

  const getProfileHandle = () => {
    console.log('user',user,'userinfo',userInfo)
    if (user && !userInfo.firstName) {
      console.log(`${URL}/api/auth/${user.id}`);
      axios.get(`${URL}/api/auth/${user.id}`,'-password').then((result) => {
        console.log("----------", result);
        setUserInfo(result.data.user);
      });
      // console.log("user", user, "userinfo", userInfo);
    }
  };
  
  return (
    <div>
      <Nave user={user} onLogoutHandler={onLogoutHandler} userInfo={userInfo} />
      <Switch>
        <Route exact path="/" component={Allplants} />
        <Route exact path="/AddPlant" component={AddPlant} />
        <Route exact path="/Edit" component={Editplant} />
        <Route
          path="/login"
          render={(props) => <Login {...props} userLogin={userLogin} />}
        />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
