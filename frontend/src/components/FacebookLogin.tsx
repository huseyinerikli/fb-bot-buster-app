import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

const FacebookLogin: React.FC = () => {
    useEffect(() => {
        // Check if we're returning from Facebook OAuth
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if (error) {
            console.error('Facebook login error:', error);
            // Handle error appropriately
        }
    }, []);

    const handleLogin = () => {
        // Redirect to backend Facebook OAuth endpoint
        const redirectUri = encodeURIComponent(window.location.origin + '/dashboard');
        window.location.href = `http://localhost:8080/api/oauth2/authorization/facebook?redirect_uri=${redirectUri}`;
    };

    return (
        <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            startIcon={<FacebookIcon />}
            sx={{
                backgroundColor: '#1877F2',
                '&:hover': {
                    backgroundColor: '#166FE5'
                },
                padding: '10px 20px',
                textTransform: 'none',
                fontSize: '1rem',
                width: '100%',
                maxWidth: '300px'
            }}
        >
            Login with Facebook
        </Button>
    );
};

export default FacebookLogin; 