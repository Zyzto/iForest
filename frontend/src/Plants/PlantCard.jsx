import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";
import URL from "../config/api";

const PlantCard = ({ Plants }) => {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleClose = () => {
    setShow(false);
    setModalInfo({});
  };
  function handleShow(plant) {
    setShow(true);
    setModalInfo(plant);
  }
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
      {Plants.length > 1 ? (
        Plants.map((plant, i) => {
          return (
            <Col md={3} className="m-6" key={i}>
              <Card
                style={{ width: "15rem" }}
                className={"mt-3 card promoting-card"}
              >
                <Card.Img
                  style={{ height: 250, width: "100%" }}
                  variant="top"
                  src={`${URL}/${plant.image}`}
                />
                <Card.Body>
                  <Card.Title>{plant.name}</Card.Title>
                  <Button variant="primary" onClick={() => handleShow(plant)}>
                    Show
                  </Button>
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
