import React from 'react'
import {
    Card,
    Button,
    Row,
  } from "react-bootstrap";

export const MyGarden = () => {
    return (
        <div>
             <Row className="mt-5 justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Name: </Card.Title>
                    <Card.Text>Type: </Card.Text>
                    <Card.Text>Sun Exposure: </Card.Text>
                    <Card.Text>Description: </Card.Text>
                  <Row className="justify-content-center">
                    <Button className="m-2" variant="primary">Edit</Button>
                    <Button  className="m-2" variant="primary">Delete</Button>
                  </Row>
                </Card.Body>
            </Card>
            </Row>
        </div>
    )
}
