import React, { useContext, useEffect,useState,useRef } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { commondata } from '../App';

import server1 from '../server/server1';
import server from '../server/server';

const MultipleCards = () => {
    const {socket, setsocket,testingData, setTestingData}=useContext(commondata)
    const [playload, setPlayload] = useState('1');
    //const [testingData, setTestingData] = useState({ 'D140': '' });
    const prevTestingDataRef = useRef(testingData['D140']);
    
    const fetchData = async () => {
      if (playload !== '0') {
        try {
          const response = await server.get('/check_aritical');
          const check_data = response.data;
          const uniqueData1 = check_data[0].article_code;
  
          if (uniqueData1 === testingData['D140']) {
            //alert("Tamil1111");
            console.log(uniqueData1);
  
            await server1.post('/writeD220', { playload: 1 })
              .then((res) => {
                //alert(res.data.send);
              })
              .catch((err) => { console.log(err); });
  
            setTimeout(async () => {
              setPlayload('0');
              try {
                const response = await server1.post('/writeD220', { playload: 0 });
                alert(response.data.send);
              } catch (err) {
                console.log(err);
              }
            }, 2000);
          }
        } catch (error) {
          console.error('There was an error fetching the data!', error);
        }
      }
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (prevTestingDataRef.current !== testingData['D140']) {
          console.log(testingData['D140']);
          fetchData();
          prevTestingDataRef.current = testingData['D140'];
        }
      }, 2000);
  
      return () => clearInterval(interval); // Cleanup interval
    }, [playload, testingData['D140']]);
    
    return (
            <Grid container spacing={7}>
                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Article Scan
                    </Typography>
                    <Card sx={{height: '100%' }}>
                        <CardContent>
                        <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button onClick={async()=>{
                                    console.log("enterd");
                                   
                                    await server1.post("/writeD220",{playload:0}).then((res)=>{
                                        
                                        alert(res.data.send)
                                    
                                    }).catch((err)=>{console.log(err);})
                                }} variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
{testingData['D140']}
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
                                <Button variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['D150']}
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
                                <Button variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['D160']}
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
                                <Button variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['D170']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} xl={6} lg={6}>
                    <Typography>
                        Container 2
                    </Typography>
                    <Card sx={{height: '100%' }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" marginY={'1.5%'}>
                                <Button variant="contained" sx={{ mr: 2 }}>
                                    Read
                                </Button>
                                {testingData['D180']}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
    );
};

export default MultipleCards;
