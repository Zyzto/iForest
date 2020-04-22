import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import URL from "../config/api";
import PlantCard from "./PlantCard";

const Allplants = () => {
  const [Plants, setPlants] = useState([]);
  const [image, setImage] = useState([]);
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  useEffect(() => {
    showPlants();
    console.log("Plants", Plants, Plants.length);
  });
  const showPlants = async () => {
    if (Plants.length < 1) {
      let data = await axios.get(`${URL}/api/plants`);
      console.log("data", data);
      console.log("here");
      setPlants(data.data.message);
    }
  };

  return (
    <div>
      <h3>Plants</h3>
      <Container fluid>
        <Row className={"d-flex justify-content-center"}>
          <PlantCard Plants={Plants} />
        </Row>
      </Container>
    </div>
  );
};

export default Allplants;
