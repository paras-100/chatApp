import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

/**
 *  @desc		Auth User
 *  @route	POST /api/users/login
 * 	@access	public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // UNAUTHORIZED
    throw new Error("Invalid email or password");
  }
});

/**
 *  @desc		Register new user
 *  @route	POST /api/users
 * 	@access	public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid user data");
  }
});

/**
 *  @desc		User Profile
 *  @route	POST /api/users/profile
 * 	@access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      userFriends: user.userFriends,
      friendRequests: user.friendRequests,
      notifications: user.notifications,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Search Friend
 *  @route	GET /api/users/searchFriend
 * 	@access	private
 */
const sendSearchFriend = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
    });
  } else {
    res.status(404);
    throw new Error("Your friend not found");
  }
});

/**
 *  @desc		Save Profile Image
 *  @route	GET /api/uploads
 * 	@access	private
 */
const saveProfileImage = asyncHandler(async (req, res) => {
  const email = req.query.email;
  const user = await User.findOne({ email });

  if (user) {
    user.profilePic = `/${req.file.path}` || user.profilePic;

    const updatedUser = await user.save();

    if (updatedUser) {
      res.send(`/${req.file.path}`);
    } else {
      res.status(404);
      throw new Error("Profile picture not updated");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Save Friend Request
 *  @route	GET /api/users/addFriendRequest
 * 	@access	private
 */
const saveFriendRequest = asyncHandler(async (req, res) => {
  const { email, friend } = req.body;
  const user = await User.findOne({ email });
  const friendUser = await User.findOne({ email: friend.email });
  const date = new Date();

  const userNotification = {
    message: `You have a friend Request from ${friend.name}`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  const friendNotification = {
    message: `You sent a friend Request to ${user.name}`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  if (user) {
    user.friendRequests.push({
      _id: friendUser._id,
      name: friendUser.name,
      email: friendUser.email,
      profilePic: friendUser.profilePic,
    });
    user.notifications.unshift(userNotification);
    user.save();

    friendUser.notifications.unshift(friendNotification);
    friendUser.save();
    res.json({ user: friend });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Accept Friend Request
 *  @route	GET /api/users/acceptFriendRequest
 * 	@access	private
 */
const acceptFriendRequest = asyncHandler(async (req, res) => {
  const { userEmail, friendEmail } = req.body;

  const user = await User.findOne({ email: userEmail });
  const friend = await User.findOne({ email: friendEmail });

  const date = new Date();

  const userNotification = {
    message: `You accepted friend Request of ${friend.name}`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  const friendNotification = {
    message: `${user.name} accepted your friend request`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  if (user) {
    const userFriends = user.userFriends;
    const friendsFriends = friend.userFriends;

    const friendData = {
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.profilePic,
    };

    const userFriendRequests = user.friendRequests;
    userFriendRequests.map((data, index) => {
      if (data.email === friendEmail) {
        const userdata = {
          id: data._id,
          name: data.name,
          email: data.email,
          pic: data.profilePic,
        };
        userFriends.unshift(userdata);
        userFriendRequests.splice(index, 1);
        user.notifications.unshift(userNotification);
        user.save();

        friendsFriends.unshift(friendData);
        friend.notifications.unshift(friendNotification);
        friend.save();

        res.json({ userFriendRequests });
      } else {
        res.status(404);
        throw new Error("FriendRequest not found");
      }
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Decline Friend Request
 *  @route	GET /api/users/declineFriendRequest
 * 	@access	private
 */
const declineFriendRequest = asyncHandler(async (req, res) => {
  const { userEmail, friendEmail } = req.body;
  const user = await User.findOne({ email: userEmail });
  const friend = await User.findOne({ email: friendEmail });

  const date = new Date();

  const userNotification = {
    message: `You declined friend Request of ${friend.name}`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  const friendNotification = {
    message: `${user.name} declined your friend Request`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  if (user) {
    const userFriendRequests = user.friendRequests;

    userFriendRequests.map((data, index) => {
      if (data.email === friendEmail) {
        userFriendRequests.splice(index, 1);
        user.notifications.unshift(userNotification);
        user.save();

        friend.notifications.unshift(friendNotification);
        friend.save();

        res.json({ userFriendRequests });
      } else {
        res.status(404);
        throw new Error("FriendRequest not found");
      }
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Clear Notification
 *  @route	GET /api/users/clearNotifications
 * 	@access	private
 */
const notificationClearance = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.notifications = [];
    await user.save();
    res.json({ task: true });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc		Remove Friend
 *  @route	POST /api/users/removeFriend
 * 	@access	private
 */
const removeFriend = asyncHandler(async (req, res) => {
  const { userId, friendId, chatId } = req.body;

  const user = await User.findById(userId);
  const friendUser = await User.findById(friendId);

  const date = new Date();

  const userNotification = {
    message: `You removed ${friendUser.name} from friendlist `,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  const friendNotification = {
    message: `${user.name} removed you from friendlist`,
    date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
    time: `${date.toLocaleTimeString()}`,
  };

  if (!userId || !friendId || !chatId) {
    res.status(404);
    throw new Error("Details Missing");
  } else if (userId && friendId && chatId) {
    // Delete ChatId and Messages
    const messageDelete = await Message.deleteOne({ chatId: chatId });
    const deleteChat = await Chat.deleteOne({ _id: chatId });

    // Remove friend from user
    const friendRemoved = await user.userFriends.map((friend, index) => {
      if (friend.id == friendId) {
        user.userFriends.splice(index, 1);
        return true;
      }
    });

    // Remove user from friend
    const userRemoved = await friendUser.userFriends.map((friend, index) => {
      if (friend.id == userId) {
        friendUser.userFriends.splice(index, 1);
        return true;
      }
    });

    if (friendRemoved && userRemoved && messageDelete && deleteChat) {
      // Send Notifications to users
      user.notifications.unshift(userNotification);
      friendUser.notifications.unshift(friendNotification);

      // Update Users in Database
      await user.save();
      await friendUser.save();

      res.json([messageDelete, deleteChat]);
    } else {
      res.status(404);
      throw new Error("Friend not found");
    }
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  sendSearchFriend,
  saveProfileImage,
  saveFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  notificationClearance,
  removeFriend,
};
