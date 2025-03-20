import './App.css';
import './Pages/Pages.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Nav from './Layout/Layout';
import User_dashboard from './Pages/User_dashboard';
import Sweing from './Pages/Sweing';
import UserRegistration from './Pages/UserRegistration';
import LoginForm from './Pages/LoginForm';
import UserRegistrationTable from './Pages/UserRegistrationTable';
import CheckScanner from './Pages/CheckScanner';
import Thread_Database from './Pages/Thread_Database';
import View_Coil_Database from './Pages/View_Coil_Database';
import Alram_Database from './Pages/alram_table';
import Seam_Pattern from './Pages/Seam_Pattern';
import Barcode_scanner from './Pages/Barcode_scanner';
import TT_Graphic from './Pages/TT_Graphic';
import io from 'socket.io-client';
import { useState, useEffect, createContext, useCallback } from 'react';
import { Alert, Dialog, DialogTitle, DialogContent, DialogContentText, Grid, Box, IconButton, Typography, Button, } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { styled } from '@mui/material/styles';
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import server from './server/server.js';

export const commondata = createContext()
function App() {
  const [socket, setsocket] = useState(null);
  const [alt, setalt] = useState({ open: false, data: "" });
  const [user, setUser] = useState({});
  const [login, setlogin] = useState(sessionStorage.getItem("user") || sessionStorage.getItem("admin") ? true : false)
  const [testingData, setTestingData] = useState({ ...(sessionStorage.getItem("cmi_data") ? JSON.parse(sessionStorage.getItem("cmi_data")) : "{}") })
  const [checkStatus, setCheckStatus] = useState({});
  const [messages, setMessages] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(() => () => { });
  //const [alram_add, setAlram_add] = useState([]);

  // alert messsage dialog box functionality
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogTitle-root': {
      backgroundColor: 'white',
      color: 'red',
      display: 'flex',
      padding: '3px',
      justifyContent: 'end'
    },
    '& .MuiDialog-paper ': {
      width: 700
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  const [open, setOpen] = useState(false);
  const descriptionElementRef = useRef(null);




  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus(); // Focus on the dialog when it opens
      }
    }
  }, [open]);


  const handleClear = useCallback(() => {
    setCurrentMessageIndex((p) => {
      // console.log(p);

      if (typeof p === "function") {
        p()
      }
      return p
    });
    setOpen(false);

  }, [])


  const handleClose = useCallback(() => {
    setCurrentMessageIndex((p) => {
      // console.log(p);

      if (typeof p === "function") {
        p()
      }
      return p
    });


    setOpen(false);
  }, []);
  //// end of alert message functionality

  // console.log(testingData);
  useEffect(() => {
    if (login ) {


      const ss = io('http://localhost:5001')
      //console.log("Entered");
      setsocket(ss)
      // Listen for live data
      ss.on('FromAPI', data => {
        // setLiveData(data);
      });
      //   socket.emit("FromAPI","hiii")
      // Listen for testing data

      ss.on('testingData', data => {
        //  console.log(data);
        setTestingData((p) => ({ ...p, ...data }));
        sessionStorage.setItem("cmi_data", JSON.stringify({ ...(sessionStorage.getItem("cmi_data") ? JSON.parse(sessionStorage.getItem("cmi_data")) : "{}"), ...data }));
      });
      let newMessages = [];
      const maintain_alarm = {}
      ss.on('check_status', async (data) => {
        // console.log("Check Status Data:-",data['H60.0']);




        setCheckStatus(prevState => ({ ...prevState, ...data }));

        const check_section = data['H65.0-Section'];
        let section1, section2, section3;
        if (Array.isArray(check_section)) {
          section1 = check_section[0];
          section2 = check_section[1];
          section3 = check_section[2];
        }


        const modelsection = data['H90-section'];
        let modelsection0, modelsection1, modelsection2, modelsection3;
        if (Array.isArray(modelsection)) {
          modelsection0 = modelsection[0];
          modelsection1 = modelsection[1];
          modelsection2 = modelsection[3];
          modelsection3 = modelsection[5];
        }

        // console.log("check_section",modelsection0);
        if (modelsection0 == true) {
          setalt({ open: true, pass: "Ready", data: modelsection0 == true ? "Section Ready To Start" : '' })

        } else if (modelsection1 == true) {
          setalt({ open: true, pass: "Section1", data: modelsection1 == true ? "Section 1 Running" : '' })

        } else if (modelsection2 == true) {
          setalt({ open: true, pass: "Section2", data: modelsection2 == true ? "Section 2 Running" : '' })

        } else if (modelsection3 == true) {
          setalt({ open: true, pass: "Section3", data: modelsection3 == true ? "Section 3 Running" : '' })

        }

        const check_object_data = {}
        const CheckData = data['H60.0'];


        //console.log("CheckData_61",CheckData);

        // Check if value exists and is an array
        if (Array.isArray(CheckData)) {
          // Log the first value of the array
          // console.log("Test",CheckData); // Output: true (assuming the first element is true)

          check_object_data.ArticalCheck = CheckData[0];
          check_object_data.Label1 = CheckData[1];
          check_object_data.CodeRead2 = CheckData[2];
          check_object_data.CodeRead3 = CheckData[3];
          check_object_data.CodeRead4 = CheckData[4];
          check_object_data.CodeRead5 = CheckData[5];
          check_object_data.UserNotLog = CheckData[6];
          check_object_data.Label2 = CheckData[7];
          //  check_object_data.Sec1 = CheckData[8];
          //  check_object_data.Sec2 = CheckData[9];
          //  check_object_data.Sec3 = CheckData[10];

          check_object_data.HandScanComTri = CheckData[11];
          check_object_data.LabelScan = CheckData[12];
          check_object_data.CodeReadTri2 = CheckData[13];
          check_object_data.CodeReadTri3 = CheckData[14];
          check_object_data.CodeReadTri4 = CheckData[15];

        } else {
          // Handle the case where 'H60.0' is not found or is not an array
          // console.error('Value is not an array or key does not exist');
        }
        const CheckData_61 = data['H61.0'];
        //checkStatus


        if (Array.isArray(CheckData_61)) {
          // Log the first value of the array
          // console.log("Test",CheckData); // Output: true (assuming the first element is true)

          check_object_data.LabelScanRead = CheckData_61[0];
          check_object_data.CodeRead2Error = CheckData_61[1];
          check_object_data.CodeRead3Error = CheckData_61[2];
          check_object_data.CodeRead4Error = CheckData_61[3];
          check_object_data.CodeRead5Error = CheckData_61[4];
          check_object_data.SewMach1 = CheckData_61[5];
          check_object_data.SewMach2 = CheckData_61[6];
          check_object_data.SewMachWriteSend = CheckData_61[7];
          check_object_data.SewMachRes = CheckData_61[8];
          check_object_data.PrintDisContect1 = CheckData_61[9];
          check_object_data.PrintDisContect2 = CheckData_61[10];
          check_object_data.CodeReadTrig = CheckData_61[11];

        } else {
          // Handle the case where 'H60.0' is not found or is not an array
          // console.error('Value is not an array or key does not exist');
        }

        const CheckData_62 = data['H62.0'];

        if (Array.isArray(CheckData_62)) {
          // Log the first value of the array
          // console.log("Test",CheckData); // Output: true (assuming the first element is true)

          check_object_data.SewMachReadErr = CheckData_62[0];
          check_object_data.SewMachWriteErr = CheckData_62[1];
          //var CodeRead4Error = CheckData_62[2];
          check_object_data.SewComReadErr = CheckData_62[3];
          check_object_data.SewComWriteErr = CheckData_62[4];
          //var MachEnableDisable = CheckData_62[5];
          check_object_data.PLCComErr1 = CheckData_62[6];
          check_object_data.PLCComErr2 = CheckData_62[7];


        } else {
          // Handle the case where 'H60.0' is not found or is not an array
          // console.error('Value is not an array or key does not exist');
        }


        // useEffect(() => {
        //   setOpen(true); // Automatically open the dialog when the component mounts
        // }, []);
        var userString = sessionStorage.getItem('user');
        var user = JSON.parse(userString);

        // console.log(check_object_data);


        if (check_object_data.ArticalCheck || check_object_data.Label1 || check_object_data.CodeRead2 || check_object_data.CodeRead3 || check_object_data.CodeRead4 || check_object_data.CodeRead5 || check_object_data.Label2 || check_object_data.UserNotLog || check_object_data.HandScanComTri || check_object_data.LabelScan || check_object_data.CodeReadTri2 || check_object_data.CodeReadTri3 || check_object_data.CodeReadTri4 || check_object_data.LabelScanRead || check_object_data.CodeRead2Error || check_object_data.CodeRead3Error || check_object_data.CodeRead4Error || check_object_data.CodeRead5Error || check_object_data.SewMach1 || check_object_data.SewMach2 || check_object_data.SewMachWriteSend || check_object_data.SewMachRes || check_object_data.PrintDisContect1 || check_object_data.PrintDisContect2 || check_object_data.CodeReadTrig || check_object_data.SewMachReadErr || check_object_data.SewMachWriteErr || check_object_data.SewComReadErr || check_object_data.SewComWriteErr || check_object_data.PLCComErr1 || check_object_data.PLCComErr2) {

          //setAlram_add(check_object_data);

          if (check_object_data.ArticalCheck && !maintain_alarm["Article Scan Not Match."]) {
            newMessages.push("Article Scan Not Match.");
            maintain_alarm["Article Scan Not Match."] = true
          };
          if ((check_object_data.Label1) && (!maintain_alarm["Label Not Match"])) {
            newMessages.push("Label Not Match");
            maintain_alarm["Label Not Match"] = true
          };
          if (check_object_data.CodeRead2 && !maintain_alarm["Code Reader2 Not Match."]) {
            newMessages.push("Code Reader2 Not Match.");
            maintain_alarm["Code Reader2 Not Match."] = true
          };
          if (check_object_data.CodeRead3 && !maintain_alarm["Code Reader3 Not Match."]) {
            newMessages.push("Code Reader3 Not Match.");
            maintain_alarm["Code Reader3 Not Match."] = true
          }
          if (check_object_data.CodeRead4 && !maintain_alarm["Code Reader4 Not Match."]) {

            newMessages.push("Code Reader4 Not Match.");
            maintain_alarm["Code Reader4 Not Match."] = true
          }
          if (check_object_data.CodeRead5 && !maintain_alarm["Code Reader5 Not Match."]) {
            newMessages.push("Code Reader5 Not Match.");
            maintain_alarm["Code Reader5 Not Match."] = true
          }
          // if (check_object_data.Label2) newMessages.push("Label Not Match.");
          if (check_object_data.UserNotLog && !maintain_alarm["User Not Logged"]) {
            newMessages.push("User Not Logged");
            maintain_alarm["User Not Logged"] = true
          }
          //if (check_object_data.Sec1) newMessages.push("Section 1 Stitches Not Matched");
          //if (check_object_data.Sec2) newMessages.push("Section 2 Stitches Not Matched");
          //if (check_object_data.Sec3) newMessages.push("Section 3 Stitches Not Matched");
          if (check_object_data.HandScanComTri && !maintain_alarm["Hand Scaner Communication error"]) {
            newMessages.push("Hand Scaner Communication error");
            maintain_alarm["Hand Scaner Communication error"] = true
          }
          if (check_object_data.LabelScan && !maintain_alarm["Label Scaner Trriger Erro"]) {
            newMessages.push("Label Scaner Trriger Error");
            maintain_alarm["Label Scaner Trriger Erro"] = true
          }
          if (check_object_data.CodeReadTri2 && !maintain_alarm["Code Reader2 Trriger Error"]) {
            newMessages.push("Code Reader2 Trriger Error");
            maintain_alarm["Code Reader2 Trriger Error"] = true
          }
          if (check_object_data.CodeReadTri3 && !maintain_alarm["Code Reader3 Trriger Error"]) {
            newMessages.push("Code Reader3 Trriger Error");
            maintain_alarm["Code Reader3 Trriger Error"] = true
          }
          if (check_object_data.CodeReadTri4 && !maintain_alarm["Code Reader4 Trriger Error"]) {
            newMessages.push("Code Reader4 Trriger Error");
            maintain_alarm["Code Reader4 Trriger Error"] = true
          }
          if (check_object_data.LabelScanRead && !maintain_alarm["Label Scan Read Error"]) {
            newMessages.push("Label Scan Read Error");
            maintain_alarm["Label Scan Read Error"] = true
          }
          if (check_object_data.CodeRead2Error && !maintain_alarm["Code Reader2 Read Error"]) {
            newMessages.push("Code Reader2 Read Error");
            maintain_alarm["Code Reader2 Read Error"] = true
          }
          if (check_object_data.CodeRead3Error && !maintain_alarm["Code Reader3 Read Error"]) {
            newMessages.push("Code Reader3 Read Error");
            maintain_alarm["Code Reader3 Read Error"] = true
          }
          if (check_object_data.CodeRead4Error && !maintain_alarm["Code Reader4 Read Erro"]) {
            newMessages.push("Code Reader4 Read Error");
            maintain_alarm["Code Reader4 Read Erro"] = true
          }
          if (check_object_data.CodeRead5Error && !maintain_alarm["Code Reader5 Read Error"]) {
            newMessages.push("Code Reader5 Read Error");
            maintain_alarm["Code Reader5 Read Error"] = true
          }
          if (check_object_data.SewMach1 && !maintain_alarm["SEW Machines Com Trigger Error"]) {
            newMessages.push("SEW Machines Com Trigger Error");
            maintain_alarm["SEW Machines Com Trigger Error"] = true
          }
          if (check_object_data.SewMach2 && !maintain_alarm["SEW Machines Com Trigger Error 2"]) {
            newMessages.push("SEW Machines Com Trigger Error 2");
            maintain_alarm["SEW Machines Com Trigger Error 2"] = true
          }
          if (check_object_data.SewMachWriteSend && !maintain_alarm["SEW Machines Write Send Error"]) {
            newMessages.push("SEW Machines Write Send Error");
            maintain_alarm["SEW Machines Write Send Error"] = true
          }
          if (check_object_data.SewMachRes && !maintain_alarm["SEW Machines Response Error"]) {
            newMessages.push("SEW Machines Response Error");
            maintain_alarm["SEW Machines Response Error"] = true
          }
          if (check_object_data.PrintDisContect1 && !maintain_alarm["Print Socket Disconnect Error"]) {
            newMessages.push("Print Socket Disconnect Error");
            maintain_alarm["Print Socket Disconnect Error"] = true
          }
          if (check_object_data.PrintDisContect2 && !maintain_alarm["Print Socket Disconnect Error 2"]) {
            newMessages.push("Print Socket Disconnect Error 2");
            maintain_alarm["Print Socket Disconnect Error 2"] = true
          }
          if (check_object_data.CodeReadTrig && !maintain_alarm["Code Reader Trriger Error"]) {
            newMessages.push("Code Reader Trriger Error");
            maintain_alarm["Code Reader Trriger Error"] = true
          }

          if (check_object_data.SewMachReadErr && !maintain_alarm["SEW Machine Read Error"]) {
            newMessages.push("SEW Machine Read Error");
            maintain_alarm["SEW Machine Read Error"] = true
          }
          if (check_object_data.SewMachWriteErr && !maintain_alarm["SEW Machine Write Error"]) {
            newMessages.push("SEW Machine Write Error");
            maintain_alarm["SEW Machine Write Error"] = true
          }
          if (check_object_data.SewComReadErr && !maintain_alarm["SEW Machines Command Read Error"]) {
            newMessages.push("SEW Machines Command Read Error");
            maintain_alarm["SEW Machines Command Read Error"] = true
          }
          if (check_object_data.SewComWriteErr && !maintain_alarm["SEW Machines Command Write Error"]) {
            newMessages.push("SEW Machines Command Write Error");
            maintain_alarm["SEW Machines Command Write Error"] = true
          }
          //if (MachEnableDisable) newMessages.push("Machine ");
          if (check_object_data.PLCComErr1 && !maintain_alarm["PLC-PLC FINS communication Error"]) {
            newMessages.push("PLC-PLC FINS communication Error");
            maintain_alarm["PLC-PLC FINS communication Error"] = true
          }
          if (check_object_data.PLCComErr2 && !maintain_alarm["PLC-PLC FINS communication Error 2"]) {
            newMessages.push("PLC-PLC FINS communication Error 2");
            maintain_alarm["PLC-PLC FINS communication Error 2"] = true
          }



          // console.log("newMessages",newMessages);

          //if(newMessages[0]){
          //let new_messages = [...new Set(newMessages)]







          let index = 0;
          // const interval = setInterval(() => {
          if (newMessages.length > 0) {
            setMessages(newMessages[0]);
            setOpen(true);
            // console.log("setting");

            setCurrentMessageIndex(() => () => {
              console.log(newMessages, maintain_alarm);

              delete maintain_alarm?.[newMessages?.[0]]
              newMessages.shift()

              if (newMessages.length > 0) {
                setMessages(newMessages[0]);
                setOpen(true);
              }
            }); console.log("updated");
          }

          //   index = (index + 1) % newMessages.length; // Cycle through messages
          // }, 2000); // Change message every second



          try {
            // console.log(newMessages);
            const res = await server.post('/AlramMsg', { newMessages, user_name: user.user_name });
            //console.log(res.data);
          } catch (error) {
            console.error("Alram Message Error", error);
          }



          return () => {
            // Remove event listener
            ss.off('FromAPI',);
            ss.off('testingData');
            ss.off('check_status');
            ss.disconnect()
            // clearInterval(interval)
          };


        }



      })

      //console.log(alram_add);



      ss.on('alert', data => {
        //console.log(data);

        // alert(data['alerts']);

        setalt({ open: true, data: data['alerts'] })
        setTimeout(() => {
          setalt({ open: false, data: "" })
        }, 3000);
        //  setTestingData((p)=>({...p,...data}));
        //  sessionStorage.setItem("cmi_data",JSON.stringify({...(sessionStorage.getItem("cmi_data")?JSON.parse(sessionStorage.getItem("cmi_data")):"{}"),...data}))
      });
      return () => {
        ss.off('FromAPI',);
        ss.off('testingData');
        ss.off('check_status');
      };
    } else {
      setsocket()
    }
  }, [login]);


  // var user_name ='';
  // var user_name = user.user_name;
  //console.log("User Login",user.user_name);

  // useEffect(() => {





  // }, [ArticalCheck, Label1, CodeRead2, CodeRead3, CodeRead4, CodeRead5, Label2, UserNotLog, Sec1, Sec2, Sec3,
  //   HandScanComTri, LabelScan, CodeReadTri2, CodeReadTri3, CodeReadTri4, LabelScanRead, CodeRead2Error,
  //   CodeRead3Error, CodeRead4Error, CodeRead5Error, SewMach1, SewMach2, SewMachWriteSend, SewMachRes,
  //   PrintDisContect1, PrintDisContect2, CodeReadTrig, SewMachReadErr, SewMachWriteErr, SewComReadErr,
  //   SewComWriteErr, PLCComErr1, PLCComErr2]);
  //console.log(ArticalCheck);



  return (
    <commondata.Provider value={{ setTestingData, socket, login, setlogin, user, setUser, setsocket, testingData, setCheckStatus, checkStatus, alt, setalt }}>
      <div className="App">

        {/* {alt.open && <Dialog open={false} fullWidth>
          <DialogTitle><Alert severity='info'><h1>{alt.data}</h1></Alert></DialogTitle>
        </Dialog>} */}


        {open && (<Box sx={{ width: 1 }} className="QtnMaster">

          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 12">
            </Box>
            <Dialog
              open={open}
              onClose={handleClose}
              // scroll={"paper"}
              // aria-labelledby="scroll-dialog-title"
              // aria-describedby="scroll-dialog-description"
              maxWidth={'xl'}
              minWidth={'xl'}
              className='DialogContentmodel1'
            >
              <DialogTitle className='DialogTitletmodel' id="scroll-dialog-title" ><IconButton onClick={handleClose} color='white' sx={{ color: '' }} className='closeicon'><CloseIcon /></IconButton></DialogTitle>
              <DialogContent dividers={'paper'}
                lg={12} xs={12} sm={12} md={12}
                className='DialogContentmodel'
                sx={{ backgroundColor: 'red' }}
              >
                <DialogContentText
                  id="scroll-dialog-description"
                  // ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <Grid container spacing={1} display={'flex'} alignItems={'center'}>
                    <Grid item lg={1} xl={1} xs={12} sm={12} md={12} className='label'>
                      <WarningAmberIcon sx={{ fontSize: '33px', color: 'white' }} />
                    </Grid>
                    <Grid item lg={9} xs={9} xl={9} sm={12} md={12}>
                      <Typography color={'white'} fontSize={'25px'}> Warning: {messages}</Typography>
                    </Grid>

                    <Grid item lg={12} xs={12} sm={12} md={12} >
                      <Grid container >
                        <Grid item lg={12} xs={12} sm={12} md={12} display={'flex'} justifyContent={'end'} >
                          <Button variant='contained' onClick={handleClear} color='success' >Close</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
            </Dialog>

          </Box>
        </Box>)}




        <BrowserRouter>
          <Routes>
            <Route index element={!login ? <LoginForm /> : <h1>Already Logged Go Back</h1>}></Route>
            <Route path='/' element={login ? <Nav /> : <Link to={"/"}>Go login to Login</Link>}>

              <Route path='/user_dashboard' element={login ? <User_dashboard /> : <Link to={"/"}>Go sdgjbjsdfbgjto Login</Link>} />
              <Route path='/sweing' element={login ? <Sweing /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/register' element={login ? <UserRegistration /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/registerTable' element={login ? <UserRegistrationTable /> : <Link to={"/"}>Go 55445454to Login</Link>} />
              {/* <Route path='/login' element={<LoginForm />}/> */}
              <Route path='/checkScanner' element={login ? <CheckScanner /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/threadDatabase' element={login ? <Thread_Database /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/viewcoilDatabase' element={login ? <View_Coil_Database /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/alram_table' element={login ? <Alram_Database /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/seamPattern' element={login ? <Seam_Pattern /> : <Link to={"/"}>Go to Login</Link>} />
              <Route path='/barcode_scanner' element={login ? <Barcode_scanner /> : <Link to={"/"}>Go to Login</Link>}></Route>
              <Route path='/tt_graphic' element={login ? <TT_Graphic /> : <Link to={"/"}>Go to Login</Link>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div></commondata.Provider>
  );
}

export default App;

