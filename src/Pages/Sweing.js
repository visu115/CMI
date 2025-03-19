import React, { useState, useEffect, useContext,useRef, useCallback } from 'react';
import { Card, CardContent, Grid, LinearProgress, TextField, InputAdornment, IconButton, Button, Box, Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link as RouterLink } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { keyframes } from '@mui/system';  // <-- Make sure to import thi
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


const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
  

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






function Sweing() {
    const { socket, setsocket, testingData, setTestingData  } = useContext(commondata)
    // State for the values of labels

    let get_session = sessionStorage.getItem("user"); // or sessionStorage

    if (get_session) {
        get_session = JSON.parse(get_session); // Convert JSON string to object
    }

    const [get_session_user, setGet_session_user] = useState(get_session??{});


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




    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState('');
    const [textValue1, setTextValue1] = useState();
    const [textValue2, setTextValue2] = useState();
    const [textValue3, setTextValue3] = useState();
    const [textValue4, setTextValue4] = useState();
    const [editState, setEditState] = useState({}); 



    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    // const handleEditClick = () => {
    //     setIsEditable(true);
    // };
    
    const handleEditClick = async (AddressValue, extraValue) => {

        const dataToSend = AddressValue;
        console.log(dataToSend+"__"+extraValue);
        
        setEditState((prevState) => ({
            ...prevState,
            [extraValue]: true
        }));
        try {
            // Prepare the data to be sent to the backend
            //const dataToSend = testingData.D312;
            //event.preventDefault();
            const add = extraValue;
            const dataToSend = { value:AddressValue, address:add};
            // Make the API call to send data to the backend
            const response = await server.post('/swing', dataToSend);
            
            // Handle the response from the backend
            if (response.status === 200) {
                console.log('Data saved successfully');
                // setIsEditable(true); // Optionally, disable editing mode
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    };


    const handleCheckClick = async (AddressValue, extraValue) => {

        const dataToSend = AddressValue;
        console.log(dataToSend);
        setEditState((prevState) => ({
            ...prevState,
            [extraValue]: false
        }));
        
        try {
            // Prepare the data to be sent to the backend
            //const dataToSend = testingData.D312;
            //event.preventDefault();
            const add = extraValue;
            const dataToSend = { value:AddressValue, address:add};
            // Make the API call to send data to the backend
            const response = await server.post('/swing', dataToSend);
            
            // Handle the response from the backend
            if (response.status === 200) {
                console.log('Data saved successfully');
                // setIsEditable(false); // Optionally, disable editing mode
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    };



    // Handle input change & update session storage
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update state
        setGet_session_user((prev) => {
            const updatedUser = { ...prev, [name]: value };

            // Update sessionStorage
            sessionStorage.setItem("user", JSON.stringify(updatedUser));

            return updatedUser;
        });
    };
    const Debounce = useCallback((func = () => { }, delay = 1000) => {
        let timer;
        return function (...args) {
    
    // console.log("here",args);
    
          if (timer) { clearTimeout(timer) }
    
          timer = setTimeout(() => {
    
    
            func(...args)
          }, delay);
        }
      }, [])

    const handleSubmitClick =useCallback(Debounce(async (AddressValue, extraValue) => {        
        try {
            const add = extraValue;
            const dataToSend = { value:AddressValue, address:add};
            const response = await server.post('/swing', dataToSend);
            
            // Handle the response from the backend
            if (response.status === 200) {
                console.log('Recipe successfully',response.message);
               
                //setIsEditable(false); // Optionally, disable editing mode
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
    }),[]) 

    const bgColor = get_session_user.seam_name;

    const backgroundColor1 = get_session_user.seam_name === '1' ? '#12b43c' : '#a19f9f';

    const backgroundColor2 = get_session_user.seam_name === '2' ? '#12b43c' : '#a19f9f';

    const backgroundColor3 = get_session_user.seam_name === '3' ? '#12b43c' : '#a19f9f';

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


                    <Grid item md={2}>

<Typography>Program No</Typography>
{/* <span>{testingData && JSON.stringify(testingData.D104, null, 2)}</span> */}
</Grid>
<Grid item md={3}>
<TextField variant='outlined'
    //value={textValue3}
    value={get_session_user.program_no}
    name='program_no'
    // onChange={handleInputChange}
    // onBlur={(e) => handleSubmitClick(e.target.value, "D312")}
    onBlur={() => handleCheckClick('FALSE', 'H40.3')}
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D312')}}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H40.3'] ? (<>
                    <IconButton onClick={() => handleCheckClick('FALSE', 'H40.3')} color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton onClick={() => handleEditClick('TRUE', 'H40.3')} color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: editState['H40.3'],
    }}
   
   // autoFocus
/>
</Grid>
<Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>

</Grid>


<Grid item md={2}>

<Typography>Seam program</Typography>
{/* <span>{testingData && JSON.stringify(testingData.D104, null, 2)}</span> */}
</Grid>


<Grid item md={3}>
<TextField variant='outlined'
   name="seam_name"
    onChange={handleInputChange}
    onBlur={(e) => handleSubmitClick(e.target.value, 'D300')}
    value={get_session_user.seam_name}
    //onChange={(e) => setTextValue1(e.target.value)}
 
/>
</Grid>



<Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>

</Grid>

</Grid>


{/* <FormControlLabel control={<Switch defaultChecked />} label="Manual" /> */}


{/* Progress Area */}
<Grid container spacing={2} style={{ marginTop: '20px' }}>

<Grid item xs={4} style={{ position: 'relative' }}>
      <Box
        sx={{
          minWidth: 35,
          backgroundColor: backgroundColor1,
          height: 80, // Increased height here (adjust as needed)
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center', // Vertically center the text
          justifyContent: 'center', // Horizontally center the text
        }}
      >
        <Typography
          sx={{
            fontFamily:"sans-serif",
            animation: get_session_user.seam_name === '1' ? `${blinkAnimation} 1s infinite` : 'none',
            color: '#000000',  // Optional: to make sure the text is visible
          }}
        >
          {get_session_user.seam_name === '1' ? `Please Fill Section ${get_session_user.seam_name} Values` : ''}
        </Typography>
      </Box>
    </Grid>



<Grid item xs={4} style={{ position: `relative` }}>
<Box
        sx={{
          minWidth: 35,
          backgroundColor: backgroundColor2,
          height: 80, // Increased height here (adjust as needed)
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center', // Vertically center the text
          justifyContent: 'center', // Horizontally center the text
        }}
      >
        <Typography
          sx={{
            fontFamily:"sans-serif",
            animation: get_session_user.seam_name === '2' ? `${blinkAnimation} 1s infinite` : 'none',
            color: '#000000',  // Optional: to make sure the text is visible
          }}
        >
          {get_session_user.seam_name === '2' ? `Please Fill Section ${get_session_user.seam_name} Values` : ''}
        </Typography>
      </Box>
</Grid>
<Grid item xs={4} style={{ position: `relative` }}>
<Box
        sx={{
          minWidth: 35,
          backgroundColor: backgroundColor3,
          height: 80, // Increased height here (adjust as needed)
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center', // Vertically center the text
          justifyContent: 'center', // Horizontally center the text
        }}
      >
        <Typography
          sx={{
            fontFamily:"sans-serif",
            animation: get_session_user.seam_name === '3' ? `${blinkAnimation} 1s infinite` : 'none',
            color: '#000000',  // Optional: to make sure the text is visible
          }}
        >
          {get_session_user.seam_name === '3' ? `Please Fill Section ${get_session_user.seam_name} Values` : ''}
        </Typography>
      </Box>
</Grid>
</Grid>




<Grid container spacing={3} style={{ marginTop: '20px' }}></Grid>

<Grid container spacing={2} columns={21}>
<Grid item md={2}>
<Typography>Seam Name</Typography>
</Grid>
<Grid item xs={3}>
<TextField
    fullWidth
    //label="Stitching Types"
    variant="outlined"
    type='text'
    value={get_session_user.seam_name == 1?get_session_user.section_seam_1:get_session_user.seam_name == 2?get_session_user.section_seam_2:get_session_user.seam_name == 3?get_session_user.section_seam_3:''}
    name={get_session_user.seam_name == 1?'section_seam_1':get_session_user.seam_name == 2?'section_seam_2':get_session_user.seam_name == 3?'section_seam_3':''}
    // onChange={(e) => handleLabelChange('firstLabel', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {isEditable ? (<>
                    <IconButton onClick={handleCheckClick} color="success">
                        {/* <CheckCircleIcon /> */}
                    </IconButton>
                </>) : (<>
                   
                    <IconButton onClick={handleEditClick} color="primary">
                        {/* <EditIcon /> */}
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
    name={get_session_user.seam_name == '1'?'thread_tension':get_session_user.seam_name == '2'?'thread_tension_2':get_session_user.seam_name == '3'?'thread_tension_3':''}
    variant="outlined"
    type="number"
    // onChange={handleInputChange}
    onChange={(e) => {handleInputChange(e);handleSubmitClick(e.target.value, 'D324')}}
    onBlur={() => handleCheckClick('FALSE', 'H40.7')}
    //value={get_session_user.thread_tension}
    value={get_session_user.seam_name == '1'?get_session_user.thread_tension:get_session_user.seam_name == '2'?get_session_user.thread_tension_2:get_session_user.seam_name == '3'?get_session_user.thread_tension_3:''}
    // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H40.7'] ? (<>
                    <IconButton 
                        //onClick={handleCheckClick} 
                        onClick={() => handleCheckClick('FALSE', 'H40.7')}
                        color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton 
                        onClick={() => handleEditClick('TRUE', 'H40.7')}
                        color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H40.7'],
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
    //name='stiches_length'
    name={get_session_user.seam_name === '1'?'stiches_length':get_session_user.seam_name === '2'?'stiches_length_2':get_session_user.seam_name === '3'?'stiches_length_3':''}

    variant="outlined"
    type='text'
    //value={get_session_user.stiches_length}
     value={get_session_user.seam_name === '1'?get_session_user.stiches_length:get_session_user.seam_name === '2'?get_session_user.stiches_length_2:get_session_user.seam_name === '3'?get_session_user.stiches_length_3:''}
    //onChange={(e) => handleLabelChange('secondLabel', e.target.value)}
    onBlur={(e) => handleCheckClick('FALSE', 'H40.9')}
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D330')}}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H40.9'] ? (<>
                    <IconButton 
                        onClick={() => handleCheckClick('FALSE', 'H40.9')}
                        color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton 
                         onClick={() => handleEditClick('TRUE', 'H40.9')}
                        color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H40.9'],
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
    //name='foot_pressure'
    name={get_session_user.seam_name === '1'?'foot_pressure':get_session_user.seam_name === '2'?'foot_pressure_2':get_session_user.seam_name === '3'?'foot_pressure_3':''}

    variant="outlined"
    type='text'
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D336')}}
    onBlur={(e) => handleCheckClick('FALSE', 'H41.2')}
    //value={get_session_user.foot_pressure}
     value={get_session_user.seam_name === '1'?get_session_user.foot_pressure:get_session_user.seam_name === '2'?get_session_user.foot_pressure_2:get_session_user.seam_name === '3'?get_session_user.foot_pressure_3:''}
    // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H41.2'] ? (<>
                    <IconButton 
                    onClick={() => handleCheckClick('FALSE', 'H41.2')}
                    //onClick={()=>handleCheckClick()} 
                    color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton onClick={()=>handleEditClick('TRUE','H41.2')} color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H41.2'],
    }}
/>
</Grid>
<Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>

</Grid>

<Grid item md={2}>
<Typography>Foot Height</Typography>
</Grid>
<Grid item xs={3}>
<TextField
    fullWidth
    // label="max. speed"
    //name='foot_height'
    name={get_session_user.seam_name === '1'?'foot_height':get_session_user.seam_name === '2'?'foot_height_2':get_session_user.seam_name === '3'?'foot_height_3':''}

    variant="outlined"
    type='text'
    // onChange={handleInputChange}
    // onBlur={(e) => handleSubmitClick(e.target.value, 'D342')}
    onBlur={() => handleCheckClick('FALSE', 'H41.4')}
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D342')}}
    //value={get_session_user.foot_height}
     value={get_session_user.seam_name === '1'?get_session_user.foot_height:get_session_user.seam_name === '2'?get_session_user.foot_height_2:get_session_user.seam_name === '3'?get_session_user.foot_height_3:''}
    // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H41.4'] ? (<>
                    <IconButton 
                        onClick={() => handleCheckClick('FALSE', 'H41.4')}
                        color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton 
                         onClick={() => handleEditClick('TRUE', 'H41.4')}
                        color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H41.4'],
    }}
/>
</Grid>
<Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>

</Grid>


<Grid item md={2}>
<Typography>Sewing Speed</Typography>
</Grid>
<Grid item xs={3}>
<TextField
    fullWidth
    //label="Stitch length"
    variant="outlined"
    //name='sewing_speed'
    name={get_session_user.seam_name === '1'?'sewing_speed':get_session_user.seam_name === '2'?'sewing_speed_2':get_session_user.seam_name === '3'?'sewing_speed_3':''}

    type='text'
   // value={get_session_user.sewing_speed}
    value={get_session_user.seam_name === '1'?get_session_user.sewing_speed:get_session_user.seam_name === '2'?get_session_user.sewing_speed_2:get_session_user.seam_name === '3'?get_session_user.sewing_speed_3:''}
    // onChange={handleInputChange}
    // onBlur={(e) => handleSubmitClick(e.target.value, 'D348')}
    onBlur={() => handleCheckClick('FALSE', 'H41.6')}
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D348')}}
    //onChange={(e) => handleLabelChange('secondLabel', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H41.6'] ? (<>
                    <IconButton 
                        onClick={() => handleCheckClick('FALSE', 'H41.6')}
                        color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton 
                         onClick={() => handleEditClick('TRUE', 'H41.6')}
                         color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H41.6'],
    }}
/>
</Grid>
<Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>

</Grid>

</Grid>

<Grid container spacing={3} style={{ marginTop: '20px' }}></Grid>

<Grid container spacing={2} columns={21}>

<Grid item md={2}>
<Typography>Walking Foot Stoke</Typography>
</Grid>
<Grid item xs={3}>
<TextField
    fullWidth
    // label="max. speed"
    variant="outlined"
    //name='walkimg_fot_stoke'
    name={get_session_user.seam_name === '1'?'walkimg_fot_stoke':get_session_user.seam_name === '2'?'walking_fot_stoke2':get_session_user.seam_name === '3'?'walkimg_fot_stoke3':''}

    type='text'
    // onChange={handleInputChange}
    // onBlur={(e) => handleSubmitClick(e.target.value, 'D352')}
    onBlur={() => handleCheckClick('FALSE', 'H42.1')}
    onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D352')}}
    //value={get_session_user.walkimg_fot_stoke}
     value={get_session_user.seam_name === '1'?get_session_user.walkimg_fot_stoke:get_session_user.seam_name === '2'?get_session_user.walking_fot_stoke2:get_session_user.seam_name === '3'?get_session_user.walkimg_fot_stoke3:''}
    // onChange={(e) => handleProgressChange('firstProgress', e.target.value)}
    InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                {editState['H42.1'] ? (<>
                    <IconButton 
                        onClick={() => handleCheckClick('FALSE', 'H42.1')}
                        color="success">
                        <CheckCircleIcon />
                    </IconButton>
                </>) : (<>
                   
                    <IconButton 
                        onClick={()=>handleEditClick('TRUE','H42.1')} 
                        color="primary">
                        <EditIcon />
                    </IconButton>
                </>)}

            </InputAdornment>
        ),
        readOnly: !editState['H42.1'],
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
                                label="Section 1-min."
                                variant="outlined"
                                type='text'
                                name='no_stitches_min1'
                                value={get_session_user.no_stitches_min1}
                                //onChange={handleInputChange}
                                onChange={(e)=>{handleInputChange(e); handleSubmitClick(e.target.value, 'D404')}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                  onClick={() => handleCheckClick()} 
                                                   color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                   onClick={() => handleEditClick()} 
                                                   color="primary">
                                                    {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    //readOnly: !isEditable,
                                }}
                            />
                        </Grid>


                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 1-max."
                                variant="outlined"
                                name='no_stitches_max1'
                                type='text'
                                value={get_session_user.no_stitches_max1}
                                onChange={(e)=>{handleInputChange(e); handleSubmitClick(e.target.value, 'D402')}}
                                //onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                    onClick={() => handleCheckClick()}  color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                    onClick={() => handleEditClick()} color="primary">
                                                    {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                   // readOnly: !isEditable,
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 1-Stitches"
                                variant="outlined"
                                name='no_stitches1'
                                type='text'
                                value={get_session_user.no_stitches1}
                                // onChange={handleInputChange}
                                // onBlur={(e) => handleSubmitClick(e.target.value, 'D406')}
                                onBlur={() => handleCheckClick('FALSE', 'H41.8')}
                                onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D406')}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState['H41.8'] ? (<>
                                                <IconButton onClick={() => handleCheckClick('FALSE', 'H41.8')} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={() => handleEditClick('TRUE', 'H41.8')} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !editState['H41.8'],
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                    </Grid>


                    {/* Buttons Areas  */}
                    <Grid container spacing={3} columns={21} style={{ marginTop: '20px' }}>
                    





                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="Section 2-min."
                                variant="outlined"
                                type='text'
                                name='no_stitches_min2'
                                value={get_session_user.no_stitches_min2}
                                //onChange={handleInputChange}
                                onChange={(e)=>{handleInputChange(e); handleSubmitClick(e.target.value, 'D416')}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                  onClick={() => handleCheckClick()} 
                                                   color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                   onClick={() => handleEditClick()} 
                                                   color="primary">
                                                     {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    // readOnly: !isEditable,
                                }}
                            />
                        </Grid>


                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 2-max."
                                variant="outlined"
                                type='text'
                                name='no_stitches_max2'
                                value={get_session_user.no_stitches_max2}
                                onChange={handleInputChange}
                                onBlur={(e) => handleSubmitClick(e.target.value, 'D412')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                    onClick={() => handleCheckClick()}  color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                    onClick={() => handleEditClick()} color="primary">
                                                     {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    // readOnly: !isEditable,
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 2-Stitches"
                                variant="outlined"
                                name='no_stitches2'
                                type='text'
                                value={get_session_user.no_stitches2}
                                // onChange={handleInputChange}
                                // onBlur={(e) => handleSubmitClick(e.target.value, 'D408')}
                                onBlur={() => handleCheckClick('FALSE', 'H41.9')}
                                onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D408')}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState['H41.9'] ? (<>
                                                <IconButton onClick={() => handleCheckClick('FALSE', 'H41.9')} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={() => handleEditClick('TRUE', 'H41.9')} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !editState['H41.9'],
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                    </Grid>

                    <Grid container spacing={3} columns={21} style={{ marginTop: '20px' }}>
                    
                        <Grid item md={4}>
                            <TextField
                                fullWidth
                                label="Section 3-min."
                                variant="outlined"
                                type='text'
                                name='no_stitches_min3'
                                value={get_session_user.no_stitches_min3}
                                onChange={handleInputChange}
                                onBlur={(e) => handleSubmitClick(e.target.value, 'D418')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                  onClick={() => handleCheckClick()} 
                                                   color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                   onClick={() => handleEditClick()} 
                                                   color="primary">
                                                    {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    // readOnly: !isEditable,
                                }}
                            />
                        </Grid>


                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 3-max."
                                variant="outlined"
                                type='text'
                                name='no_stitches_max3'
                                value={get_session_user.no_stitches_max3}
                                onChange={handleInputChange}
                                onBlur={(e) => handleSubmitClick(e.target.value, 'D414')}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState[''] ? (<>
                                                <IconButton 
                                                    onClick={() => handleCheckClick()}  color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton 
                                                    onClick={() => handleEditClick()} color="primary">
                                                    {/* <EditIcon /> */}
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    // readOnly: !isEditable,
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                            
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Section 3-Stitches"
                                variant="outlined"
                                type='text'
                                name='no_stitches3'
                                value={get_session_user.no_stitches3}
                                // onChange={handleInputChange}
                                // onBlur={(e) => handleSubmitClick(e.target.value, 'D410')}
                                onBlur={() => handleCheckClick('FALSE', 'H41.10')}
                                onChange={(e)=>{handleInputChange(e);handleSubmitClick(e.target.value, 'D410')}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {editState['H41.10'] ? (<>
                                                <IconButton onClick={() => handleCheckClick('FALSE', 'H41.10')} color="success">
                                                    <CheckCircleIcon />
                                                </IconButton>
                                            </>) : (<>
                                               
                                                <IconButton onClick={() => handleEditClick('TRUE', 'H41.10')} color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </>)}

                                        </InputAdornment>
                                    ),
                                    readOnly: !editState['H41.10'],
                                }}
                            />
                        </Grid>

                        <Grid item md={2} style={{ display: 'flex', alignItems: 'center' }}>
                           
                        </Grid>

                    </Grid>


                </CardContent >
            </Card >
        </div >
    );
}

export default Sweing;
