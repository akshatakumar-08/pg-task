import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Card, CardContent, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Hardcoded credentials for testing
  const validEmail = 'test@example.com';
  const validPassword = 'pass@123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === validEmail && password === validPassword) {
      navigate('/test'); // Redirect to the test screen
    } 
    else {
      setError('Incorrect login credentials');
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card style={{ maxWidth: 400, padding: '2rem', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold' }}>
            Test Portal Login
          </Typography>
          <Typography align="center" color="textSecondary" paragraph>
            Please enter your credentials to proceed to the test.
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{
                marginTop: '1rem',
                backgroundColor: '#3f51b5',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem',
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
