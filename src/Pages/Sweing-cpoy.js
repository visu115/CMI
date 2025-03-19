import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, Grid, LinearProgress, TextField, InputAdornment, IconButton, Button, Box, Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link as RouterLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import server from '../server/server';

//import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import { commondata } from '../App';
//const ENDPOINT = "http://localhost:5001";
// Adjust the URL to match your server


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


const data = [
    {
      label: 'Seam program',
      value: '',
      address: 'D104',
    },
    {
      label: 'Artical Scan',
      value: '',
      address: 'D105',
    },
    {
      label: 'Program No',
      value: '',
      address: 'D312',
    },
    // Add more objects for additional text boxes
  ];
  




function Sweing() {
    const { socket, setsocket, testingData, setTestingData } = useContext(commondata)
    // State for the values of labels
    const [labels, setLabels] = useState({
        firstLabel: '',
        secondLabel: '',
        thirdLabel: '',
    });

    // Function to update labels state
    const handleLabelChange = (labelName, value) => {
        setLabels(prevState => ({
            ...prevState,
            [labelName]: value,
        }));
    };

    const [liveData, setLiveData] = useState();

    // const [testingData, setTestingData] = useState(null);











    // const [firstProgress, setFirstProgress] = useState(70);
    // const [secondProgress, setSecondProgress] = useState(50);
    // const [thirdProgress, setThirdProgress] = useState(30);
    const [activeProgress, setActiveProgress] = useState({});

    // const handleProgressChange = (progressName, value) => {
    //     switch (progressName) {
    //         case 'firstProgress':
    //             setFirstProgress(value);
    //             //setActiveProgress("89");
    //             setActiveProgress({
    //                 first: "10",
    //                 second: "20",
    //                 third: "30",
    //                 fourth: "40",
    //                 fifth: "50",
    //                 sixith: "40",
    //                 seventh: "50"
    //               });
    //             break;
    //         case 'secondProgress':
    //             setSecondProgress(value);
    //             //setActiveProgress(value);
    //             setActiveProgress({
    //                 first: "100",
    //                 second: "200",
    //                 third: "300",
    //                 fourth: "400",
    //                 fifth: "500",
    //                 sixith: "400",
    //                 seventh: "500"
    //               });
    //             break;
    //         case 'thirdProgress':
    //             setThirdProgress(value);
    //             //setActiveProgress(value);
    //             setActiveProgress({
    //                 first: "1000",
    //                 second: "2000",
    //                 third: "3000",
    //                 fourth: "4000",
    //                 fifth: "5000",
    //                 sixith: "6000",
    //                 seventh: "7000"

    //               });
    //             break;
    //         default:
    //             break;
    //     }
    // };


    //Auto Run



    // const [progress, setProgress] = useState({
    //     green: 0,
    //     blue: 0,
    //     red: 0,
    // });
    // const [current, setCurrent] = useState('green');

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prev) => {
    //             let newProgress = { ...prev };

    //             if (current === 'green') {
    //                 newProgress.green = testingData['D108'];
    //                 setActiveProgress({
    //                     first: "10",
    //                     second: "20",
    //                     third: "30",
    //                     fourth: "40",
    //                     fifth: "50",
    //                     sixith: "40",
    //                     seventh: "50"
    //                   });
    //                 setCurrent('blue');
    //             }  if (current === 'blue' && testingData['D240'] === 1 ) {
    //                 newProgress.blue = testingData['D108'];
    //                 setCurrent('red');
    //             }  if (current === 'red' && testingData['D242'] === 1) {
    //                 newProgress.red = testingData['D108'];
    //                 setCurrent('green');
    //             }

    //             return newProgress;
    //         });
    //     }, 100); // Adjust the interval time as needed

    //     return () => clearInterval(timer); // Clean up the interval on component unmount
    // }, [current, testingData]);


    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState('');
    const [textValue1, setTextValue1] = useState(JSON.stringify({ D312: {} }, null, 2));
    const [textValue2, setTextValue2] = useState(JSON.stringify({ D312: {} }, null, 2));

    const [textValues, setTextValues] = useState(data.map((item) => item.value));

    // const handleTextChange = (e) => {
    //     setText(e.target.value);
    // }

    // const handleEditClick = () => {
    //     setIsEditable(true);
    // };

    // const handleCheckClick = () => {

    //     setIsEditable(false);
    // };


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = { value, address };
    //     server.post('/swing', data)
    //     .then(response => setResponseData(response.data))
    //     .catch(error => console.error(error));
    //   };

    const handleEditClick = (index) => {
        setIsEditable((prevEditable) => prevEditable.map((item, i) => (i === index ? true : item)));
      };
    
      const handleCheckClick = async (index, event) => {
        event.preventDefault();
        const dataToSend = { data: JSON.parse(textValues[index]), address: data[index].address };
        console.log(dataToSend);
    
        try {
          // Make the API call to send data to the backend
          const response = await server.post('/swing', dataToSend);
    
          // Handle the response from the backend
          if (response.status === 200) {
            console.log('Data saved successfully');
            setIsEditable((prevEditable) => prevEditable.map((item, i) => (i === index ? false : item)));
          } else {
            console.error('Failed to save data');
          }
        } catch (error) {
          console.error('Error while sending data:', error);
        }
      };
    
      const handleTextChange = (index, value) => {
        setTextValues((prevValues) => prevValues.map((item, i) => (i === index ? value : item)));
      };
    
    //console.log(testingData);


    return (

        <div className='sweing-card'>
            {/* <h4 onClick={()=>{socket.emit('FromAPI',{Test:"TEst123"});console.log("Clrcked");}}>Live Data</h4>
      {liveData && <pre>{JSON.stringify(liveData, null, 2)}</pre>}
      <h4>Testing Data</h4>
      {testingData && <pre>{JSON.stringify(testingData, null, 2)}</pre>} */}
            <Card>
                <CardContent style={{ boxShadow: `none !important`, backgroundColor: `#fff` }}>

                    {/* Top Area */}
                    <Grid container spacing={2} columns={21}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item md={2}>
            <Typography>{item.label}</Typography>
          </Grid>
          <Grid item md={3}>
            <TextField
              variant="outlined"
              value={textValues[index]}
              onChange={(e) => handleTextChange(index, e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {isEditable[index] ? (
                      <IconButton onClick={(event) => handleCheckClick(index, event)} color="success">
                        <CheckCircleIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEditClick(index)} color="primary">
                        <EditIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
                readOnly: !isEditable[index],
              }}
              autoFocus={index === 0} // autofocus on the first text box
            />
          </Grid>
          <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
            {/* empty grid item */}
          </Grid>
        </React.Fragment>
      ))}
    </Grid>


                    <FormControlLabel control={<Switch defaultChecked />} label="Machines" />


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



                    {/* Sliders to Adjust Progress */}
                    {/* <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={4}>
                    <Slider
                        value={firstProgress}
                        onChange={(e, value) => handleProgressChange('firstProgress', value)}
                        aria-labelledby="first-progress-slider"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Slider
                        value={secondProgress}
                        onChange={(e, value) => handleProgressChange('secondProgress', value)}
                        aria-labelledby="second-progress-slider"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Slider
                        value={thirdProgress}
                        onChange={(e, value) => handleProgressChange('thirdProgress', value)}
                        aria-labelledby="third-progress-slider"
                    />
                </Grid>
            </Grid> */}


                    <Grid container spacing={3} style={{ marginTop: '20px' }}></Grid>

                    <Grid container spacing={2} columns={21}>
                        <Grid item md={2}>
                            <Typography>Seam program</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                //label="Stitching Types"
                                variant="outlined"
                                type='text'
                                value={`SAB`}
                                onChange={(e) => handleLabelChange('firstLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item md={2}>
                            <Typography>Thread Tension</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                // label="max. speed"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.first || ""}
                                // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>


                        <Grid item md={2}>
                            <Typography>Stitch length</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                //label="Stitch length"
                                variant="outlined"
                                type='text'
                                // value={activeProgress.second || ""}
                                onChange={(e) => handleLabelChange('secondLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}

                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>


                    </Grid>

                    <Grid container spacing={2} style={{ marginTop: '20px' }}></Grid>

                    <Grid container spacing={2} columns={21}>

                        <Grid item md={2}>
                            <Typography>Foot Pressure</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                // label="max. speed"
                                variant="outlined"
                                type='text'
                                // value={activeProgress.first || ""}
                                // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item md={2}>
                            <Typography>Fout Height</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                // label="max. speed"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.first || ""}
                                // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>


                        <Grid item md={2}>
                            <Typography>Stitch length</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                //label="Stitch length"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.second || ""}
                                onChange={(e) => handleLabelChange('secondLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                    </Grid>

                    <Grid container spacing={3} style={{ marginTop: '20px' }}></Grid>

                    <Grid container spacing={2} columns={21}>

                        <Grid item md={2}>
                            <Typography>Fout Height</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                // label="max. speed"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.first || ""}
                                // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>


                        <Grid item md={2}>
                            <Typography>Stitch length</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                //label="Stitch length"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.second || ""}
                                onChange={(e) => handleLabelChange('secondLabel', e.target.value)}
                               InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                    </Grid>




                    {/* Inputs Area */}
                    <Grid container spacing={3} columns={21} style={{ marginTop: '20px' }}>

                        {/* <Grid item xs={3}>
                            <div className='bottom-box3'>
                                <div className='top-box-border'>
                                    <span>SAB</span>
                                </div>
                            </div>
                        </Grid> */}



                        <Grid item xs={30} >
                            <div className='title-custom'>
                                NO OF STITCHES
                            </div>
                        </Grid>





                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="min."
                                variant="outlined"
                                type='text'
                                //value={activeProgress.fifth || ""}
                                onChange={(e) => handleLabelChange('fifthLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="max."
                                variant="outlined"
                                type='text'
                                //value={activeProgress.sixith || ""}
                                onChange={(e) => handleLabelChange('sixthLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Stitches"
                                variant="outlined"
                                type='text'
                                //value={activeProgress.seventh || ""}
                                onChange={(e) => handleLabelChange('seventhLabel', e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isEditable ? (<>
                                                <IconButton onClick={handleCheckClick} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={handleEditClick} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !isEditable,
                                }}
                            />
                        </Grid>
                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                    </Grid>


                    {/* Buttons Areas  */}
                    <Grid container spacing={3} style={{ marginTop: '20px' }} justifyContent="flex-end">

                        {/* <Grid item xs={3}>
                            <Button
                                variant="outlined"
                                className='button-style'
                                startIcon={<SaveIcon />}
                                color="success"
                            >
                                Save
                            </Button>
                        </Grid>

                        <Grid item xs={3}>
                            <Button
                                variant="outlined"
                                className='button-style'
                                startIcon={<AddIcon />}
                            >
                                Insert
                            </Button>
                        </Grid> */}

                        {/* <Grid item >
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                color="secondary"
                            >
                                Delete
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                color="error"
                            >
                                Cancellation
                            </Button>
                        </Grid> */}

                        {/* Alert start here  */}
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            Here is a gentle confirmation that your action was successful.
                        </Alert>
                        {/* Alert end here s */}


                        {/* <Grid item >
                            <Button
                                component={RouterLink}
                                to='/register'
                                variant='contained'
                            >
                                Next
                            </Button>
                        </Grid> */}

                    </Grid>


                </CardContent >
            </Card >
        </div >
    );
}

export default Sweing;
