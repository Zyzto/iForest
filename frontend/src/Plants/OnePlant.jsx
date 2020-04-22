import React, { Component } from 'react'
import { Container, Row, Col, Image, Card, ListGroup, Button } from 'react-bootstrap'
import URL from '../config/api'
import Axios from 'axios'

export default class OnePlant extends Component {
    state={
        plant: {}
    }
    // console.log(this.props.match.params.id)
    componentDidMount(){
    //     Axios.get(`${URL}/api/plant/${this.props.match._id}`)
    //   .then(
    //     (res) =>
    //       this.setState({
    //         plant: res.data.plant,
    //       })
    //   )
    //       .catch(err => {
    //           console.log(err)
    //       })

    }
    
render(){
    console.log(this.state.plant);
    return (
        <div>
            <h2>Palnt Ditelas</h2>
            <Container>
                <Row className="mt-5">
                    <Col md={{ span: 4, offset: 2 }}><Image src={this.state.plant.imge} style={{ height: "100%", width: "100%" }} /></Col>

                    <Col md={{ span: 3, offset: 1 }}><Card style={{ width: '18rem' }}>
                        <Card.Header className="text-center">{this.state.plant.name}</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{this.state.plant.type}</ListGroup.Item>
                            <ListGroup.Item>{this.state.plant.description}</ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="submit" value="Submit" block>Edit</Button>
                                </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
}
