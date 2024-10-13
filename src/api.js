import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'https://api-url.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call: Fetch questions (dummy endpoint)
export const fetchQuestions = async () => {
  try {
    const response = await api.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Example API call: User login
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default api;
