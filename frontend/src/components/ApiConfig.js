import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function ApiConfig() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check URL parameters for token or error
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      localStorage.setItem('twitter_access_token', token);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      setError('Authentication failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('twitter_access_token');
      if (token) {
        const response = await axios.get('http://localhost:8080/api/v1/auth/user', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Credentials': true
          },
          withCredentials: true
        });
        setUser(response.data);
      }
    } catch (err) {
      console.error('Login check failed:', err);
      localStorage.removeItem('twitter_access_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/auth/twitter');
      window.location.href = response.data.url;
    } catch (err) {
      setError('Failed to initiate login. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('twitter_access_token');
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return (
      <Card className="mb-4">
        <Card.Body>
          <div className="text-center">Loading...</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Twitter Authentication</Card.Title>
        {user ? (
          <div>
            <div className="d-flex align-items-center mb-3">
              <img 
                src={user.profileImageUrl} 
                alt="Profile" 
                className="rounded-circle me-2" 
                style={{ width: '48px', height: '48px' }}
              />
              <div>
                <h6 className="mb-0">{user.name}</h6>
                <small className="text-muted">@{user.username}</small>
              </div>
            </div>
            <Button 
              variant="outline-danger" 
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div>
            <p>Please login with your Twitter account to analyze followers.</p>
            <Button 
              variant="primary" 
              onClick={handleLogin}
              className="d-flex align-items-center justify-content-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
              </svg>
              Login with Twitter
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default ApiConfig; 