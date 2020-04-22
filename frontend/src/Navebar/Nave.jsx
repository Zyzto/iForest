import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import URL from "../config/api";

const Nave = ({ onLogoutHandler, userInfo }) => {
  // const [userInfo, setuserInfo] = useState({});

  // const getName = async () => {
  //   if (localStorage.token) {
  //     let user = await jwt_decode(localStorage.token).user;
  //     console.log(`${URL}/api/auth/${user.id}`);
  //     axios.get(`${URL}/api/auth/${user.id}`).then((result) => {
  //       console.log("----------", result);
  //       setuserInfo(result.data.user);
  //     });
  //   }
  // };
  useEffect(() => {
    // getName();
    // console.log("", userInfo);
  }, []);

  const authNavDetails = localStorage.token ? (
    <>
      {userInfo.firstName ? (
        <>
          <Nav.Link as={Link} to="#hello">
            Reminders
          </Nav.Link>
          <NavDropdown
            title={userInfo.firstName}
            alignRight
            id="dropdown-menu-align-right"
          >
            <LinkContainer to="/EditUserInfo">
              <NavDropdown.Item>Account</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/AddPlant">
              <NavDropdown.Item>Add a plant</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/MyGarden">
              <NavDropdown.Item>My Garden</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </>
      ) : (
        <Spinner />
      )}
      <Nav.Link
        as={Link}
        to="/"
        onClick={() => {
          onLogoutHandler();
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
      <Navbar className="nav" bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand as={Link} to="/">
            iForest
          </Navbar.Brand>
        </Nav>

        <Nav>{authNavDetails}</Nav>
      </Navbar>
    </>
  ) : (
    <>
      {console.log("hello")}
      <Spinner animation="border" />
    </>
  );
};

export default Nave;
