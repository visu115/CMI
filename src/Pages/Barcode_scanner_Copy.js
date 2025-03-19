import { Button, Card, CardContent, FormControl, Grid, Slider, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import { commondata } from '../App';






const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 100,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
        backgroundColor: '#4caf50',
    },
}));
const BlueLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 100,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
        backgroundColor: '#2196f3',
    },
}));

const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 100,
    borderRadius: 5,
    backgroundColor: theme.palette.grey[300],
    '& .MuiLinearProgress-bar': {
        borderRadius: 5,
        backgroundColor: '#f44336',
    },
}));



const Barcode_scanner = () => {


    const {setlogin,socket,testingData,setTestingData}=useContext(commondata)
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        'Page A',
        'Page B',
        'Page C',
        'Page D',
        'Page E',
        'Page F',
        'Page G',
    ];

    const marks = [
        {
            value: 0,
            label: 'L1',
        },
        {
            value: 50,
            label: 'L2',
        },
        {
            value: 100,
            label: '0',
        },

    ];

    function valuetext(value) {
        return `${value}°C`;
    }
    return (
        <div>
            <Card>
                <CardContent>

                    <Grid container spacing={2} columnSpacing={12}>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Barcode 1</Typography>
                        </Grid>
                        <Grid item xl={3} lg={4} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' value= {testingData['article_code']} readonly />
                            </FormControl>
                        </Grid>
                        <Grid item xl={2} lg={2} xs={12}>
                            <Typography>Barcode 2</Typography>
                        </Grid>
                        <Grid item xl={3} lg={4} xs={12}>
                            <FormControl fullWidth>
                                <TextField variant='outlined' />
                            </FormControl>
                        </Grid>
                        {/* <Grid item xl={2} lg={2} xs={12} display={'flex'} >
                            <Button variant='contained'>Submit</Button>
                        </Grid> */}
                    </Grid>

                    <Grid container spacing={2} marginTop={'1%'}>
                        <Grid item xl={7} lg={7} xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xl={3} lg={2} xs={12}>
                                    <Typography fontWeight={600}>Needle :</Typography>
                                </Grid>
                                <Grid item xl={9} lg={2} xs={12}>
                                    <Typography> {testingData['codereader2']}</Typography>
                                </Grid>
                                <Grid item xl={3} lg={2} xs={12}>
                                    <Typography fontWeight={600}>Needle Thread:</Typography>
                                </Grid>
                                <Grid item xl={9} lg={2} xs={12}>
                                    <Typography>{testingData['codereader3']}</Typography>
                                </Grid>
                                <Grid item xl={3} lg={2} xs={12}>
                                    <Typography fontWeight={600}>Bobbin Thread:</Typography>
                                </Grid>
                                <Grid item xl={9} lg={2} xs={12}>
                                    <Typography> {testingData['codereader1']}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    
                    <Card sx={{ backgroundColor: '#E5E4E2', marginTop: '1%' }} >
                                            {/* Progress Area */}
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={4} style={{ position: `relative` }}>
                            <GreenLinearProgress variant="determinate" value={testingData['session 1'] ? ((Number(testingData['session 1']) / 300) * 100) : 0} />
                            <Box sx={{ minWidth: 35 }} className='progross-center-text'>
                                SECTION 1 - {testingData['session 1']}
                            </Box>
                        </Grid>
                        <Grid item xs={4} style={{ position: `relative` }}>
                            <BlueLinearProgress variant="determinate" value={testingData['session 2'] ? ((Number(testingData['session 2']) / 300) * 100) : 0} />
                            <Box sx={{ minWidth: 35 }} className='progross-center-text'>
                                STITCHES SECTION 2 - {testingData['session 2']}
                            </Box>
                        </Grid>
                        <Grid item xs={4} style={{ position: `relative` }}>
                            <RedLinearProgress variant="determinate" value={testingData['session 3'] ? ((Number(testingData['session 3']) / 300) * 100) : 0} />
                            <Box sx={{ minWidth: 35 }} className='progross-center-text'>
                                STITCHES SECTION 3- {testingData['session 3']}
                            </Box>
                        </Grid>
                    </Grid>
                    </Card>
                    <Card sx={{ backgroundColor: '#E5E4E2', marginTop: '1%' }} >
                        <Grid container justifyContent={'center'} padding={'1.5%'} >
                            <Grid item xl={10} display={'flex'} alignItems={'center'} >
                                <Grid container spacing={2}>
                                    <Grid item xl={12} lg={12} xs={12}>
                                        <Typography>NA1</Typography>
                                        <Slider

                                            aria-labelledby="track-inverted-slider"
                                            getAriaValueText={valuetext}
                                            defaultValue={12}
                                            marks={marks}
                                            className='full_slider'
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid container spacing={2} marginTop={'0.2%'} alignItems={'center'}>
                        <Grid item xl={7} lg={7} xs={12}>
                            <Card sx={{ backgroundColor: '#E5E4E2', }} >

                                <LineChart
                                    height={500}
                                    series={[
                                        { data: pData, label: 'pv' },
                                        { data: uData, label: 'uv' },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                />
                            </Card>


                        </Grid>

                        <Grid item xl={5} lg={5} xs={12}  >
                            <Card sx={{ backgroundColor: '#E5E4E2', display: 'flex',  justifyContent: 'center',height:200 }}>

                                <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} >
                                    <Grid item xl={7} lg={7} xs={12}  >
                                        <Grid container spacing={2} >
                                            <Grid item xl={5} lg={5} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography fontWeight={600}>Name :</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography>Praveen </Typography>
                                            </Grid>
                                            <Grid item xl={5} lg={5} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography fontWeight={600}>Security Level :</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography>2</Typography>
                                            </Grid>
                                            <Grid item xl={5} lg={5} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography fontWeight={600}>Personnel ID :</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} xs={12} display={'flex'} justifyContent={'center'}>
                                                <Typography>3876583765478</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>

                        </Grid>
                    </Grid>

                    <Grid container marginTop={'1%'} >
                        <Grid item xl={12} gap={2} lg={12} xs={12} display={'flex'} justifyContent={'end'}>
                            <Button variant='contained'>Acknowledge</Button>
                            <Button variant='contained'>Continue</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Barcode_scanner
