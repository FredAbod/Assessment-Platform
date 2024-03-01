import Subject from "../models/subject.Models.js";
import User from "../models/user.Models.js";

// Controller to save a new subject with multiple questions
const saveSubject = async (req, res) => {
  try {
    const { subjectName, questions } = req.body;

    // Validate required fields
    if (
      !subjectName ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        error: "Subject name and questions array are required.",
      });
    }

    // Create a new subject with multiple questions
    const newSubject = await Subject.create({
      subjectName,
      questions,
    });

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      data: newSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Route to add more questions to an existing subject
const addQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    const { subjectId } = req.params;

    // Validate required fields
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        error: "Questions array is required.",
      });
    }
    // Find the subject by ID
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
        error: "No subject found with the provided ID.",
      });
    }

    // Add new questions to the existing subject
    subject.questions = subject.questions.concat(questions);

    // Save the updated subject
    const updatedSubject = await subject.save();

    res.status(200).json({
      success: true,
      message: "Questions added to subject successfully",
      data: updatedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Route to get all subjects by query
const getSubjects = async (req, res) => {
  try {
    const query = req.query;

    // Use the query to filter subjects (example: /api/v1/subjects?subjectName=Math)
    const subjects = await Subject.find(query);

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Route to answer questions under a selected subject
const solutions = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { answers } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: "No User found with the provided ID.",
      });
    }
    if (user.score > 0) {
      return res.status(400).json({
        success: false,
        message: "User Already Taken A Test",
        error: `You Already Have A Score Of ${user.score}`,
      });
    }

    // Find the subject by ID
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found",
        error: "No subject found with the provided ID.",
      });
    }

    // Ensure the answers array has the same length as the questions array
    if (subject.questions.length !== answers.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        error: "The number of answers should match the number of questions.",
      });
    }

    // Calculate the score and percentage
    let score = 0;
    subject.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    const totalQuestions = subject.questions.length;
    const percentage = (score / totalQuestions) * 100;

    user.score = percentage;
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Answers submitted successfully",
      data: {
        score,
        totalQuestions,
        percentage,
        updatedUser,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Exporting the functions
export { saveSubject, addQuestions, getSubjects, solutions };
