import React, { Component } from "react";
import { Form, Container, Button } from "react-bootstrap";

export default class EditUserInfo extends Component {
  state = {
    user: this.props.user, //set props from router to state so as to have a controlled form
  };
  update = () => {
    this.props.update(this.state.user);
    this.props.history.push("/");
  };

  changeHandler = (e) => {
    // console.log("name of field", e.target["name"]);
    // console.log("value of field", e.target.value);
    let temp = { ...this.state }; //copy state object
    temp.user[e.target.name] = e.target.value;
    this.setState(temp);
  };
  
  static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
      return {
        user: props.user,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
    //   this.selectNew();
    }
  }


  
  render() {
    console.log(this.props.user);

    let { user } = this.state;
   
    return (
      <div>
        <Container>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="firstName"
              onChange={this.changeHandler}
              value={user.firstName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={this.changeHandler}
              value={user.lastName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={this.changeHandler}
              value={user.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={user.password}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Button variant="primary" onClick={this.update} block>
          Update
          </Button>
        </Container>
      </div>
    );
  }
}
