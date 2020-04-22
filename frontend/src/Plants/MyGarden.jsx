import React, { useState, useEffect } from 'react'
import axios from "axios";
import URL from "../config/api";
import {
    Card,
    Button,
    Row,
    Col
  } from "react-bootstrap";

export const MyGarden = (props) => {
    const [Plants, setPlants] = useState([]);
    const [flag , setFlag] = useState(true);


    useEffect(() => { 
       return ()=>showPlants();
      });
      const showPlants = async () => {
          let data = await axios.get(`${URL}/api/MyGarden` , {headers: {
            "x-auth-token": localStorage.getItem("token"),
          }});
          console.log("data", data);
          if (flag){
            setPlants(data.data.plant);
            setFlag(false);
          }
         
      };

    return (
        <div>
             <Row className="mt-5 justify-content-center">
            { Plants.map(plant => (<Col className="m-3" md={3}>
            <Card style={{ width: '18rem' }}>

                <Card.Img variant="top" src={`${URL}/${plant.image}`} />
                <Card.Body>
                    <Card.Title>Name: {plant.name} </Card.Title>
                    <Card.Text>Type: {plant.type}</Card.Text>
                    <Card.Text>Sun Exposure: {plant.sunTime}</Card.Text>
                    <Card.Text>Description: {plant.description}</Card.Text>
                  <Row className="justify-content-center">
                    <Button className="m-2" variant="primary">Edit</Button>
                    <Button  className="m-2" variant="primary">Delete</Button>
                  </Row>
                </Card.Body>
            </Card>
            </Col> ))}
            </Row>
        </div>
    )
}
