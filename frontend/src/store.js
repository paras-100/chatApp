import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  userAddFriendReducer,
  userNotificationReducer,
  friendInfoReducer,
  removeFriendReducer,
} from "./reducers/userReducer";
import {
  comCreateChatReducer,
  comFindChatReducer,
  comSendMessageReducer,
  comDeleteMessageReducer,
} from "./reducers/communicateReducer";
import { setSocketReducer } from "./reducers/socketReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userFriend: userAddFriendReducer,
  userNotifications: userNotificationReducer,
  chatFriendInfo: friendInfoReducer,
  createChat: comCreateChatReducer,
  findFriendChat: comFindChatReducer,
  sendMessage: comSendMessageReducer,
  deleteMessages: comDeleteMessageReducer,
  removeFriend: removeFriendReducer,
  webSocket: setSocketReducer,
});

const userInfoFromStorage = localStorage.getItem("loginUserInfo")
  ? JSON.parse(localStorage.getItem("loginUserInfo"))
  : null;

const initialState = {
  userLogin: { loginUserInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
