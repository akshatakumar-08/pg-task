import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid2 as Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

//Hardcoded dummy questions
const questions = [
  { id: 1, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 2, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 3, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 4, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 5, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 6, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 7, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 8, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 9, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 10, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 11, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 12, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 13, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 14, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 15, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 16, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 17, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 18, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 19, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 20, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 21, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 22, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 23, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 24, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 25, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 26, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
  { id: 27, question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"] },
  { id: 28, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Leo Tolstoy"] },
  { id: 29, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"] },
  { id: 30, question: "What is 2 + 2?", options: ["3", "4", "5", "6"] }
];

const TestScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const navigate = useNavigate();

  // Load state from localStorage when component mounts
  useEffect(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    const savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    const savedMarkedForReview = JSON.parse(localStorage.getItem('markedForReview')) || [];
    const savedAnsweredQuestions = JSON.parse(localStorage.getItem('answeredQuestions')) || [];

    if (savedIndex) {
      setCurrentQuestionIndex(Number(savedIndex));
    }
    setSelectedOption(savedOptions[savedIndex] || null); // Load selected option for the current question
    setMarkedForReview(savedMarkedForReview);
    setAnsweredQuestions(new Set(savedAnsweredQuestions));
  }, []);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    const savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    savedOptions[currentQuestionIndex] = selectedOption;
    localStorage.setItem('selectedOptions', JSON.stringify(savedOptions));
    localStorage.setItem('markedForReview', JSON.stringify(markedForReview));
    localStorage.setItem('answeredQuestions', JSON.stringify([...answeredQuestions]));
  }, [currentQuestionIndex, selectedOption, markedForReview, answeredQuestions]);

  const handleNextQuestion = () => {
    if (selectedOption) {
      answeredQuestions.add(currentQuestionIndex);
      setAnsweredQuestions(new Set(answeredQuestions));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear selected option for the next question
    } else {
      setOpenSubmitDialog(true); // Open submit dialog for the last question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
      setSelectedOption(savedOptions[currentQuestionIndex - 1] || null); // Load the option for the previous question
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('selectedOptions');
    navigate('/');
  };

  const handleMarkForReview = () => {
    if (!markedForReview.includes(currentQuestionIndex)) {
      setMarkedForReview([...markedForReview, currentQuestionIndex]);
    } else {
      setMarkedForReview(markedForReview.filter(index => index !== currentQuestionIndex));
    }
  };

  const handleClearSelection = () => {
    setSelectedOption(null); // Clear the selected option
    const savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
    savedOptions[currentQuestionIndex] = null; // Remove the option from saved options
    localStorage.setItem('selectedOptions', JSON.stringify(savedOptions));
  };

  const handleSubmit = () => {
    alert("Answers submitted successfully!");
    handleLogout(); // Logout after submission
  };

  return (
    <Container maxWidth="l" style={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <Grid container spacing={2}>
        {/* Left Section for Questions */}
        <Grid item xs={6}>
          <Card style={{ padding: '2rem', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {questions[currentQuestionIndex].question}
              </Typography>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <div style={{ marginTop: '2rem' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleMarkForReview}
                  style={{ marginRight: '1rem' }}
                >
                  {markedForReview.includes(currentQuestionIndex) ? "Unmark for Review" : "Mark for Review"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Submit" : "Save & Next"}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  style={{ marginLeft: '1rem' }}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleLogout}
                  style={{ marginLeft: '1rem' }}
                >
                  Logout
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearSelection}
                  style={{ marginLeft: '1rem' }}
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Section for Navigation and Stats */}
        <Grid item xs={4}>
          <Card style={{ padding: '2rem', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Box style={{ marginBottom: '1rem' }}>
                <Typography variant="body2">
                  Visited: {answeredQuestions.size}
                </Typography>
                <Typography variant="body2">
                  Marked for Review: {markedForReview.length}
                </Typography>
                <Typography variant="body2">
                  Unanswered: {questions.length - answeredQuestions.size}
                </Typography>
              </Box>
              
              <Typography variant="h6">Question Status</Typography>
              <Box
                style={{
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.5rem',
                }}
              >
                {questions.map((_, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    color={answeredQuestions.has(index) ? 'success' : markedForReview.includes(index) ? 'warning' : 'default'}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      const savedOptions = JSON.parse(localStorage.getItem('selectedOptions')) || {};
                      setSelectedOption(savedOptions[index] || null); // Load selected option for the clicked question
                    }}
                    style={{ width: '100%' }}
                  >
                    {index + 1}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Dialog */}
      <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)}>
        <DialogTitle>Submit Answers</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit your answers?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TestScreen;