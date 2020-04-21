import React, { useState } from 'react'
import { Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import Axios from 'axios';
import URL from '../config/api';

export const Editplant = (props) => {

    // const [plant, setPlant] = useState({});
    const setFile = useState(null);

    let onChangeInput = ({ target: { name, value } }) => {
        // setPlant({
        //      setPlant({ ...plant, [name]: value });
        // })
    }

    let onChangeHandler = (event) => {

        setFile(event.target.files[0])
    }

    let onSubmit = () => {
        const data = new FormData()
        data.append('file', this.state.setFile)
        Axios.post(`${URL}/plant/:id`, data)
            .then(res => {
                console.log(res.statusText)
                props.history.push("/");
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            <h2 className="text-center">Edit Plants</h2>
            <Form className="mt-5">
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Plant name</Form.Label>
                            <Form.Control type="text" placeholder="plant name" name="name" onChange={(e) => onChangeInput(e)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col md={2}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Plant Type</Form.Label>
                            <Form.Control as="select" name="type" onChange={(e) => onChangeInput(e)}>
                                <option>Flower</option>
                                <option>Liverworts</option>
                                <option>Hornworts</option>
                                <option>Mosses</option>
                                <option>Ferns</option>
                                <option>Conifers</option>
                                <option>Cycads</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Label>Image</Form.Label>
                        <Form.File
                            id="custom-file"
                            label="Image of the plant"
                            name="image"
                            onChange={(e) => onChangeHandler(e)}
                            custom
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>Edit</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}