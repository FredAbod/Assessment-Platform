// Importing required modules and packages
import mongoose from "mongoose";

// Defining the Question schema
const questionSchema = new mongoose.Schema({
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    options: {
      type: [String],
      required: [true, 'Options are required'],
      validate: {
        validator: function (options) {
          return options.length === 4;
        },
        message: 'Options should be an array of 4 strings',
      },
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required'],
      enum: ['a', 'b', 'c', 'd'], 
    },
  });
  
  const subjectSchema = new mongoose.Schema({
    subjectName: {
      type: String,
      required: [true, 'Subject name is required'],
    },
    questions: {
      type: [questionSchema],
      required: [true, 'Questions are required'],
    },
  });
  
  
  
  // Creating the Subject model using the Subject schema
const Subject = mongoose.model("Subject", subjectSchema);

// Exporting the Subject model
export default Subject;
