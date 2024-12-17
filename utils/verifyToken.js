import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const errorHandler = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the "Bearer" prefix

  if (!token) {
    return errorHandler(res, 401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Use userId from token

    // Fetch the user from the database using the userId
    const user = await User.findById(userId);

    if (!user) {
      return errorHandler(res, 401, 'Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in token verification:", error.message);
    return errorHandler(res, 401, 'Invalid token');
  }
};

export const verifyUser = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next();
  } else {
    return errorHandler(res, 403, 'Access denied');
  }
};

export const verifyAdmin = (req, res, next) => {

  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return errorHandler(res, 403, 'Access denied');
  }
};

export default verifyToken;
