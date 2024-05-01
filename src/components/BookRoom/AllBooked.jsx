import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setBookedLengthRoom } from "../../redux/actions";
import { useDispatch } from "react-redux";



const mapStateToProps = (state) => ({
  userId: state.userId,
});



const AllBooked = ({ userId }) => {
  const [allBooked, setAllBooked] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {

    const queryParams = `?orderBy="userId"&equalTo="${userId}"`;
    const url = `https://hotel-booking-eb861-default-rtdb.firebaseio.com/orders.json${queryParams}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const bookedItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAllBooked(bookedItems);
      })
      .catch((error) => console.log(error.message));
  }, [userId]);


useEffect(() => {
  dispatch(setBookedLengthRoom(allBooked.length));
}, [dispatch, allBooked.length]);

  return (
    <div>
      {allBooked.map((item) => (
        <div className="container">
          <div key={item.id} className="card m-2">
            <div className="card-body">
              <div className="row">
                <img src={item.roomId.image} alt={item.roomId.name} style={{height:'300px'}}/>
                <div className="col-md-6 my-3">
                  <h5 className="card-title">Booking ID: {item.id}</h5>
                </div>
                <div className="col-md-6 my-3">
                  <h5 className="card-title">User Name: {item.name}</h5>
                </div>
                <div className="col-md-6 my-3">
                  <h5 className="card-title">Room Name: {item.roomId.name}</h5>
                </div>
                <div className="col-md-6 my-3">
                  <h5 className="card-title">Phone Number: {item.phone}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(AllBooked);
