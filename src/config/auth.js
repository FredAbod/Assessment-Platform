import jwt from 'jsonwebtoken';
import User from '../models/user.Models.js';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;

/**
 * Middleware to check if the user is authenticated by verifying the JWT token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const isAuth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Check if the token is missing
    if (!token) return errorResMsg(res, 401, 'Token Is missing');

    // Check if the token is empty
    if (!token) {
      return res.status(400).json({
        error: 'Invalid Token',
        message: 'Please enter a valid token',
      });
    }

    // Verify the token using the JWT library
    const decoded = await jwt.verify(token, SECRET_KEY);

    // If the token is not valid, throw an error
    if (!decoded) {
      throw new Error();
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Log the decoded user information (for debugging purposes)
    console.log('===req.user');
    console.log(req.user);
    console.log('===req.user');

    // Move to the next middleware
    next();
  } catch (e) {
    // Handle errors during token verification
    return res.status(500).json({
      error: 'Invalid Token',
      message: 'Error Validating Token',
    });
  }
};
