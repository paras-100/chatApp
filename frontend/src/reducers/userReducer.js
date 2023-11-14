import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_LOGIN_RESET,
  USER_SEARCH_FRIEND_FAIL,
  USER_UPDATE_FRIEND_REQUEST,
  USER_SEARCH_FRIEND_SUCCESS,
  USER_SEARCH_FRIEND_RESET,
  USER_ADD_FRIEND_REQUEST_FAIL,
  USER_ADD_FRIEND_REQUEST_RESET,
  USER_ADD_FRIEND_REQUEST_SUCCESS,
  USER_ACCEPT_FRIEND_REQUEST_FAIL,
  USER_ACCEPT_FRIEND_REQUEST_RESET,
  USER_ACCEPT_FRIEND_REQUEST_SUCCESS,
  USER_DECLINE_FRIEND_REQUEST_FAIL,
  USER_DECLINE_FRIEND_REQUEST_RESET,
  USER_DECLINE_FRIEND_REQUEST_SUCCESS,
  USER_CLEAR_NOTIFICATIONS_FAIL,
  USER_CLEAR_NOTIFICATIONS_SUCCESS,
  USER_UPDATE_NOTIFICATIONS_REQUEST,
  USER_CLEAR_NOTIFICATIONS_RESET,
  USER_ADD_FRIEND_INFO,
  USER_ADD_FRIEND_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loginLoading: true };
    case USER_LOGIN_SUCCESS:
      return { loginLoading: false, loginUserInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loginLoading: false, loginError: action.payload };
    case USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { regLoading: true };
    case USER_REGISTER_SUCCESS:
      return { regLoading: false, regUserInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { regLoading: false, regError: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (
  state = { friendsData: { profile: {} } },
  action
) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userAddFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_FRIEND_REQUEST:
      return { loading: true };

    case USER_SEARCH_FRIEND_SUCCESS:
      return { loading: false, searchedFriend: action.payload };
    case USER_SEARCH_FRIEND_FAIL:
      return { loading: false, error: action.payload };
    case USER_SEARCH_FRIEND_RESET:
      return {};

    case USER_ADD_FRIEND_REQUEST_SUCCESS:
      return { loading: false, addFriend: true };
    case USER_ADD_FRIEND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADD_FRIEND_REQUEST_RESET:
      return {};

    case USER_ACCEPT_FRIEND_REQUEST_SUCCESS:
      return { loading: false, acceptFriend: true };
    case USER_ACCEPT_FRIEND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ACCEPT_FRIEND_REQUEST_RESET:
      return {};

    case USER_DECLINE_FRIEND_REQUEST_SUCCESS:
      return { loading: false, declineFriend: true };
    case USER_DECLINE_FRIEND_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    case USER_DECLINE_FRIEND_REQUEST_RESET:
      return {};

    default:
      return state;
  }
};

export const userNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_NOTIFICATIONS_REQUEST:
      return { loading: true };

    case USER_CLEAR_NOTIFICATIONS_SUCCESS:
      return { loading: false, notificationCleared: true };
    case USER_CLEAR_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload };
    case USER_CLEAR_NOTIFICATIONS_RESET:
      return {};

    default:
      return state;
  }
};

export const friendInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_FRIEND_INFO:
      return { friendInfo: action.payload };
    case USER_ADD_FRIEND_RESET:
      return {};
    default:
      return state;
  }
};
