import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import URL from "../config/api";
import PlantCard from "./PlantCard";

const Allplants = (props) => {
  const [Plants, setPlants] = useState([]);
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
  console.log("ALLLLLLL", props.userInfo);
  return (
    <div>
      <h1 className="title-1"> Welcome aboard!</h1>
      <h2 className="title-2">
        Engage with plant lovers from all over the world .. <br />
        Explore the plant care guide !!{" "}
      </h2>
      <Container className="d-flex  justify-content-center">
        <Row className="d-flex justify-content-center">
          <PlantCard
            Plants={Plants}
            userInfo={props.userInfo}
            updateFav={props.updateFav}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Allplants;
