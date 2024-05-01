// Navbar.js
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"; 
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  NavbarToggler,
} from "reactstrap";
import "./Header.css";
import { connect } from "react-redux";
import { fetchRoomsLength, fetchBookedRoomsLength } from "../../redux/actions";
import { useDispatch } from "react-redux";

const mapStateToProps = (state) => {
  return {
    token: state.token,
    lengthRoom: state.lengthRoom,
    lengthRoomBooked: state.lengthRoomBooked,
    userId: state.userId,
    bookedRooms: state.bookedRooms,
  };
};

const Header = (props) => {
  // console.log(props.lengthRoom);
    const leftRooms = props.lengthRoom - props.lengthRoomBooked;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchRoomsLength());
      dispatch(fetchBookedRoomsLength(props.userId));
    }, [dispatch, props.userId]);
    // console.log(props.bookedRooms);
  const toggle = () => setIsOpen(!isOpen);
  let links;
  if (props.token) {
    links = (
      <Nav>
        <NavItem>
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link">All rooms:{props.lengthRoom}</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link">
            Booked rooms:{props.lengthRoomBooked}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link">
            Left rooms: {leftRooms} 
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="nav-link" to="/all-booked-room">
            All booked room
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
  else{
    links = (
      <NavItem>
        <Link className="nav-link" to="/signin">
          Signin
        </Link>
      </NavItem>
    );

  }
  return (
    <div>
      <Navbar className="navbar_color" light expand="md">
        <NavbarBrand tag={Link} to="/">
          Hotel Booking
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
           {links}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default connect(mapStateToProps)(Header);
