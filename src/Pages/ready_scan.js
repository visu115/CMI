// import { Avatar, Box, Button, Card, CardContent, fabClasses, Grid, Typography } from '@mui/material';
// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { commondata } from '../App';
// import server from '../server/server';

// const Ready_scan = () => {
//     const navigate = useNavigate(); // ✅ Always call Hooks at the top level

//     const context = useContext(commondata);
//     if (!context) {
//         console.error("commondata context is undefined! Ensure the provider wraps the component tree.");
//         return <Typography variant="h6" color="error">Context not found. Please check your provider setup.</Typography>;
//     }

//     const { setArticleCodeStatus, setlogin, articleCodeStatus } = context;

//     const userString = sessionStorage.getItem('user');
//     const user = userString ? JSON.parse(userString) : null; // ✅ Handle potential null case safely
//     const rights = user?.rights;

//     const handleremovesession = () => {
//         navigate('/', { replace: true });  // ✅ Using `navigate` safely
//         sessionStorage.clear();
//         setlogin(false)
//     };



//     const handleScanclick = async () => {
//         const payload = {
//             article_code: '23323222',
//         }

//         setArticleCodeStatus(true);
//         console.log(articleCodeStatus);

//         // if (articleCodeStatus) {
//         //     navigate('/user_dashboard', { replace: true });
//         // }
//         try {
//             await server.post('/article_code_check', payload)
//                 .then((res) => {
//                     console.log(res)
//                     if (res.status === 200) {
//                         sessionStorage.setItem('article_data', JSON.stringify(res.data.data));
//                         navigate('/user_dashboard');
//                     }
//                     else if (res.status === 400) {
//                         // sessionStorage.setItem('user', JSON.stringify(res.data.data));
//                         alert(res.data.message)
//                     }
//                 })
//                 .catch((err) => {
//                     // Set error message for invalid login
//                     if (err.response && err.response.status === 401) {
//                         console.log('invalid article code');
//                     } else {
//                         console.log('Something went wrong, please try again later.');
//                     }
//                 });
//         } catch (error) {
//             console.error(error);
//             console.log('Something went wrong, please try again later.'); // Generic error message
//         }
//     };

//     return (
//         <div>
//             <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "85vh" }}>
//                 <Grid item xl={3} lg={4} md={6} sm={8} xs={10}>
//                     <Card>
//                         <CardContent>
//                             <Box display="flex" flexDirection="column" alignItems="center">
//                                 <Avatar sx={{ mb: 2 }} />
//                                 <Typography variant="h6">Articel Code scanner</Typography>
//                             </Box>

//                             {rights === "Operator" && (
//                                 <Grid container justifyContent="center" spacing={2} marginTop={2}>
//                                     <Grid item>
//                                         <Button variant="contained" onClick={handleScanclick}>Ready to scan</Button>
//                                     </Grid>
//                                     <Grid item>
//                                         <Button variant="contained" color="error" onClick={handleremovesession}>Cancel</Button>
//                                     </Grid>
//                                 </Grid>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//         </div>
//     );
// };

// export default Ready_scan;


import React, { useContext } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
    Paper
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import { commondata } from '../App';
import server from '../server/server';

const Ready_scan = () => {
    const navigate = useNavigate();
    const context = useContext(commondata);

    // Destructure context with fallback
    const {
        setArticleCodeStatus,
        setlogin,
        articleCodeStatus
    } = context || {};

    // Safely retrieve user from session storage
    const userString = sessionStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const rights = user?.rights;

    // Handle logout and session removal
    const handleRemoveSession = () => {
        sessionStorage.clear();
        setlogin(false);
        navigate('/', { replace: true });
    };

    // Handle scan process
    const handleScanClick = async () => {
        const payload = {
            article_code: '23323222', // Hardcoded for demonstration
        };

        try {
            const res = await server.post('/article_code_check', payload);

            if (res.status === 200) {
                // Store article data and navigate to dashboard
                sessionStorage.setItem('article_data', JSON.stringify(res.data.data));
                navigate('/user_dashboard');
            } else {
                // Handle unsuccessful scan
                alert(res.data.message || 'Unable to process scan');
            }
        } catch (error) {
            console.error('Scan error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                minHeight: "100vh",
                background: '#f0f2f5'
            }}
        >
            <Grid item xs={11} sm={8} md={6} lg={4}>
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Card>
                        <CardContent
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 3
                            }}
                        >
                            <Avatar
                                sx={{
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    width: 56,
                                    height: 56
                                }}
                            >
                                <QrCodeScannerIcon />
                            </Avatar>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{
                                    mb: 3,
                                    textAlign: 'center'
                                }}
                            >
                                Article Code Scanner
                            </Typography>

                            {rights === "Operator" && (
                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ width: '100%' }}
                                >
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            startIcon={<QrCodeScannerIcon />}
                                            onClick={handleScanClick}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 1,
                                                textTransform: 'none'
                                            }}
                                        >
                                            Ready to Scan
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="error"
                                            startIcon={<CancelOutlinedIcon />}
                                            onClick={handleRemoveSession}
                                            sx={{
                                                py: 1.5,
                                                borderRadius: 1,
                                                textTransform: 'none'
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Ready_scan;