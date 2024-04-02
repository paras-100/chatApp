import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_RESET,
  USER_LOGIN_RESET,
  USER_UPDATE_FRIEND_REQUEST,
  USER_SEARCH_FRIEND_FAIL,
  USER_SEARCH_FRIEND_RESET,
  USER_SEARCH_FRIEND_SUCCESS,
  USER_ADD_FRIEND_REQUEST_FAIL,
  USER_ADD_FRIEND_REQUEST_SUCCESS,
  USER_ACCEPT_FRIEND_REQUEST_FAIL,
  USER_ACCEPT_FRIEND_REQUEST_SUCCESS,
  USER_DECLINE_FRIEND_REQUEST_FAIL,
  USER_DECLINE_FRIEND_REQUEST_SUCCESS,
  USER_UPDATE_NOTIFICATIONS_REQUEST,
  USER_CLEAR_NOTIFICATIONS_FAIL,
  USER_CLEAR_NOTIFICATIONS_SUCCESS,
  USER_ADD_FRIEND_INFO,
  USER_ADD_FRIEND_RESET,
  REMOVE_FRIEND_FAIL,
  REMOVE_FRIEND_REQUEST,
  REMOVE_FRIEND_RESET,
  REMOVE_FRIEND_SUCCESS,
} from "../constants/userConstants";

import { COM_FIND_CHAT_RESET } from "../constants/commuincateConstants";

export const login = (email, password, loginCheck) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    if (loginCheck) {
      localStorage.setItem("loginUserInfo", JSON.stringify(data));
    }
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/register",
      {
        name,
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getuserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { loginUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${loginUserInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/users/profile",
      { _id: loginUserInfo._id },
      config
    );

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: USER_LOGIN_RESET });
  dispatch({ type: USER_PROFILE_RESET });
  dispatch({ type: USER_SEARCH_FRIEND_RESET });
  dispatch({ type: USER_ADD_FRIEND_RESET });
  dispatch({ type: COM_FIND_CHAT_RESET });

  localStorage.removeItem("loginUserInfo");
};

export const circulateFriendInfo = (info) => async (dispatch) => {
  dispatch({ type: USER_ADD_FRIEND_INFO, payload: info });
};

export const searchFriend = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_FRIEND_REQUEST });

    const {
      userLogin: { loginUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${loginUserInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/users/searchFriend",
      { email },
      config
    );

    dispatch({ type: USER_SEARCH_FRIEND_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_SEARCH_FRIEND_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addFriendRequest =
  (email, friend) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_FRIEND_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      await axios.post(
        "/api/users/addFriendRequest",
        { email, friend },
        config
      );

      dispatch({ type: USER_ADD_FRIEND_REQUEST_SUCCESS });
    } catch (err) {
      dispatch({
        type: USER_ADD_FRIEND_REQUEST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const acceptFriendRequest =
  (userEmail, friendEmail) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_FRIEND_REQUEST });
      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      await axios.post(
        "/api/users/acceptFriendRequest",
        {
          userEmail,
          friendEmail,
        },
        config
      );

      dispatch({ type: USER_ACCEPT_FRIEND_REQUEST_SUCCESS });
    } catch (err) {
      dispatch({
        type: USER_ACCEPT_FRIEND_REQUEST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const declineFriendRequest =
  (userEmail, friendEmail) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_FRIEND_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      await axios.post(
        "/api/users/declineFriendRequest",
        {
          userEmail,
          friendEmail,
        },
        config
      );

      dispatch({ type: USER_DECLINE_FRIEND_REQUEST_SUCCESS });
    } catch (err) {
      dispatch({
        type: USER_DECLINE_FRIEND_REQUEST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const clearNotifications = (email) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_NOTIFICATIONS_REQUEST });

    const {
      userLogin: { loginUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${loginUserInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/users/clearNotifications",
      { email },
      config
    );

    if (data.task) {
      dispatch({ type: USER_CLEAR_NOTIFICATIONS_SUCCESS });
    }
  } catch (err) {
    dispatch({
      type: USER_CLEAR_NOTIFICATIONS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const friendRemover =
  (userId, friendId, chatId) => async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_FRIEND_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/users/removeFriend",
        {
          userId,
          friendId,
          chatId,
        },
        config
      );

      dispatch({ type: REMOVE_FRIEND_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: REMOVE_FRIEND_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
