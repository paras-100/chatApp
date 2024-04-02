import {
  COM_CREATE_CHAT_FAIL,
  COM_CREATE_CHAT_REQUEST,
  COM_CREATE_CHAT_SUCCESS,
  COM_FIND_CHAT_FAIL,
  COM_FIND_CHAT_REQUEST,
  COM_FIND_CHAT_SUCCESS,
  COM_FIND_CHAT_RESET,
  COM_SEND_MESSAGE_FAIL,
  COM_SEND_MESSAGE_REQUEST,
  COM_SEND_MESSAGE_SUCCESS,
  COM_SEND_MESSAGE_RESET,
  COM_SET_CHATS_SUCCESS,
  COM_DELETE_CHAT_FAIL,
  COM_DELETE_CHAT_REQUEST,
  COM_DELETE_CHAT_RESET,
  COM_DELETE_CHAT_SUCCESS,
} from "../constants/commuincateConstants";

export const comCreateChatReducer = (state = {}, action) => {
  switch (action.type) {
    case COM_CREATE_CHAT_REQUEST:
      return { loading: true };
    case COM_CREATE_CHAT_SUCCESS:
      return { loading: false, chatCreated: true };
    case COM_CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const comFindChatReducer = (state = {}, action) => {
  switch (action.type) {
    case COM_FIND_CHAT_REQUEST:
      return { loading: true };
    case COM_FIND_CHAT_SUCCESS:
      return { loading: false, friendChat: action.payload };
    case COM_FIND_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case COM_FIND_CHAT_RESET:
      return {};

    default:
      return state;
  }
};

export const comSendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case COM_SEND_MESSAGE_REQUEST:
      return { loading: true };
    case COM_SEND_MESSAGE_SUCCESS:
      return { loading: false, chatMessage: action.payload };
    case COM_SET_CHATS_SUCCESS:
      return { loading: false, chatMessage: action.payload };
    case COM_SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };

    case COM_SEND_MESSAGE_RESET:
      return {};

    default:
      return state;
  }
};

export const comDeleteMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case COM_DELETE_CHAT_REQUEST:
      return { loading: true };
    case COM_DELETE_CHAT_SUCCESS:
      return { loading: false, deleteChat: action.payload };
    case COM_CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };
    case COM_DELETE_CHAT_RESET:
      return {};
    default:
      return state;
  }
};
