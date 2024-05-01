import * as actionTypes from './ActionTypes';


const initialState = {

     rooms:[],
     isLoading: false,



     token: null,
     userId: null,
     authLoading: false,
     authFailedMsg: null,
     error: null,
     lengthRoom: 0,
     lengthRoomBooked: 0,
     lengthRoomLeft: 0,
     bookedRooms:[]
};

const reducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.SET_LENGTH_ROOM:
               return {
                    ...state,
                    lengthRoom: action.payload,
               }
          case actionTypes.SET_BOOKED_LENGTH_ROOM:
               return {
                    ...state,
                    lengthRoomBooked: action.payload,
               }
               
          case actionTypes.SET_BOOKED_ROOM:
               return {
                    ...state,
                    bookedRooms: action.payload,
               }
                
          case actionTypes.FETCH_ROOMS_REQUEST:
               return {
                    ...state,
                    isLoading:true,
                    error:null
               }

          
          case actionTypes.FETCH_ROOMS_SUCCESS:
               return {
                    ...state,
                    isLoading:false,
                    rooms: action.payload,
                    error:null
               }

          case actionTypes.FETCH_ROOMS_FAILURE:
               return {
                    ...state,
                    isLoading:false,
                    error:action.payload
               }

          
          //Auth Cases
          case actionTypes.AUTH_SUCCESS:
               return {
                    ...state,
                    token: action.payload.token,
                    userId: action.payload.userId,
               }
          case actionTypes.AUTH_LOGOUT:
               return {
                    ...state,
                    authFailedMsg: null,
                    token: null,
                    userId: null,
                    bookedRooms: [],
                    lengthRoomBooked: 0,
               }
          case actionTypes.AUTH_LOADING:
               return {
                    ...state,
                    authLoading: action.payload,
               }
          case actionTypes.AUTH_FAILED:
               return {
                    ...state,
                    authFailedMsg: action.payload,
               }

          default:
               return state;
     }
};

export default reducer;
