import React, { Component } from 'react'
import { Card, Button, Container, Row } from "react-bootstrap"

export default class Allplants extends Component {
    render() {
        return (
            <div>
                <h3>Plants</h3>
                <Container className='mt-5'>
                    <Row className="mt-5 justify-content-center">
                        
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        {/* Show all plant */}
                                    </Card.Text>
                                    <Button variant="primary">Show</Button>
                                </Card.Body>
                            </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}
