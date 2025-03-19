import React, { useContext, useEffect,useState,useRef } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { commondata } from '../App';

import server1 from '../server/server1';
import server from '../server/server';

const MultipleCards = () => {
    const {socket, setsocket,testingData, setTestingData}=useContext(commondata)
    // const [playload, setPlayload] = useState('1');
    // //const [testingData, setTestingData] = useState({ 'D140': '' });
    // const prevTestingDataRef = useRef(testingData['D140']);
    
    // const fetchData = async () => {
        
    //     if (playload !== '0') {
    //       try {
    //         const response = await server.get('/check_aritical');
    //         const check_data = response.data;
    //         const uniqueData1 = check_data[0].article_code;
      
    //         const codereader1 = check_data[0].codereader1;
    //         const codereader2 = check_data[0].codereader2;
    //         const codereader3 = check_data[0].codereader3;
    //         const codereader4 = check_data[0].codereader4;
      
    //         if (uniqueData1 === testingData['D140']) {
    //           console.log(uniqueData1);
      
    //           try {
    //             const res = await server1.post('/writeD220', { playload: 1 });
      
    //             setTimeout(async () => {
    //               setPlayload('0');
    //               try {
    //                 const response = await server1.post('/writeD220', { playload: 0 });
    //                 alert(response.data.send);
    //               } catch (err) {
    //                 console.log(err);
    //               }
    //             }, 2000);

    //             setTimeout(async () => {
    //                 if (codereader1 === testingData['D150']) {
    //                     alert("Test123");
    //                   await server1.post('/writeD222', { playload: 1 });
    //                 }


    //             },3000);
    //           } catch (err) {
    //             console.log(err);
    //           }
              
    //         }
    //       } catch (error) {
    //         console.error('There was an error fetching the data!', error);
    //       }
    //     }
    //   };
      
  
    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     if (prevTestingDataRef.current !== testingData['D140']) {
    //       console.log(testingData['D140']);
    //       fetchData();
    //       prevTestingDataRef.current = testingData['D140'];
    //     }
    //   }, 2000);
  
    //   return () => clearInterval(interval); // Cleanup interval
    // }, [playload, testingData['D140'],testingData['D150']]);


    const handleSubmitClick = async (AddressValue, extraValue) => {        
        try {
            const add = extraValue;
            const dataToSend = { value:AddressValue, address:add};
            const response = await server.post('/swing', dataToSend);
            
            // Handle the response from the backend
            if (response.status === 200) {
                console.log('Data saved successfully',add);
               // Set a timeout to update 'AddressValue' after 3 seconds
            setTimeout(() => {
                AddressValue = 'false';
                console.log('AddressValue updated to', AddressValue);

                // Optionally, trigger the function again with the updated value
                handleSubmitClick(AddressValue, extraValue);
            }, 3000);

            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    };


    
    return (
            <Grid container spacing={7}>
                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Article Scan
                    </Typography>
                    <Card sx={{height: '100%' }}>
                        <CardContent>
                        <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button 
                                disabled
                                //onBlur={(e) => handleSubmitClick(e.target.value, 'D410')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
{testingData['article_code']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Barcode 
                    </Typography>
                    <Card sx={{height: '100%'}}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button
                                onClick={(e) => handleSubmitClick('true', 'H70.9')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['codereader1']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Bobbin 
                    </Typography>
                    <Card sx={{height: '100%'}}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button
                                onClick={(e) => handleSubmitClick('true', 'H70.10')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['codereader1']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Needle
                    </Typography>
                    <Card sx={{height: '100%'}}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button
                                onClick={(e) => handleSubmitClick('true', 'H70.12')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['codereader2']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Thread
                    </Typography>
                    <Card sx={{height: '100%'}}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button
                                onClick={(e) => handleSubmitClick('true', 'H70.13')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['codereader3']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Door
                    </Typography>
                    <Card sx={{height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button
                                onClick={(e) => handleSubmitClick('true', 'H70.11')}
                                variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['codereader4']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    );
};

export default MultipleCards;
