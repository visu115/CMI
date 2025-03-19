import {
  Button,
  Card,
  LinearProgress,
  CardContent,
  FormControl,
  Grid,
  Slider,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext,useRef } from 'react';
import { styled } from "@mui/material/styles";
import { commondata } from "../App";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Switch,{ switchClasses } from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Right from '../images/right_icon.jpeg';
import Wrong from '../images/wrong_icon.jpeg';
import server from '../server/server';
import { blue } from "@mui/material/colors";







const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


const GreenLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 100,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#4caf50",
  },
}));

const BlueLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 100,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#2196f3",
  },
}));

const RedLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 100,
  borderRadius: 5,
  backgroundColor: theme.palette.grey[300],
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#f44336",
  },
}));
const Barcode_scanner = () => {
  const { socket, setsocket, testingData, setTestingData,checkStatus,setCheckStatus } = useContext(commondata);


  //console.log(checkStatus['H65.0-Section']);
  //const section_1 = checkStatus['H65.0-Section'][0];

let sec,alram,theard;
   sec = checkStatus['H65.0-Section'];

   alram = checkStatus['H60.0'];

   theard = checkStatus['H20-thread'];


  

// Check if value exists and is an array
if (Array.isArray(sec,alram,theard)) {
    var section_1 = sec[0];
    var section_ng1 = alram[8];

    var section_2 = sec[1];
    var section_ng2 = alram[9];

    var section_3 = sec[2];
    var section_ng3 = alram[10];

 var thread_ok = theard[0];
 var sew_ok = theard[5];

} else {
    // Handle the case where 'H50.1' is not found or is not an array
    console.error('Value is not an array or key does not exist');
}
console.log("theard",thread_ok);
//console.log(section_ng);

  
 // const [checked, setChecked] = useState(false);
// Initial state for selected switches/buttons
// const [manualButtons, setManualButtons] = useState({
//   'H80.0': false,
//   // ... other buttons or switches
// });
const [manualButtons, setManualButtons] = useState(() => {
  const savedState = localStorage.getItem('selectedButtons');
  return savedState ? JSON.parse(savedState) : {
    'H80.0': false,
  };
});


 
const [selectedButtons, setSelectedButtons] = useState(() => {
  const savedState = localStorage.getItem('selectedButtons');
  return savedState ? JSON.parse(savedState) : {
    'H70.0': false,
    'H70.1': false,
    'H70.2': false,
    'H70.3': false,
    'H70.4': false,
    'H70.5': false,
    'H70.6': false,
    'H70.7': false,
  };
});

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedButtons', JSON.stringify(selectedButtons));
  }, [selectedButtons]);

//  const [selectedButtons, setSelectedButtons] = useState({
//   'H70.0': null,
//   'H70.1': null,
//   'H70.2': null,
//   'H70.3': null,
//   'H70.4': null,
//   'H70.5': null,
//   'H70.6': null,
//   'H70.7': null,
// });

// Labels for each button

let buttonLabels =[];
 buttonLabels = [
  'Aritcle Scan', 
  'Code Reader 1', 
  'Code Reader 2', 
  'Code Reader 3', 
  'Code Reader 4', 
  'Code Reader 5', 
  'Printer Label',
  'Number Stiches'
];

const handleToggle = async(buttonName,AddressValue) => {

  
console.log("Button Value",AddressValue);


  setSelectedButtons((prevState) => ({
    ...prevState,
    [buttonName]: !prevState[buttonName],
    
  }));

  setManualButtons((prevState) => ({
    ...prevState,
    [buttonName]: !prevState[buttonName],
  }));


  try {
    // Prepare the data to be sent to the backend
    //const dataToSend = testingData.D312;
    //event.preventDefault();
    const add = buttonName;
    const dataToSend = { value:AddressValue, address:add};
    // Make the API call to send data to the backend
    const response = await server.post('/swing', dataToSend);
    
    // Handle the response from the backend
    if (response.status === 200) {
        console.log('Data saved successfully');
       
        //setIsEditable(false); // Optionally, disable editing mode
    } else {
        console.error('Failed to save data');
    }
} catch (error) {
    console.error('Error while sending data:', error);
}


  console.log("Button toggled:", buttonName);
  //console.log("Button Test",selectedButtons[buttonName]);
   // console.log("Button toggled:", buttonName);
};

 // Access the array associated with the key 'H50.1'
 let value;
 value = checkStatus['H52.1'];

// Check if value exists and is an array
if (Array.isArray(value)) {
    var articl_scan = value[0];

    var cod1 = value[1];

    var cod2 = value[2];
    var cod3 = value[3];
    var cod4 = value[4];
    var cod5 = value[5];




} else {
    // Handle the case where 'H50.1' is not found or is not an array
    console.error('Value is not an array or key does not exist');
}


    //console.log(checkStatus['H52.1']);


  const data = [
    {
      name: "Start",
      uv: 100,
      Theard: 40,
      amt: 10,
    },
    {
      name: "Section 1",
      uv: 100,
      Theard: 40,
      amt: 10,
    },
    {
      name: "Section 2",
      uv: 100,
      Theard: 45,
      amt: 10,
    },
    {
      name: "Section 3",
      uv: 100,
      Theard: 35,
      amt: 10,
    },
  ];


  function valuetext(value) {
    return `${value}°C`;
  }

 // console.log(testingData["session 1"]);
//  ss.on('check_status', async (data) => {

//  });


const handleCylce =async (AddressValue, extraValue)=>{
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
                setTimeout(()=>{
const updatedValue = AddressValue === 'TRUE'?'FALSE':AddressValue;
handleCylce(updatedValue,extraValue)
                },2000);

            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error while sending data:', error);
        }
}

// Get data from session storage
  let userString,user,backgroundColor1,backgroundColor2;

   userString = sessionStorage.getItem("user");
  //setLoading(true);
   user = JSON.parse(userString);

   backgroundColor1 = thread_ok === true ? '#12b43c' : '#a19f9f';

   backgroundColor2 = sew_ok === true ? '#12b43c' : '#a19f9f';


  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Grid container>
                <Grid item xl={2} lg={2} xs={12}>
                  <Typography>Article Scan</Typography>
                </Grid>
                <Grid item xl={4} lg={4} xs={12}>
                  <FormControl fullWidth>
                  <TextField variant='outlined' value= {testingData['article_code']} readonly />
                  </FormControl>
                </Grid>
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




            </Grid>

            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>
                          Article scan
                        </Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        
                        <img
                          src={articl_scan === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>


                
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>Code Reader</Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        <img
                          src={cod1 === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>
                        Code Reader
                        </Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        <img
                          src={cod2 === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>Code Reader</Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        <img
                          src={cod3 === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>


                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          style={{ backgroundColor: "aliceblue" }}
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>Code Reader</Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        <img
                          src={cod4 === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                
               

                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Card
                    sx={{
                      padding: "3px",
                      maxWidth: { xl: 400, md: 400 },
                      width: "100%",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Grid item xl={4} lg={4} xs={12}>
                        <img
                          style={{ backgroundColor: "aliceblue" }}
                          src=""
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                      <Grid item xl={6} lg={6} xs={12}>
                        <Typography fontWeight={"bold"}>Code Reader</Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} xs={12}>
                        <img
                          src={cod5 === true?Right:Wrong}
                          alt="Tick img"
                          height={"40px"}
                          width={"40px"}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>


              </Grid>
            </Grid>
          </Grid>

        


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
            fontSize:28,
            //animation: thread_ok === '1' ? `${blinkAnimation} 1s infinite` : 'none',
            color: '#ffffff',  // Optional: to make sure the text is visible
          }}
        >
          {thread_ok === true ? `THREAD STATUS OK ` : ''}
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
            fontSize:28,
            //animation: get_session_user.seam_name === '2' ? `${blinkAnimation} 1s infinite` : 'none',
            color: '#ffffff',  // Optional: to make sure the text is visible
          }}
        >
          {sew_ok === true ? `SEW STATUS OK  ` : ''}
        </Typography>
      </Box>
</Grid>
</Grid>




    <Grid container spacing={2} style={{ marginTop: '20px' }}>
      <Grid item xs={12} style={{ position: 'relative' }}>
      <Card sx={{ minWidth: 275 }}>
        <FormControl
          orientation="horizontal"
          sx={{ width: 300, justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Auto</Typography>
            <AntSwitch defaultChecked  
                   checked={manualButtons['H80.0']}
                 // onChange={() => handleToggle('H80.0', isSelected ? 'False' : 'True')}
                  onChange={() => handleToggle('H80.0', manualButtons['H80.0'] ? 'False' : 'True')}
                  inputProps={{ 'aria-label': 'ant design' }} />
            <Typography>Manual</Typography>

            <Grid style={{ marginTop: '20px', marginLeft: '20px'}}>
          
          <Typography>{''}</Typography> {/* Unique label */}
             <Button variant='contained' type='submit' color="success"  onClick={() => handleCylce('TRUE', 'H20.6')}
             >Cycle Reset</Button>
         
     </Grid>
          </Stack>
          
        </FormControl>


        

        <Grid container spacing={1} style={{ marginTop: '20px' }}>
          {buttonLabels.map((label, index) => {
            //const buttonName = `button${index + 1}`; // Unique button names (button1, button2, ...)
            const buttonName = `H70.${index}`;
            const isSelected = selectedButtons[buttonName]; // Determine if the button is selected

            return (
              <div key={buttonName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
                <Typography>{label}</Typography> {/* Unique label */}
                <ToggleButton
                  //value={buttonName}
                  //name={selectedButtons[buttonName]}
                  value={selectedButtons[buttonName] ? 'True' : 'False'}
                  //value={buttonName}
                  selected={selectedButtons[buttonName]}
                  onChange={() => handleToggle(buttonName, isSelected ? 'False' : 'True')}
                  //onChange={(e) => handleSubmitClick(e.target.value, 'D406')}
                  style={{
                    backgroundColor: selectedButtons[buttonName] ? 'green' : 'white', // Set color based on selection
                    color: 'white',
                  }}
                >
                  <CheckIcon />
                </ToggleButton>
              </div>
            );
          })}
        </Grid>

        </Card>
      </Grid>
    </Grid>


   




          {/* Progress Area */}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={4} style={{ position: `relative` }}>
              <GreenLinearProgress
                variant="determinate"
                // value={
                //   testingData["session 1"]
                //     ? (testingData["session 1"]/0 ) * testingData["session 1"]
                //     : 0
                // }
                value={
                  testingData["session 1"] && testingData["session 1"] > 0
                    ? (testingData["session 1"] / testingData["session 1"]) * 100 // Assuming you have a max value for the progress
                    : 0
                }
              />
              <Box sx={{ minWidth: 35 }} className="progross-center-text">
              <div key='Button' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-13px 0px 0px 50px' }}>
                
                SECTION 1 -{testingData["session 1"]}
               {/* <Typography></Typography> Unique label */}
                <Button
                  style={{
                    backgroundColor: section_1== true?'#006400':section_ng1 == true?'#8B0000':'white', // Set color based on selection
                    color: 'White',
                    margin: '0px 0px 0px 130px'
                  }}
                >{section_1== true?'OK':section_ng1== true?'NG':'---'}
                  
                </Button>
              </div>
              </Box>
            </Grid>
            <Grid item xs={4} style={{ position: `relative` }}>
              <BlueLinearProgress
                variant="determinate"
                // value={
                //   testingData["session 2"]
                //     ? (Number(testingData["session 2"]) / 300) * 100
                //     : 0
                // }
                value={
                  testingData["session 2"] && testingData["session 2"] > 0
                    ? (testingData["session 2"] / testingData["session 2"]) * 100 // Assuming you have a max value for the progress
                    : 0
                }
              />
              <Box sx={{ minWidth: 35 }} className="progross-center-text">
                
                <div key='Button' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-13px 0px 0px 50px' }}>
                
                 SECTION 2 -{testingData["session 2"]}
               {/* <Typography></Typography> Unique label */}
                <Button
                style={{
                  backgroundColor: section_2== true?'#006400':section_ng2 == true?'#8B0000':'white', // Set color based on selection
                  color: 'White',
                  margin: '0px 0px 0px 30px'
                }}
              >{section_2== true?'OK':section_ng2 == true?'NG':'---'}
                
                </Button>
              </div>
              </Box>
            </Grid>
            <Grid item xs={4} style={{ position: `relative` }}>
              <RedLinearProgress
                variant="determinate"
                // value={
                //   testingData["session 3"]
                //     ? (Number(testingData["session 3"]) / 300) * 100
                //     : 0
                // }
                value={
                  testingData["session 3"] && testingData["session 3"] > 0
                    ? (testingData["session 3"] / testingData["session 3"]) * 100 // Assuming you have a max value for the progress
                    : 0
                }
              />
              <Box sx={{ minWidth: 35 }} className="progross-center-text">
                
                <div key='Button' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '-13px 0px 0px 50px' }}>
                
                 SECTION 3- {testingData["session 3"]}
               {/* <Typography></Typography> Unique label */}
                <Button
                  style={{
                    backgroundColor: section_3== true?'#006400':section_ng3 == true?'#8B0000':'white', // Set color based on selection
                    color: 'White',
                    margin: '0px 0px 0px 30px'
                  }}
                >{section_3== true?'OK':section_ng3 == true?'NG':'---'}
                  
                </Button>
              </div>
              </Box>
            </Grid>
          </Grid>

          {/* <Card sx={{ backgroundColor: '#E5E4E2', marginTop: '1%' }} >
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
                    </Card> */}

          <Grid container spacing={2} marginTop={"0.2%"} alignItems={"center"}>
            <Grid item xl={7} lg={7} xs={12}>
              <Card sx={{ backgroundColor: "#E5E4E2" }}>
                <LineChart
                  width={600}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Theard"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </Card>
            </Grid>

            <Grid item xl={5} lg={5} xs={12}>
              <Card
                sx={{
                  backgroundColor: "#E5E4E2",
                  display: "flex",
                  justifyContent: "center",
                  height: 200,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid item xl={7} lg={7} xs={12}>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xl={5}
                        lg={5}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography fontWeight={600}>Name :</Typography>
                      </Grid>
                      <Grid
                        item
                        xl={7}
                        lg={7}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography>{user.user_name}</Typography>
                      </Grid>
                      <Grid
                        item
                        xl={5}
                        lg={5}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography fontWeight={600}>
                          Security Level :
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xl={7}
                        lg={7}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography>{user.rights}</Typography>
                      </Grid>
                      <Grid
                        item
                        xl={5}
                        lg={5}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography fontWeight={600}>Personnel ID :</Typography>
                      </Grid>
                      <Grid
                        item
                        xl={7}
                        lg={7}
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <Typography>{user.personal_id}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Grid container marginTop={"1%"}>
            <Grid
              item
              xl={12}
              gap={2}
              lg={12}
              xs={12}
              display={"flex"}
              justifyContent={"end"}
            >
       
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Barcode_scanner;
