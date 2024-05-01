import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Route, Routes ,Navigate} from 'react-router-dom'
import Auth from './Auth/Auth'
import Logout from './Auth/Logout'
import { connect } from 'react-redux'
import Rooms from './Room/Rooms'
import RoomDetail from './Room/RoomDetail'
import BookRoom from './BookRoom/BookRoom'
import AllBooked from './BookRoom/AllBooked'

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};


const Main = (props) => {
  let routes = null;
  if (props.token) {
    routes = (
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/rooms/:roomId" element={<RoomDetail />} />
        <Route path="/book-room/:roomId" element={<BookRoom />} />
        <Route path="/all-booked-room" element={<AllBooked />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  else{
    routes = (
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/rooms/:roomId" element={<RoomDetail />} />
        {/* <Route path="/book-room/:roomId" element={<BookRoom />} /> */}
        <Route path="/signin" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );

  }
  return (
    <div>
      <Header/>
      {routes}
      <Footer/>
    </div>
  )
}

export default connect(mapStateToProps)(Main)
