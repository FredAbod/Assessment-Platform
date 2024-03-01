import mongoose from 'mongoose';import dotenv from "dotenv"; // Dotenv for managing environment variables
import Subject from './src/models/subject.Models.js';

// Loading environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URL);

// Sample data for seeding
const subjectsData = [
    {
      subjectName: 'Math',
      questions: [
        {
          question: 'What is 2 + 2?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 'd',
        },
        {
          question: 'What is 3 x 3?',
          options: ['6', '9', '12', '15'],
          correctAnswer: 'b',
        },
        {
          question: 'Solve for x: 2x - 5 = 11',
          options: ['2', '3', '4', '5'],
          correctAnswer: 'c',
        },
        {
          question: 'What is the square root of 64?',
          options: ['6', '8', '10', '12'],
          correctAnswer: 'b',
        },
        {
          question: 'What is the value of pi (π) to two decimal places?',
          options: ['3.14', '3.16', '3.18', '3.20'],
          correctAnswer: 'a',
        },
      ],
    },
    {
      subjectName: 'Science',
      questions: [
        {
          question: 'What is the capital of France?',
          options: ['London', 'Berlin', 'Paris', 'Madrid'],
          correctAnswer: 'c',
        },
        {
          question: 'What is the chemical symbol for water?',
          options: ['H2O', 'CO2', 'O2', 'CH4'],
          correctAnswer: 'a',
        },
        {
          question: 'Which planet is known as the Red Planet?',
          options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
          correctAnswer: 'b',
        },
        {
          question: 'What is the powerhouse of the cell?',
          options: ['Nucleus', 'Mitochondria', 'Endoplasmic reticulum', 'Golgi apparatus'],
          correctAnswer: 'b',
        },
        {
          question: 'What gas do plants absorb during photosynthesis?',
          options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
          correctAnswer: 'b',
        },
      ],
    },
    // Add more subjects and questions as needed
  ];
  

// Function to seed subjects and questions into the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Subject.deleteMany();

    // Seed new data
    for (const subjectData of subjectsData) {
      const newSubject = new Subject(subjectData);
      await newSubject.save();
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seedDatabase function to start seeding
seedDatabase();
