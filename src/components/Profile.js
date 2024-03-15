import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import {Card, CardHeader} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                GGGdemocracy
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken'); // Use 'accessToken' key
                if (!token) {
                    throw new Error('Missing JWT token');
                }

                const response = await fetch('http://localhost:8000/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUserProfile();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading user profile...</div>;
    }

    // **Security: Omit hashed_password from display**
    const {id, username} = userData; // Destructure without hashed_password


    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ flexGrow: 1 }}> {/* Added for AppBar positioning */}
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            GGGdemocracy
                        </Typography>
                        <Button color="inherit" href="/login">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs" sx={{marginTop:8,}}>
                    <CssBaseline />
                    <Card sx={{ borderRadius: 4, mb: 4 }}> {/* Add spacing below the card */}
                        <CardHeader
                            title="Your Profile"
                            subheader="User Details"
                        />
                        <Box
                            sx={{

                                margin: 1,
                                marginBottom: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                // Optional: Adjust padding if needed
                                padding: (theme) => theme.spacing(2),
                            }}
                        >
                            <Typography component="h1" variant="h5">
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <Grid >
                                    <Grid>
                                        <Avatar sx={{ width: 100, height: 100 }}>
                                            {username[0].toUpperCase()}
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">{username}</Typography>
                                        <Typography variant="body1">ID: {id}</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Card>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Profile;
