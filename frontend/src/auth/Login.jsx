import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import Axios from 'axios'

export const Login = (props) => {
    const [login, setLogin] = useState({})
    const [loginAlert, setloginAlert] = useState(false) // to display an alert


    let onChangeInput = ({ target: { name, value } }) => {
        setLogin({ ...login, [name]: value })
    }
    useEffect(() => {
        console.log(login)
    })

    let onSubmit = (e) => {
        e.preventDefault()
        Axios.post('http://localhost:7000/api/auth/login', login)
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token)
                    props.userLogin()
                    props.history.push('/register')
                } else {
                    console.log("Email or Password not correct")
                    setloginAlert(true)
                    setTimeout(() => {
                        setloginAlert(false)
                    }, 4000);
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <>
        {loginAlert && <Alert variant={"danger"}>
        Email or Password not correct !!
            </Alert>}
            <Form className="mt-5">
                <Row className="justify-content-center mt-5">
                    <Col md={8}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => onChangeInput(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onChangeInput(e)} />
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                            Login 
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}