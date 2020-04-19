import React, { Component } from 'react'
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom";

export default class Nave extends Component {
    render() {
        const authNavDetails = this.props.user ? (
            <>
                <Nav.Link as={Link} to="/login">
                    <NavDropdown title={this.props.user.first_name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Add a plant</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">My Garden</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Reminders</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Link>
                <Nav.Link as={Link} to="/logout" onClick={this.props.logout}>
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
        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Navbar.Brand>iForest</Navbar.Brand>

                        <Nav.Link to="/home">Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link to="/Allplants">Plants</Nav.Link>
                        <Nav.Link to="/"></Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Add a plant</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">My Garden</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Reminders</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                <Nav>
                    <Button variant="outline-light" >login</Button>
                    <Button variant="outline-light" className="ml-3">Register</Button>
                </Nav>
                </Navbar>
            </div >
        )
    }
}
