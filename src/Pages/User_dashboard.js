import { Button, Card, CardContent, FormControl, Grid, TextField, Typography } from '@mui/material'
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
    const userName = user.user_name;  // or user['user_name']
    //console.log(userName);  // Output the userName


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
            //console.log(GetAddress);

            //console.log(Address[0].D100); // Output: 4
            // Extract the unique data you want to compare
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

        //   var dataIsValid ;

        //   if (dataIsValid) {
        //     // Redirect to the next page
        //     navigate('/sweing');
        //   } else {
        //     // Show alert message
        //     alert('Data is not valid. Please check your input.');
        //   }
    }



    // console.log(userName);

    return (
        <div>
            <Card >
                <CardContent>
                    <Grid container spacing={2} columnSpacing={13}>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography className='label'>Date</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' value={formattedDate} />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Name</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' value={userName} />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Time</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' value={formattedTime} />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>User ID</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' value={user.identification_no} />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Machine</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Security Level</Typography>
                        </Grid>
                        <Grid item xl={4} lg={4} sm={12} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} marginTop={'1%'} justifyContent={'end'}>
                        {/* <Grid item >
                            <Button variant='contained'>Access</Button>
                        </Grid>
                        <Grid item >
                            <Button variant='contained'>Sew</Button>
                        </Grid>
                        <Grid item >
                            <Button variant='contained'>Seam.rec</Button>
                        </Grid> */}
                        {/* <Grid item >
                            <Button variant='contained' color='success'>Database</Button>
                        </Grid>
                        <Grid item >
                            <Button variant='contained' color='error'>Check</Button>
                        </Grid> */}
                        <Grid item >
                            <Button
                                //component={RouterLink}
                                //to='/sweing'
                                variant='contained'
                                onClick={checkData}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default User_dashboard
