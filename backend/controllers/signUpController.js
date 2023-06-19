import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

export const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Confirm data
  if (!username || !password || !role || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate username
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate email' });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { username, email, password: hashedPwd, role };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received' });
  }
});
