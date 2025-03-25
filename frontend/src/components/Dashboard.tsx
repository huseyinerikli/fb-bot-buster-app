import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

interface UserData {
    name: string;
    username: string;
    profileImageUrl: string;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login');
            return;
        }
        setUserData(JSON.parse(storedUser));
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!userData) {
        return null;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding={4}
            gap={2}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                maxWidth={600}
            >
                <Typography variant="h4">Dashboard</Typography>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                >
                    Logout
                </Button>
            </Box>

            <Box
                display="flex"
                alignItems="center"
                gap={2}
                padding={3}
                bgcolor="background.paper"
                borderRadius={2}
                boxShadow={1}
                width="100%"
                maxWidth={600}
            >
                <Avatar
                    src={userData.profileImageUrl}
                    alt={userData.name}
                    sx={{ width: 64, height: 64 }}
                />
                <Box>
                    <Typography variant="h6">{userData.name}</Typography>
                    <Typography color="textSecondary">@{userData.username}</Typography>
                </Box>
            </Box>

            {/* Add more dashboard content here */}
        </Box>
    );
};

export default Dashboard; 