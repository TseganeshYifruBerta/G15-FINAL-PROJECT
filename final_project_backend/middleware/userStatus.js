const User = require('../models/auth/user.model'); // Assuming your User model file is in the correct directory

const checkUserStatus = async (req, res, next) => {
  const userId = req.user.id; // Assuming you have user information stored in req.user after authentication

  try {
    // Retrieve user's status from the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the user's status and handle it accordingly
    if (user.status === 'active') {
      // User is active, proceed to the next middleware or route handler
      next();
    } else {
      // User is inactive or has another status that restricts access
      return res.status(403).json({ error: 'Access denied. Your account is inactive.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = checkUserStatus;
