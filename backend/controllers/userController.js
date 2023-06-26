import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

export const getUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select('-password').exec();
  res.json(user);
});
