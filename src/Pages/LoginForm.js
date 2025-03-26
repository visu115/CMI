// import { Avatar, Box, Button, Card, CardContent, FormControl, Grid, TextField, Typography } from '@mui/material'
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom'
// import server from '../server/server';
// import server1 from '../server/server1';
// import { commondata } from '../App';



// export default function LoginForm() {

// const {setlogin,setUser}=useContext(commondata)
//     const [formData, setFormData] = useState({
//         user_name: '',
//         password: ''
//     });
//     const [errorMessage, setErrorMessage] = useState('');
//     // const { user_name, password } = formData;

//     const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const navigate = useNavigate();

//     const handleClick = async (e) => {
//         e.preventDefault();
//         setErrorMessage(''); // Clear error message before new request
//         try {
//           await server.post('/login', formData)
//             .then((res) => {
//               setlogin(true);
//               sessionStorage.setItem('user', JSON.stringify(res.data));
//               setUser(res.data);
//               navigate('/user_dashboard');
//             })
//             .catch((err) => {
//               // Set error message for invalid login
//               if (err.response && err.response.status === 401) {
//                 setErrorMessage('Invalid username or password');
//               } else {
//                 setErrorMessage('Something went wrong, please try again later.');
//               }
//             });
//         } catch (error) {
//           console.error(error);
//           setErrorMessage('Something went wrong, please try again later.'); // Generic error message
//         }
//       };


//     //const navigate = useNavigate()

//     return (
//         <div>
//             <Grid container justifyContent={'center'} alignItems={'center'} style={{ minHeight: '70vh' }}>
//                 <Grid item xl={3} lg={3} md={6} sm={8} xs={10}>
//                     <Card>
//                         <CardContent>
//                             <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
//                                 <Avatar sx={{ mb: 2 }} />
//                                 <Typography variant={'h6'}>User Login</Typography>
//                             </Box>
//                             <Grid container spacing={2} marginY={'1%'}>
//                                 <Grid item xs={12}>
//                                     <Grid container spacing={5}>
//                                         {/* <Grid item xl={3} lg={3} sm={12} xs={12}>
//                                             <Typography>User</Typography>
//                                         </Grid> */}
//                                         <Grid item xl={12} lg={12} sm={12} xs={12}>
//                                             <FormControl fullWidth>
//                                             <TextField
//                                                     variant='outlined'
//                                                     name='user_name'
//                                                     value={formData.user_name}
//                                                     onChange={onChange}
//                                                 />
//                                             </FormControl>
//                                         </Grid>
//                                         {/* <Grid item xl={3} lg={3} sm={12} xs={12}>
//                                             <Typography>Password</Typography>
//                                         </Grid> */}
//                                         <Grid item xl={12} lg={12} sm={12} xs={12}>
//                                             <FormControl fullWidth>
//                                             <TextField
//                                                     variant='outlined'
//                                                     type='password'
//                                                     name='password'
//                                                     value={formData.password}
//                                                     onChange={onChange}
//                                                 />
//                                             </FormControl>
//                                         </Grid>

//                                         {errorMessage && ( // Conditionally show error message
//                       <Grid item xs={12}>
//                         <Typography color="error">{errorMessage}</Typography>
//                       </Grid>
//                     )}

//                                         <Grid item xs={12}>
//                                             <Grid container spacing={2} justifyContent={'end'}>
//                                                 <Grid item>
//                                                     <Button variant='contained' onClick={handleClick} >Submit</Button>
//                                                 </Grid>
//                                                 <Grid item>
//                                                     <Button variant='contained' >Cancel</Button>
//                                                 </Grid>
//                                             </Grid>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }



// import { useContext, useEffect, useState } from "react";
// import { Grid, Card, CardContent, Box, Typography, Avatar, TextField, FormControl, Button } from "@mui/material";
// import server from "../server/server";
// import { commondata } from '../App';
// import { useNavigate } from "react-router-dom";

// export default function UserAdminLogin() {

//     // const checkArticledata = '1234';
//     const [mode, setMode] = useState(null);
//     const [test, setTest] = useState(null);
//     const [formData, setFormData] = useState({ user_name: "", password: "" });
//     const [errorMessage, setErrorMessage] = useState("");
//     const { setlogin, setUser, setArticleCodeStatus } = useContext(commondata)
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const navigate = useNavigate();
//     const handleSubmitAdmin = async () => {
//         const payload = {
//             // user_name: formData?.user_name.trim(),
//             // password: formData?.password.trim()
//             user_name: 'Visu',
//             password: 'visu@123'
//         }
//         try {
//             await server.post('/login_check', payload)
//                 .then((res) => {
//                     setErrorMessage()
//                     console.log(res)
//                     if (res.data.data.rights === 'Maintenance' && res.data.status === 'ok') {
//                         sessionStorage.setItem('user', JSON.stringify(res.data.data));
//                         navigate('/register');
//                         setMode(res.data.data.rights)
//                     }
//                     else if (res.data.data.rights === 'Operator' && res.data.status === 'ok') {
//                         sessionStorage.setItem('user', JSON.stringify(res.data.data));
//                         // navigate('/ready_scan');

//                         setMode(res.data.data.rights)


//                     }

//                     console.log(formData);
//                     setlogin(true);
//                     setFormData({ user_name: "", password: "" });
//                     setUser(res.data);
//                 })
//                 .catch((err) => {
//                     // Set error message for invalid login
//                     if (err.response && err.response.status === 401) {
//                         setErrorMessage('Invalid username or password');
//                     } else {
//                         setErrorMessage('Something went wrong, please try again later.');
//                     }
//                 });
//         } catch (error) {
//             console.error(error);
//             setErrorMessage('Something went wrong, please try again later.'); // Generic error message
//         }
//     }

//     return (
//         <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "85vh" }}>
//             <Grid item xl={3} lg={4} md={6} sm={8} xs={10}>
//                 <Card>
//                     <CardContent>
//                         <Box display="flex" flexDirection="column" alignItems="center">
//                             <Avatar sx={{ mb: 2 }} />
//                             <Typography variant="h6">Login</Typography>
//                         </Box>

//                         <Grid container justifyContent="center" spacing={2} marginTop={2}>
//                             <Grid item>
//                                 <Button onClick={handleSubmitAdmin} variant="contained">Ready to scan</Button>
//                             </Grid>
//                         </Grid>
//                     </CardContent>
//                 </Card>
//             </Grid>
//         </Grid>
//     );
// }


import React, { useContext, useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Box,
    Typography,
    Button,
    Avatar
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import server from "../server/server";
import { commondata } from '../App';
import { useNavigate } from "react-router-dom";

export default function UserAdminLogin() {
    const [mode, setMode] = useState(null);
    const [formData, setFormData] = useState({ user_name: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setlogin, setUser } = useContext(commondata);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmitAdmin = async () => {
        setIsLoading(true);

        const payload = {
            // user_name: formData?.user_name.trim(),
            //             // password: formData?.password.trim()
            user_name: 'Tamil',
            password: 'Tamil'
        };

        try {
            const res = await server.post('/login_check', payload);
            setErrorMessage()
            console.log(res)
            if (res.data.data.rights === 'Maintenance' && res.data.status === 'ok') {
                sessionStorage.setItem('user', JSON.stringify(res.data.data));
                navigate('/register');
                setMode(res.data.data.rights)
            }
            else if (res.data.data.rights === 'Operator' && res.data.status === 'ok') {
                sessionStorage.setItem('user', JSON.stringify(res.data.data));
                // navigate('/ready_scan');

                setMode(res.data.data.rights)


            }

            console.log(formData);
            setlogin(true);
            setFormData({ user_name: "", password: "" });
            setUser(res.data);
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Something went wrong, please try again later.'); // Generic error message

            // Optionally, you could add error handling here
        } finally {
            setIsLoading(false);
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
                <Card
                    sx={{
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
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
                            <LockOpenIcon />
                        </Avatar>

                        <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                                mb: 3,
                                textAlign: 'center'
                            }}
                        >
                            Login
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<LockOpenIcon />}
                            onClick={handleSubmitAdmin}
                            disabled={isLoading}
                            sx={{
                                py: 1.5,
                                borderRadius: 1,
                                textTransform: 'none'
                            }}
                        >
                            {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}