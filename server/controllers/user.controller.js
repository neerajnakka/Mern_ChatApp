import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //when user is loggedin then in the sidebar we should get all users and not one which is not equal to logged in user
    //we cannot see ourselves in sidebar with no passwords
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(
      'error in getUsersForSidebar in user.controller',
      error.message
    );
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
