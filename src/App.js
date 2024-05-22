import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function App() {

    const access = localStorage.getItem("accessToken");
    console.log("access", access)

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                        Crypto
                    </Typography>
                    <Button color="inherit" href="/login">Login</Button>
                </Toolbar>
            </AppBar>

            {/* Hero Section */}
            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to CryptoApp
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    Your gateway to the world of cryptocurrency.
                </Typography>
                <Button variant="contained" color="primary" href="/login">
                    Get Started
                </Button>
            </Box>

            {/* Features Section */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h4" component="h2" gutterBottom textAlign="center" color="white">
                    Features
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5" component="h3" gutterBottom>
                                Feature 1
                            </Typography>
                            <Typography variant="body1" component="p">
                                Data for all existing tokens.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5" component="h3" gutterBottom>
                                Feature 2
                            </Typography>
                            <Typography variant="body1" component="p">
                                Comfortable interface.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h5" component="h3" gutterBottom>
                                Feature 3
                            </Typography>
                            <Typography variant="body1" component="p">
                                real-time Chart.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* About Section */}
            <Box sx={{ p: 5, backgroundColor: '#e0e0e0', textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    About Us
                </Typography>
                <Typography variant="body1" component="p">
                    CryptoApp is designed to help you navigate the complex world of cryptocurrency with ease and confidence. Our platform offers real-time data, insightful analysis, and a user-friendly interface.
                </Typography>
            </Box>

            {/* Footer */}
            <Box sx={{ p: 2, backgroundColor: '#212121', color: '#ffffff', textAlign: 'center' }}>
                <Typography variant="body2" component="p">
                    &copy; 2024 CryptoApp. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default App;
