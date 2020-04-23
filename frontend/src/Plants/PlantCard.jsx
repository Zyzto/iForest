import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Spinner,
  Modal,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import URL from "../config/api";
import axios from "axios";

const PlantCard = ({ Plants, Flag, setPlants, userInfo, updateFav }) => {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setModalInfo({});
    }, 200);
  };
  function handleShow(plant) {
    setShow(true);
    setModalInfo(plant);
  }

  //Delete
  const handleDelete = async (id) => {
    await axios.delete(`${URL}/api/plant/${id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setPlants(Plants.filter((v) => v.id === id));
  };

  const handleFav = (id, check) => {
    updateFav({ id });
    // if (check === "❤️") {
    //   let list = { savePlants: [userInfo.savePlants.filter(id)] };
    //   updateFav(list);
    //   console.log("1 LIST", list);
    // } else {
    //   let list = { savePlants: [userInfo.savePlants.push(id)] };
    //   updateFav(list);
    //   console.log("2 LIST", list);
    // }
    // if (userInfo.savePlants.length >= 1) {
    //   if (check === "❤️") {
    //     let list = { savePlants: [userInfo.savePlants.filter(id)] };
    //     updateFav(list);
    //     console.log("1 LIST", list);
    //   } else {
    //     let list = { savePlants: [userInfo.savePlants.push(id)] };
    //     updateFav(list);
    //     console.log("2 LIST", list);
    //   }
    // } else {
    //   if (check === "❤️") {
    //     let list = { savePlants: [] };
    //     updateFav(list);
    //     console.log("3 LIST", list);
    //   } else {
    //     let list = { savePlants: [id] };
    //     updateUser(list);
    //     console.log("4 LIST", list);
    //   }
    // }
  };

  // const checkFav = (id) => {
  //   console.log("USER INFO", userInfo);
  //   if (userInfo.savePlants) {
  //     userInfo.savePlants.map((v) => {
  //       if (v === id) return "❤️";
  //     });
  //   } else return "❤️";
  // };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        className="flex"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ overflow: "hidden" }}
        // dialogClassName="modal-400w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.name}</Modal.Title>
        </Modal.Header>
        <img
          width="100%"
          height="300px"
          style={{ objectFit: "cover", overflowX: "hidden", width: "auto9" }}
          src={`${URL}/${modalInfo.image}`}
          alt={`${modalInfo.name}`}
        ></img>
        <Modal.Body>
          <h5>{modalInfo.description}</h5>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Expousre: {modalInfo.sunTime}</ListGroupItem>
            <ListGroupItem>Type: {modalInfo.type}</ListGroupItem>
          </ListGroup>
        </Modal.Body>
      </Modal>

      {Plants.length >= 1 ? (
        Plants.map((plant, i) => {
          // let fav = checkFav(plant._id);
          // console.log("FAAAAAAAAAAV", fav);
          return (
            <Col className="d-flex justify-content-center" key={i}>
              <Card
                style={{ width: "17rem" }}
                className={"mt-3 card promoting-card"}
              >
                <Card.Img
                  style={{ height: 250, width: "100%" }}
                  variant="top"
                  src={`${URL}/${plant.image}`}
                />
                <h1
                  as={Button}
                  style={{
                    position: "absolute",
                    top: "34%",
                    right: "2%",
                    cursor: "pointer",
                  }}
                  onClick={() => {}}
                >
                  {"🖤"}
                </h1>
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <Card.Text>
                    {/* To shorten the Description if it's too long */}
                    {plant.description.split("").length > 30
                      ? plant.description.substring(0, 26).concat("...")
                      : plant.description}
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Expousre: {plant.sunTime}</ListGroupItem>
                    <ListGroupItem>Type: {plant.type}</ListGroupItem>
                  </ListGroup>
                  <Button
                    className="b-show mt-3 justify-content-center"
                    variant="outline-primary"
                    block
                    onClick={() => handleShow(plant)}
                  >
                    Show
                  </Button>
                  {!Flag ? (
                    <></>
                  ) : (
                    <Row className="justify-content-center">
                      <Button
                        className="b-show m-2"
                        variant="outline-primary"
                        as={Link}
                        to={`/EditPlant/${plant._id}`}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bn-primary m-2"
                        variant="primary"
                        onClick={() => handleDelete(plant._id)}
                      >
                        Delete
                      </Button>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PlantCard;
