import React, { useState, useEffect } from 'react'
import axios from "axios";
import URL from "../config/api";
import {
    Card,
    Button,
    Row,
    Col,
    Container
} from "react-bootstrap";
import PlantCard from "./PlantCard";

export const MyGarden = (props) => {
    const [Plants, setPlants] = useState([]);
    
    // const [DeletePlant, setDeletePlant] = useState();

    useEffect(() => {
            showPlants();
    });
    const showPlants = async () => {
        if (Plants.length < 1) {
            let data = await axios.get(`${URL}/api/MyGarden`, {
                headers: {
                    "x-auth-token": localStorage.getItem("token"),
                }
            });
            console.log("data", data);
            setPlants(data.data.plant);
           
        }
    };

    


    return (
        <div className="mt-5">
            <h6 className="title"> FIND YOUR PLANT</h6>
            <h2 className="title">My Garden .. </h2>
            <Container fluid>
                <Row className={"d-flex justify-content-center"}>
                    <PlantCard Plants={Plants} Flag={true}/>
                </Row>
            </Container>
        </div>
    )
}
