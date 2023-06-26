import User from '../models/User.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import generateToken from './generateToken.js';

// create user after sign in
export const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  console.log(username);

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

// login functionality
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: 'Unauthorized' });

  if (match && foundUser) {
    res.json({
      _id: foundUser._id,
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      token: generateToken(foundUser._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
});
