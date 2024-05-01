import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../../redux/actions";
import Loading from "../Loading/Loading";
import Room from "./Room";

const mapStateToProps = (state) => ({
  rooms: state.rooms,
  isLoading: state.isLoading,
  error: state.error,
  bookedRooms: state.bookedRooms,
});

const mapDispatchToProps = {
  fetchRooms,
};

const Rooms = ({ fetchRooms, isLoading, error, rooms, bookedRooms }) => {

  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [bookedArray, setBookedArray] = useState([]);
  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    setAllRooms(rooms);
    setFilteredRooms(rooms);
  }, [rooms]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === null) {
      setFilteredRooms(allRooms);
    } else {
      const filtered = allRooms.filter((room) => room.category === category);
      setFilteredRooms(filtered);
    }
  };
  useEffect(() => {
    // console.log("Booked Rooms:");
    setBookedArray((prevArray) => {
      const newArray = Object.keys(bookedRooms).map(
        (key) => bookedRooms[key].roomId.id
      );
      return newArray;
    });
  }, [bookedRooms]);
  // console.log(bookedArray);
  return (
    <div className="container">
      <h2>All Rooms</h2>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
          <div className="d-flex justify-content-center mb-3">
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === null ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter(null)}
            >
              All
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "single" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Standard")}
            >
              Standard
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Deluxe")}
            >
              Deluxe
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Family")}
            >
              Family
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Executive")}
            >
              Executive
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Suite")}
            >
              Suite
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Villa")}
            >
              Villa
            </button>
            <button
              className={`btn btn-outline-primary me-2 ${
                selectedCategory === "double" ? "active" : ""
              }`}
              onClick={() => handleCategoryFilter("Chalet")}
            >
              Chalet
            </button>
          </div>
          <div className="row">
            {filteredRooms.map((room) =>
              bookedArray.includes(room.id) ? (
                <Room room={room} key={room.id} booked={true} />
              ) : (
                <Room room={room} key={room.id} booked={false} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
