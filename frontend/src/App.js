import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Allplants from "./Plants/Allplants";
import { AddPlant } from "./Plants/AddPlant";
import Nave from "./Navebar/Nave";
import { Login } from "./auth/Login.jsx";
import { Register } from "./auth/Register.jsx";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Switch, Route } from "react-router-dom";
import EditUserInfo from "./user/EditUserInfo";
import { MyGarden } from "./Plants/MyGarden";
import URL from "./config/api";
import OnePlant from "./Plants/OnePlant";
import Editplant from "./Plants/Editplant";

const App = (props) => {
  const [user, setUser] = useState(null);
  // const [isLogin, setIsLogin] = useState(false);
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
    // console.log(user);
    if (user == null) {
      if (localStorage.token) {
        setUser(jwt_decode(localStorage.token).user);
        // setIsLogin(true);
        // console.log(user,isLogin)
      } else {
        setUser(null);
        // setIsLogin(false);
      }
    } else {
      console.log("hello");
    }
  };

  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    setUserInfo({});
    // setIsLogin(false);
  };

  const getProfileHandle = () => {
    console.log("user", user, "userinfo", userInfo);
    if (user && !userInfo.firstName) {
      console.log(`${URL}/api/auth/${user.id}`);
      axios.get(`${URL}/api/auth/${user.id}`).then((result) => {
        console.log("----------", result);
        setUserInfo(result.data.user);
      });
      // console.log("user", user, "userinfo", userInfo);
    }
  };

  const updateUser = async (cred) => {
    // let tempState = { ...this.state };
    try {
      /* put to update already exisiting method */
      await axios.put(`${URL}/api/auth/update`, cred, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      setUserInfo({})
      getProfileHandle()
      // this.getUser(localStorage.getItem("token"));
    } catch (err) {
      // tempState.message = "Unable to update User data!";
      // this.setState(tempState);
    }
  };

  console.log(userInfo);
  return (
    <div>
      <Nave user={user} onLogoutHandler={onLogoutHandler} userInfo={userInfo} />
      <Switch>
        <Route exact path="/" component={Allplants} />
        <Route exact path="/AddPlant" component={AddPlant} />
        <Route
          exact
          path="/MyGarden"
          render={(props) => (
            <MyGarden {...props} userLogin={userLogin} user={userInfo} />
          )}
        />
        <Route exact path="/oneplant" component={OnePlant} />
        <Route path="/EditPlant/:id" component={Editplant} />
        <Route
          exact
          path="/EditUserInfo"
          render={(props) => (
            <EditUserInfo
              {...props}
              userLogin={userLogin}
              user={userInfo}
              update={updateUser}
            />
          )}
        />

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
