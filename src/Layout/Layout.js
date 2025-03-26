import React, { useContext, useState } from 'react';
import { AppBar, Avatar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme, Badge, Stack, badgeClasses } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import LibraryBooksSharpIcon from '@mui/icons-material/LibraryBooksSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import TableViewSharpIcon from '@mui/icons-material/TableViewSharp';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import StorageIcon from '@mui/icons-material/Storage';
import PatternIcon from '@mui/icons-material/Pattern';
import './Layout.css';
import { styled } from '@mui/material/styles';
import Logo from '../images/hyundai-logo.png';
import { commondata } from '../App';

const drawerWidth = 240;

const StyledBadgeGreen = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -7,
            left: -6,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 2s infinite ease-in-out',
            border: '10px solid currentColor', // Increase border size here
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledBadgeRed = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'red',
        color: 'red',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -7,
            left: -6,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 2s infinite ease-in-out',
            border: '10px solid currentColor', // Increase border size here
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function Nav() {



    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const { setlogin, socket, testingData, setTestingData, checkStatus, setCheckStatus, user, setUser, alt, setalt } = useContext(commondata)
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    // console.log("DB", alt.data);
    const admin_ses = sessionStorage.getItem('user');
    //setLoading(true);
    const admin = JSON.parse(admin_ses);
    console.log('Ses Data', admin);

    // Access the user_name property
    const admin_access = admin?.rights;
    console.log('admin_access', admin_access);

    // console.log("USER",user);

    // Access the array associated with the key 'H50.1'
    let value = checkStatus['H50.1'];

    // Check if value exists and is an array
    if (Array.isArray(value)) {
        // Log the first value of the array
        // console.log("Test", value); // Output: true (assuming the first element is true)

        var machineReady = value[0];

        var machineBusy = value[1];

        var machineStop = value[2];
        var machineNotReady = value[3];

    } else {
        // Handle the case where 'H50.1' is not found or is not an array
        console.error('Value is not an array or key does not exist');
    }

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const user_routes = [
        { name: 'Home', path: '/user_dashboard', icon: <HomeSharpIcon /> },
        // { name: 'Login', path: '/user_dashboard', icon: <LibraryBooksSharpIcon /> },
        { name: 'Sewing', path: '/sweing', icon: <TableViewSharpIcon /> },
        { name: 'Barcode Scanner', path: '/barcode_scanner', icon: <SettingsOutlinedIcon /> },
        // { name: 'Report', path: '/', icon: <LogoutIcon /> },
        // { name: 'Registration', path: '/register', icon: <HowToRegIcon /> },
        // { name: 'Registered User', path: '/registerTable', icon: <BackupTableIcon /> },
        // { name: 'User Login', path: '/login', icon: <LoginIcon /> },
        { name: 'Check Scanner', path: '/checkScanner', icon: <QrCodeScannerIcon /> },
        { name: 'Report', path: '/report', icon: <HowToRegIcon /> },
        { name: 'Alarm Scanner', path: '/alram_table', icon: <StorageIcon /> },
        // { name: 'Thread Database', path: '/threadDatabase', icon: <StorageIcon /> },
        // { name: 'View Coil Database', path: '/viewCoilDatabase', icon: <StorageIcon /> },
        // { name: 'Seam Patterns', path: '/seamPattern', icon: <PatternIcon /> },
        // { name: 'TT Graphic', path: '/tt_graphic', icon: <LogoutIcon /> },
    ];
    const Admin_route = [
        { name: 'Registration', path: '/register', icon: <HowToRegIcon /> },
        { name: 'Report', path: '/report', icon: <HowToRegIcon /> },

    ]
    const routes = admin_access === 'Maintenance' ? Admin_route : user_routes
    return (
        <Box sx={{ display: 'flex' }}>

            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && isDesktop && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
                    }),
                    padding: "12px",
                    backgroundColor: '#2F539B', color: 'white', boxShadow: 'none', borderBottom: '0.5px solid lightgrey'
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton edge="start" sx={{ color: 'white' }} aria-label="menu" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>

                    {/* <p style={{
                        color:alt.pass === 'Ready'?'green':alt.pass === 'Section1'?'red':alt.pass === 'Section2'?'green':alt.pass === 'Section3'?'white':'',
                        animation:"blink 4s infinite",backgroundColor:'white', padding:'0px 3px'}}>
                    {alt.pass == 'Ready'?"Section Ready To Start":alt.pass == 'Section1'?"Section 1 Running":alt.pass == 'Section2'?'Section 2 Running':alt.pass == 'Section3'?'Section 3 Running':''}
                    </p> */}
                    {alt.open ?

                        <p style={{
                            color: alt.pass === 'Ready' ? 'green' : alt.pass === 'Section1' ? 'red' : alt.pass === 'Section2' ? 'green' : alt.pass === 'Section3' ? 'white' : '',
                            backgroundColor: 'white',
                            borderRadius: '3px',
                            fontWeight: 'bold',
                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                            textAlign: 'center',
                            animation: "fadeBlink 1s infinite",
                            display: 'inline-block', // Prevents block expansion
                            lineHeight: '30px', // Ensures text stays centered vertically
                            padding: '0px 8px',
                            fontSize: '17px',
                            minWidth: '160px', // Avoids text wrapping and keeps uniform size
                        }}>
                            {alt.pass === 'Ready' ? "Section Ready To Start" :
                                alt.pass === 'Section1' ? "Section 1 Running" :
                                    alt.pass === 'Section2' ? 'Section 2 Running' :
                                        alt.pass === 'Section3' ? 'Section 3 Running' : ''}
                        </p>
                        : ''}

                    <div style={{ display: `flex`, alignItems: `center`, columnGap: `60px ` }}>

                        <Stack direction="row" spacing={2} columnGap={4}>








                            <div>
                                <span style={{ marginRight: `25px` }}>
                                    Machine
                                </span>

                                {machineReady === true ? <StyledBadgeGreen
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                ></StyledBadgeGreen> : <StyledBadgeRed
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                ></StyledBadgeRed>}

                            </div>


                            <div>
                                <span style={{ marginRight: `25px` }}>
                                    DB
                                </span>
                                {checkStatus['connectionDB'] === true ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    ></StyledBadgeGreen> : <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    ></StyledBadgeGreen>}
                            </div>

                            <div>
                                <span style={{ marginRight: `25px` }}>
                                    PLC
                                </span>
                                {checkStatus['connectionPLC'] === true ?
                                    <StyledBadgeGreen
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    ></StyledBadgeGreen> : <StyledBadgeRed
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    ></StyledBadgeRed>}
                            </div>

                        </Stack>


                        <Link to={'/'} onClick={() => { setlogin(false); sessionStorage.clear(); localStorage.clear(); socket.close() }}>
                            <LogoutIcon fontSize='large' color='white' src='' />
                        </Link>
                    </div>
                </Toolbar>



            </AppBar>

            <Drawer
                variant={isDesktop ? 'persistent' : 'temporary'}
                anchor="left"
                open={open}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                    },
                }}
                className='sidemenu_drawer'
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 900, backgroundColor: 'inherit' }}>
                    {/* <Typography fontWeight={600}>CMI</Typography> */}
                    <img src={Logo} className='logo-align' alt='Hyundai Logo' />
                </Toolbar>
                <Divider />
                <List className='menuitems_list'>
                    {routes.map((route) => (
                        <React.Fragment key={route.name}>
                            <ListItemButton component={Link} to={route.path}>
                                <ListItemIcon sx={{ color: 'white' }}>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: open && isDesktop ? `${drawerWidth}px` : 0,
                }}
            >
                <Toolbar />
                <Outlet />
            </Box>

        </Box>
    );
}
