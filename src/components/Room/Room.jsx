import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import BookRoom from "../BookRoom/BookRoom";

const Room = (props) => {
  const [modalOpen, setModalOpen] = useState(false);



  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="col-md-3 p-1">
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={props.room.image}
          title="Room Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.room.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: <b>{props.room.category}</b>
          </Typography>
        </CardContent>
        <div className="d-flex">
          <Link
            className={`btn btn-info btn-sm ms-auto rounded-0 
            }`}
            style={{ width: "100%" }}
            to={{
              pathname: `/rooms/${props.room.id}`,
              state: { roomId: props.room.id },
            }}
            
          >
            See
          </Link>
          <Button
            className={`btn btn-success btn-sm ms-auto rounded-0 }`}
            style={{ width: "100%" }}
            onClick={toggleModal}
            disabled={props.booked}
          >
            Book
          </Button>
        </div>
      </Card>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Book Room</ModalHeader>
        <ModalBody>
          <BookRoom room={props.room} toggleModal={toggleModal} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Room;
