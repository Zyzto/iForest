import React, { useState, useEffect } from "react";
import { Row, Form, Col, Button } from "react-bootstrap";
import Axios from "axios";
import URL from "../config/api";

const EditPlant = ({ history, match }) => {
  const [plant, setPlant] = useState({}); // plant info
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("Choose Image");
  const [oldPlant, setOldPlant] = useState({});

  useEffect(() => {
    fetchOldPlant();
    // setPlant({ type: oldPlant.type });
    console.log(oldPlant);
    console.log("PLANTTTTT", plant);
  });
  //fetch plant info
  const fetchOldPlant = async () => {
    const plantId = match.params.id;
    let data = await Axios.get(`${URL}/api/plant/${plantId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    // console.log("HELLLLLLLLLLLLLLLLL", data);
    if (!oldPlant.name) {
      //Show only name without auto genrated Number
      data.data.message.image = data.data.message.image.split(/-(.+)/)[1];
      setOldPlant(data.data.message);
    }
  };

  //to add the input inside plant
  let onChangeInput = ({ target: { name, value } }) => {
      if (name === "type") setOldPlant({ ...oldPlant, ["type"]: "" });
      if (name === "sunTime") setOldPlant({ ...oldPlant, ["sunTime"]: "" });
    setPlant({ ...plant, [name]: value });
  };

  //method for uploading file (image)
  let onChangeHandler = (event) => {
    if (event.target.files[0]) setOldPlant({ ...oldPlant, ["image"]: "" });
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  // to add the plant info to database
  let onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("plant", JSON.stringify(plant));
    console.log("DATAAAAA", data);
    Axios.put(`${URL}/api/plant/${oldPlant._id}`, data, {
      plant: JSON.stringify(plant),
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res);

        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  //==================================================
  return (
    <div className="mt-5">
      <h6 className="title"> PLANT COLLECTION</h6>
      <h2 className="title"> Edit your plant .. </h2>
      <Form className="mt-5">
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Plant name</Form.Label>
              <Form.Control
                type="text"
                placeholder={oldPlant.name}
                name="name"
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={2}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Plant Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={oldPlant.type !== "" ? oldPlant.type : plant.type}
                onChange={(e) => onChangeInput(e)}
              >
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
              label={oldPlant.image !== "" ? oldPlant.image : filename}
              name="image"
              onChange={(e) => onChangeHandler(e)}
              custom
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Sun Exposure</Form.Label>
              <Form.Control
                as="select"
                name="sunTime"
                value={
                  oldPlant.sunTime !== "" ? oldPlant.sunTime : plant.sunTime
                }
                onChange={(e) => onChangeInput(e)}
              >
                <option>Full Sun</option>
                <option>Light Shade</option>
                <option>Partial Shade</option>
                <option>Full Shade</option>
                <option>Dense Shade</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="description"
                placeholder={oldPlant.description}
                onChange={(e) => onChangeInput(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="primary"
            className="bn-primary"
            type="submit"
            onClick={(e) => onSubmit(e)}
          >
            Add Plant
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default EditPlant;
