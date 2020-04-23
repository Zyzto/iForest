import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../config/api";
import { Row, Container } from "react-bootstrap";
import PlantCard from "./PlantCard";

export const MyGarden = (props) => {
  const [Plants, setPlants] = useState([]);

  // const [DeletePlant, setDeletePlant] = useState();

  useEffect(() => {
    showPlants();
    console.log("NOT PLANTS +++++++", Plants);
  });
  const showPlants = async () => {
    let data = await axios.get(`${URL}/api/MyGarden`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    console.log("-098765434231", data.data.plant);
    if (data.data.plant.length >= 1) {
      console.log("NOT HEREREREER");
      if (Plants.length === 0) {
        console.log("MAYBE !)!)!)!)!HEREREREER");
        setPlants(data.data.plant);
      }
    }
  };

  return (
    <div className="mt-5">
      <h6 className="title"> FIND YOUR PLANT</h6>
      <h2 className="title">My Garden .. </h2>
      <Container fluid>
        <Row className={"d-flex justify-content-center"}>
          <PlantCard
            Plants={Plants}
            Flag={true}
            setPlants={setPlants}
            userInfo={props.userInfo}
          />
        </Row>
      </Container>
    </div>
  );
};
