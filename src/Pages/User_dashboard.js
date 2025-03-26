import { Box, Button, Card, CardContent, Container, FormControl, Grid, Paper, TextField, Typography } from '@mui/material'
import { React, Link, useState, useEffect, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import server from '../server/server';
import { useNavigate } from 'react-router-dom';
import { commondata } from '../App';



const User_dashboard = () => {

    const navigate = useNavigate();
    const { socket, setsocket } = useContext(commondata)
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second
        fetchData();
        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    // Format the date and time
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();

    const [data, setData] = useState([]);


    // Get data from session storage
    const userString = sessionStorage.getItem('user');
    //setLoading(true);
    const user = JSON.parse(userString);

    // Access the user_name property
    const userName = user?.user_name;  // or user['user_name']
    //console.log(userName);  // Output the userName
    const rights = user?.rights

    const fetchData = async () => {
        try {



            // console.log(user.user_name);
            const response = await server.get('/loginUsers', {
                params: { pharma: userName }  // Pass userName as a query parameter
            });
            setData(response.data); // Correct the property to access response data
            //setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            //setLoading(false); 
        }
    };



    const checkData = async (e) => {
        e.preventDefault(); // Prevent the default link behavior
        console.log("Testing data");
        // Your logic to check the data

        try {
            // Fetch data from the first endpoint
            const response_plc = await server.get('/check_plc');
            const Address = response_plc.data;
            //console.log(Address.D100);

            // Fetch data from the second endpoint
            const response_db = await server.get('/check_db');
            const GetAddress = response_db.data;

            const uniqueData1 = Address[0].D100; // Replace with the actual unique data key

            const uniqueData2 = GetAddress[0].seam_no; // Replace with the actual unique data key
            console.log(uniqueData1, uniqueData2);
            // Compare the unique data
            if (uniqueData1 === uniqueData2) {
                // If the data is valid, navigate to the next page
                alert('Ready To Start Machine');
                socket.emit("CheckAPI", "Start Machine");
                navigate('/sweing');
            } else {
                // If the data is not valid, show an alert message
                alert('Data is not valid. Please check your input.');
            }

        } catch (e) {
            console.error('There was an error fetching the data!', e);
        }


    }


    return (
        // <div>
        //     <Card >
        //         <CardContent>
        //             <Grid container spacing={2} columnSpacing={13}>
        //                 <Grid item xl={2} lg={2} xs={12}>
        //                     <Typography>Name</Typography>
        //                 </Grid>
        //                 <Grid item xl={4} lg={4} sm={12} xs={12}>
        //                     <FormControl fullWidth>
        //                         <TextField variant='outlined' value={userName} />
        //                     </FormControl>
        //                 </Grid>
        //                 <Grid item xl={2} lg={2} xs={12}>
        //                     <Typography>Rights</Typography>
        //                 </Grid>
        //                 <Grid item xl={4} lg={4} sm={12} xs={12}>
        //                     <FormControl fullWidth>
        //                         <TextField variant='outlined' value={rights} />
        //                     </FormControl>
        //                 </Grid>
        //                 <Grid item xl={2} lg={2} xs={12}>
        //                     <Typography className='label'>Date</Typography>
        //                 </Grid>
        //                 <Grid item xl={4} lg={4} sm={12} xs={12}>
        //                     <FormControl fullWidth>
        //                         <TextField variant='outlined' value={formattedDate} />
        //                     </FormControl>
        //                 </Grid>

        //                 <Grid item xl={2} lg={2} xs={12}>
        //                     <Typography>Time</Typography>
        //                 </Grid>
        //                 <Grid item xl={4} lg={4} sm={12} xs={12}>
        //                     <FormControl fullWidth>
        //                         <TextField variant='outlined' value={formattedTime} />
        //                     </FormControl>
        //                 </Grid>

        //             </Grid>
        //             <Grid container spacing={3} marginTop={'1%'} justifyContent={'end'}>

        //                 <Grid item >
        //                     <Button

        //                         variant='contained'
        //                         onClick={checkData}
        //                     >
        //                         Next
        //                     </Button>
        //                 </Grid>
        //             </Grid>
        //         </CardContent>
        //     </Card>
        // </div>
        <Box mt={1}>
            <Paper
                elevation={4}
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%)',
                    boxShadow: '0 3px 3px 3px rgba(0,0,0,0.1)',
                    // maxWidth: 1200,
                    width: '100%',
                    margin: 'auto'
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            color: 'primary.dark',
                            textTransform: 'uppercase',
                            letterSpacing: 1,
                            position: 'relative',
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                bottom: -8,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '60%',
                                height: 3,
                                backgroundColor: 'primary.main'
                            }
                        }}
                    >
                        User Dashboard
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {[
                        { label: 'Name', value: userName, icon: '👤' },
                        { label: 'Rights', value: rights, icon: '🔒' },
                        { label: 'Date', value: formattedDate, icon: '📅' },
                        { label: 'Time', value: formattedTime, icon: '⏰' }
                    ].map(({ label, value, icon }) => (
                        <Grid item xs={6} key={label}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'background.paper',
                                borderRadius: 2,
                                p: 2,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <Box sx={{
                                    mr: 2,
                                    fontSize: 24,
                                    opacity: 0.7
                                }}>
                                    {icon}
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        sx={{ mb: 0.5 }}
                                    >
                                        {label}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'text.primary'
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 4
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={checkData}
                        sx={{
                            px: 5,
                            py: 1.5,
                            borderRadius: 3,
                            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.3)'
                            }
                        }}
                    >
                        Start Machine
                    </Button>
                </Box> */}
            </Paper>
        </Box>

    )
}

export default User_dashboard
