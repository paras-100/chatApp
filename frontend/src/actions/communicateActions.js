import axios from "axios";

import {
  COM_CREATE_CHAT_FAIL,
  COM_CREATE_CHAT_REQUEST,
  COM_CREATE_CHAT_SUCCESS,
  COM_FIND_CHAT_FAIL,
  COM_FIND_CHAT_REQUEST,
  COM_FIND_CHAT_SUCCESS,
  COM_SEND_MESSAGE_FAIL,
  COM_SEND_MESSAGE_REQUEST,
  COM_SEND_MESSAGE_SUCCESS,
  COM_SET_CHATS_SUCCESS,
  COM_DELETE_CHAT_FAIL,
  COM_DELETE_CHAT_REQUEST,
  COM_DELETE_CHAT_RESET,
  COM_DELETE_CHAT_SUCCESS,
} from "../constants/commuincateConstants";

export const postCreateChat =
  (firstId, secondId) => async (dispatch, getState) => {
    try {
      dispatch({ type: COM_CREATE_CHAT_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chats",
        { firstId, secondId },
        config
      );

      if (data.newChat) {
        dispatch({ type: COM_CREATE_CHAT_SUCCESS });
      }
    } catch (err) {
      dispatch({
        type: COM_CREATE_CHAT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getFindChat =
  (firstId, secondId) => async (dispatch, getState) => {
    try {
      dispatch({ type: COM_FIND_CHAT_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chats/find/${firstId}/${secondId}`,
        { firstId, secondId },
        config
      );

      dispatch({
        type: COM_FIND_CHAT_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: COM_FIND_CHAT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const postCreateMessage =
  (chatId, senderId, text) => async (dispatch, getState) => {
    try {
      dispatch({ type: COM_SEND_MESSAGE_REQUEST });

      const {
        userLogin: { loginUserInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${loginUserInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/messages`,
        { chatId, senderId, text },
        config
      );

      dispatch({ type: COM_SEND_MESSAGE_SUCCESS, payload: [data] });
    } catch (err) {
      dispatch({
        type: COM_SEND_MESSAGE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const postDeleteChats = (chatId) => async (dispatch, getState) => {
  try {
    dispatch({ type: COM_DELETE_CHAT_REQUEST });

    const {
      userLogin: { loginUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${loginUserInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/messages/deleteChats",
      { chatId },
      config
    );

    dispatch({ type: COM_DELETE_CHAT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: COM_DELETE_CHAT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
