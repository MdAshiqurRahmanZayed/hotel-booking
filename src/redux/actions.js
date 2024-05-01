import axios from 'axios';

import * as actionTypes from './ActionTypes';
import { baseUrl } from './baseUrls';

export const fetchRoomsRequest = () =>({
     type:actionTypes.FETCH_ROOMS_REQUEST
})


export const fetchRoomsSuccess = (rooms) =>({
     type:actionTypes.FETCH_ROOMS_SUCCESS,
     payload: rooms
})

export const fetchRoomsFailure = (error) => ({
     type:actionTypes.FETCH_ROOMS_FAILURE,
     payload: error
})

export const setLengthRoom = (length) => ({
     type: actionTypes.SET_LENGTH_ROOM,
     payload: length,
});



export const fetchRooms = () =>{
     return async(dispatch)=>{
          dispatch(fetchRoomsRequest())
          try{
               const response = await axios.get(baseUrl+'rooms.json');
               dispatch(fetchRoomsSuccess(response.data));
               
          }
          catch(error){
               dispatch(fetchRoomsFailure(error));
          }
     }
} 



export const fetchRoomsLength = () => {
     return (dispatch) => {
          axios.get('https://hotel-booking-eb861-default-rtdb.firebaseio.com/rooms.json')
               .then(response => {
                    const rooms = response.data;
                    const length = Object.keys(rooms).length;
                    dispatch(setLengthRoom(length));
               })
               .catch(error => {
                    console.error('Error fetching rooms:', error);
               });
     };
};


export const setBookedLengthRoom = (length) => ({
     type: actionTypes.SET_BOOKED_LENGTH_ROOM,
     payload: length,
});

export const setBookedRoom = (booked) => ({
     type: actionTypes.SET_BOOKED_ROOM,
     payload: booked,
});


export const fetchBookedRoomsLength = (userId) => {
     return (dispatch) => {
          const queryParams = `?orderBy="userId"&equalTo="${userId}"`;
          const url = `https://hotel-booking-eb861-default-rtdb.firebaseio.com/orders.json${queryParams}`;
          axios.get(url)
               .then(response => {
                    const rooms = response.data;
                    const length = Object.keys(rooms).length;
                    dispatch(setBookedLengthRoom(length));

                    // localStorage.setItem('bookedRooms', JSON.stringify(rooms));
               })
               .catch(error => {
                    console.error('Error fetching rooms:', error);
               });
     };
};


export const fetchBookedRooms = (userId) => {
     return (dispatch) => {
          const queryParams = `?orderBy="userId"&equalTo="${userId}"`;
          const url = `https://hotel-booking-eb861-default-rtdb.firebaseio.com/orders.json${queryParams}`;
          axios.get(url)
               .then(response => {
                    const rooms = response.data;
                    dispatch(setBookedRoom(rooms));
               })
               .catch(error => {
                    console.error('Error fetching rooms:', error);
               });
     };
};