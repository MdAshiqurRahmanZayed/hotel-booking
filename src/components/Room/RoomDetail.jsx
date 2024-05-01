import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRooms } from "../../redux/actions";
import Loading from "../Loading/Loading";

const mapStateToProps = (state) => ({
  rooms: state.rooms,
  isLoading: state.isLoading,
  error: state.error,
});

const mapDispatchToProps = {
  fetchRooms,
};

const RoomDetail = ({ rooms, fetchRooms, isLoading, error }) => {
  const { roomId } = useParams();
  const [allRooms, setAllRooms] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    setAllRooms(rooms);
  }, [rooms]);

  const room = allRooms.find((room) => room.id === parseInt(roomId));

  if (!room) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h5>{room.name}</h5>
          <img
            src={room.image}
            style={{ height: "400px", width: "100%" }}
            alt={room.name}
          />
          <p>
            <b> Category:</b> {room.category}
          </p>
          <p>
            {" "}
            <b> Description:</b> {room.description}
          </p>
        </div>
        <div className="col-md-4">
          <p>
            Beds: <b>{room.beds}</b>
          </p>
          <p>Facilities:</p>
          <ul>
            {room.facilities.map((facility, index) => (
              <li key={index}>
                <b>{facility}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail);
