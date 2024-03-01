// Importing required modules and packages
import User from '../models/user.Models.js';
import bcrypt from 'bcryptjs';

// Function to check if the user with the given email already exists
const checkExistingUser = async (email) => {
  return User.findOne({ email });
};

// Signup function for user registration
const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // Validation for required input fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Please enter a username, email address, and password.',
      });
    }

    // Check if user with the same email already exists
    const existingUser = await checkExistingUser(email);
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'A user with this email address already exists.',
      });
    }

    // Create a new user
    const newUser = await User.create({
      userName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};

// Login function for user authentication
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found', message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password', message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = user.generateAuthToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// Exporting the signup and login functions
export { signUp, loginUser };
