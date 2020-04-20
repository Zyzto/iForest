import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, NavDropdown, Spinner } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
import URL from "../config/api";

const Nave = () => {
  const [userInfo, setuserInfo] = useState({});

  const getName = async () => {
    let user = await jwt_decode(localStorage.token).user;
    console.log(`${URL}/api/auth/${user.id}`);
    axios.get(`${URL}/api/auth/${user.id}`).then((result) => {
      console.log("----------", result);
      setuserInfo(result.data.user);
    });
    if (user) {
    }
  };
  useEffect(() => {
    getName();
    console.log(userInfo);
  }, []);

  const authNavDetails = userInfo ? (
    <>
      <NavDropdown
        title={userInfo.firstName}
        alignRight
        id="dropdown-menu-align-right"
      >
        <LinkContainer to="#action_3.1">
          <NavDropdown.Item>Account</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="#action_3.2">
          <NavDropdown.Item>Add a plant</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="#action_3.3">
          <NavDropdown.Item>My Garden</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
      <Nav.Link
        as={Link}
        to="/logout"
        onClick={() => {
          localStorage.removeItem("token");
          this.forceUpdate();
          Redirect("/");
        }}
      >
        Logout
      </Nav.Link>
    </>
  ) : (
    <>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
    </>
  );
  return userInfo ? (
    <>
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand as={Link} to="/">
            iForest
          </Navbar.Brand>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="#hello">
            Reminders
          </Nav.Link>
        </Nav>
        <Nav>{authNavDetails}</Nav>
      </Navbar>
    </>
  ) : (<>
      {console.log('hello')}
      <Spinner animation="border" />
      </>
  );
};

export default Nave;
