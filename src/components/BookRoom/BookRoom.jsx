import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchBookedRooms, fetchRooms } from "../../redux/actions";

const mapStateToProps = (state) => ({
  userId: state.userId,
  rooms: state.rooms,
  isLoading: state.isLoading,
  error: state.error,
  bookedRooms: state.bookedRooms,
});

const mapDispatchToProps = {
  fetchRooms,
  fetchBookedRooms,
};

const BookRoom = ({ userId, room, toggleModal, fetchBookedRooms }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userId: userId,
      roomId: room,
      name: name,
      phone: phone,
    };

    try {
      const response = await fetch(
        "https://hotel-booking-eb861-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      setMessage(true); // Set message state to true after successful submission
      fetchBookedRooms(userId); // Fetch booked rooms again after successful submission
    } catch (error) {
      console.error("Error posting data:", error.message);
    }

    toggleModal(); // Close the modal after form submission
  };

  let form = (
    <h5>
      Please <b>login</b> for Booking a room
    </h5>
  );
  if (userId) {
    form = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="form-control m-2"
          placeholder="Enter your name"
          required
        />
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          className="form-control m-2"
          placeholder="Enter your phone number"
          required
        />
        <button type="submit" className="btn btn-primary m-2">
          Save
        </button>
      </form>
    );
  }

  return (
    <div className="container">
      <h3>Book: {room.name}</h3>
      <br />
      {message && <p>Booking successful!</p>}
      {form}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookRoom);
