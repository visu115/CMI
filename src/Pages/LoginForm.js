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



import { useContext, useState } from "react";
import { Grid, Card, CardContent, Box, Typography, Avatar, TextField, FormControl, Button } from "@mui/material";
import server from "../server/server";
import { commondata } from '../App';
import { useNavigate } from "react-router-dom";

export default function UserAdminLogin() {
    const [mode, setMode] = useState(null);
    const [formData, setFormData] = useState({ user_name: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const { setlogin, setUser } = useContext(commondata)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const handleSubmitAdmin = async () => {
        const payload = {
            user_name: formData?.user_name,
            password: formData?.password
        }
        try {
            await server.post('/admin_register', payload)
                .then((res) => {
                    console.log(res)
                    if (res.data.access === 'admin') {
                        sessionStorage.setItem('admin', JSON.stringify(res.data));
                    }
                    setlogin(true);
                    setUser(res.data);
                    navigate('/register');
                    setErrorMessage()
                })
                .catch((err) => {
                    // Set error message for invalid login
                    if (err.response && err.response.status === 401) {
                        setErrorMessage('Invalid username or password');
                    } else {
                        setErrorMessage('Something went wrong, please try again later.');
                    }
                });
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong, please try again later.'); // Generic error message
        }
    }
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "85vh" }}>
            <Grid item xl={3} lg={4} md={6} sm={8} xs={10}>
                <Card>
                    <CardContent>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar sx={{ mb: 2 }} />
                            <Typography variant="h6">{mode === "admin" ? "Admin Login" : mode === "user" ? "Ready to Scan" : "Select Mode"}</Typography>
                        </Box>

                        {!mode && (
                            <Grid container spacing={2} justifyContent="center" marginTop={2}>
                                <Grid item>
                                    <Button variant="contained" onClick={() => setMode("user")}>User</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={() => setMode("admin")}>Admin</Button>
                                </Grid>
                            </Grid>
                        )}

                        {mode === "user" && (
                            <Grid container justifyContent="center" spacing={2} marginTop={2}>
                                <Grid item>
                                    <Button variant="contained">Ready to scan</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="error" onClick={() => setMode(null)}>Cancel</Button>
                                </Grid>
                            </Grid>
                        )}

                        {mode === "admin" && (
                            <Grid container spacing={2} marginTop={2}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Username"
                                            variant="outlined"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Password"
                                            variant="outlined"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                </Grid>
                                {errorMessage && (
                                    <Grid item xs={12}>
                                        <Typography color="error">{errorMessage}</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent="end">
                                        <Grid item>
                                            <Button variant="contained" onClick={handleSubmitAdmin} >Submit</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="error" onClick={() => setMode(null)}>Cancel</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
