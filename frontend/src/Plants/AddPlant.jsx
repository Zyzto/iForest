import React, { useState } from 'react'
import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import Axios from "axios";
import URL from "../config/api";

export const AddPlant = (props) => {
    const [plant, setPlant] = useState({}); // plant info
    const [file, setFile] = useState(null);

    //to add the input inside plant
    let onChangeInput = ({ target: { name, value } }) => {
        setPlant({ ...plant, [name]: value });
    };

    //method for uploading file (image)
    let onChangeHandler = (event) => {
        setFile(event.target.files[0])
    }

    // to add the plant info to database
    let onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', file)
        data.append("plant", JSON.stringify(plant));
        Axios.post(`${URL}/api/plant/create`, data, { plant: JSON.stringify(plant) ,headers: {
            "x-auth-token": localStorage.getItem("token"),
          } })
            .then((res) => {
                console.log(res)

                props.history.push("/");
            })
            .catch((err) => console.log(err));
    };
    //==================================================
    return (
        <div className="mt-5">
             <h6 className="title"> PLANT COLLECTION</h6>
            <h2 className="title"> Add you plant .. </h2>
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
                        <Form.Label>Upload image</Form.Label>
                        <Form.File
                            id="custom-file"
                            label="Upload an image of the plant"
                            name="image"
                            onChange={(e) => onChangeHandler(e)}
                            custom
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Sun Exposure</Form.Label>
                            <Form.Control type="text" placeholder="full sun to partial shade" name="sunTime" onChange={(e) => onChangeInput(e)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name="description" onChange={(e) => onChangeInput(e)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button 
                    variant="primary"
                    className="bn-primary"
                    type="submit"
                    onClick={(e) => onSubmit(e)}>
                        Add Plant
                    </Button>
                </Row>
            </Form>
        </div>
    )
}
