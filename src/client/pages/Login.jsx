import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AnimatedWave from '../components/AnimatedWave/AnimatedWave';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3020/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        // Redirect to main page
        navigate('/main-page/home');
      } else {
        // reroute to mainpage
        // Branden might need to change this
        // navigate('/');
        console.error('Login failed:');
      }
    } catch (error) {
      // need error handler
      console.error('Error during login:', error);
    }
  };

  return (
    <>
      <AnimatedWave />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'center',
          zIndex: 2,
          position: 'relative',
        }}
      >
        {/* <Container component="main" maxWidth="xs"> */}
        {/* <CssBaseline /> */}
        <Box
          sx={{
            padding: 10,
            marginTop: 'auto',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            width: '30vw',
            borderRadius: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              autoComplete="username"
              id="username"
              label="Username"
              margin="normal"
              name="username"
              autoFocus
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              autoComplete="current-password"
              id="password"
              label="Password"
              margin="normal"
              name="password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <a
              href="http://localhost:3020/api/auth/google"
              style={{ textDecoration: 'none' }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: '#4285F4' }}
              >
                Log in with Google
              </Button>
            </a>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
