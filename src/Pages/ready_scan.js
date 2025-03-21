import { Avatar, Box, Button, Card, CardContent, fabClasses, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { commondata } from '../App';

const Ready_scan = () => {
    const navigate = useNavigate(); // ✅ Always call Hooks at the top level

    const context = useContext(commondata);
    if (!context) {
        console.error("commondata context is undefined! Ensure the provider wraps the component tree.");
        return <Typography variant="h6" color="error">Context not found. Please check your provider setup.</Typography>;
    }

    const { setArticleCodeStatus, setlogin } = context;

    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null; // ✅ Handle potential null case safely
    const rights = user?.rights;

    const handleremovesession = () => {
        navigate('/', { replace: true });  // ✅ Using `navigate` safely
        sessionStorage.clear();
        setlogin(false)
    };

    const handleScanclick = () => {
        setArticleCodeStatus(true);
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ mb: 2 }} />
                        <Typography variant="h6">Login</Typography>
                    </Box>

                    {rights === "Operator" && (
                        <Grid container justifyContent="center" spacing={2} marginTop={2}>
                            <Grid item>
                                <Button variant="contained" onClick={handleScanclick}>Ready to scan</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="error" onClick={handleremovesession}>Cancel</Button>
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Ready_scan;
