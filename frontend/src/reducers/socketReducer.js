import { SET_SOCKET } from "../constants/socketConstants";

export const setSocketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SOCKET:
      return { socket: action.payload };
    default:
      return state;
  }
};
