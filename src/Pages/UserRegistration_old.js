import { Button, Card, CardContent, Container, Modal, FormControl, Grid, MenuItem, Select, TextField, Typography, ThemeProvider, createTheme, useTheme, Box, InputAdornment, InputLabel, colors } from '@mui/material'
import { React, useEffect, useMemo, useState } from 'react'
import server from '../server/server';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { MaterialReactTable } from 'material-react-table';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom'
const columns = [
    {
        accessorKey: 'user_name',
        header: 'User Name',
    },
    {
        accessorKey: 'personal_id',
        header: 'Personnel id',
    },
    {
        accessorKey: 'rights',
        header: 'Access Level',
    },
    {
        accessorKey: 'time',
        header: 'Last Login at',
    },
    {
        accessorKey: 'lastLogoutAt',
        header: 'Last Logout at',
    },
];

const data = [
    {
        userName: 'Dylan',
        personnelNumber: 'Murray',
        accessLevel: '261 Erdman Ford',
        city: 'East Daphne',
        lastLogoutAt: 'Kentucky',
    },
    {
        userName: 'Raquel',
        personnelNumber: 'Kohler',
        accessLevel: '769 Dominic Grove',
        city: 'Columbus',
        lastLogoutAt: 'Ohio',
    },
    {
        userName: 'Ervin',
        personnelNumber: 'Reinger',
        accessLevel: '566 Brakus Inlet',
        city: 'South Linda',
        lastLogoutAt: 'West Virginia',
    },
    {
        userName: 'Brittany',
        personnelNumber: 'McCullough',
        accessLevel: '722 Emie Stream',
        city: 'Lincoln',
        lastLogoutAt: 'Nebraska',
    },
    {
        userName: 'Branson',
        personnelNumber: 'Frami',
        accessLevel: '32188 Larkin Turnpike',
        city: 'Charleston',
        lastLogoutAt: 'South Carolina',
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const UserRegistration = () => {


    const [values,SetValues] = useState({});


    const [selectedValue, setSelectedValue] = useState('');

    const handleOption = (event) => {
        setSelectedValue(event.target.value);
    };

    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = () => {

        setShowForm(false);
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const globalTheme = useTheme();

    const tableTheme = useMemo(
        () =>
            createTheme({
                components: {
                    MuiTableContainer: {
                        styleOverrides: {
                            root: {
                                backgroundColor: '#EAEBEC',
                            },
                        },
                    },
                },
            }),
        [globalTheme],
    );

    const [data,setData] = useState([]);

    const handleChange = (e) => {
        //console.log( e.target.value);
        const { name, value } = e.target;
    
        values[name] = value;
      };
      const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            //navigate('/user_dashboard');
            console.log(values);
            const res = await server.post('/register', values);
            console.log(res.data);
            navigate('/user_dashboard');
        } catch (error) {
            console.error(error);
        }
    };

useEffect(()=>{
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);




    const fetchData = async () => {
        try {
          //setLoading(true);
          const response = await server.get('/allUsers');
          // await server.get("/companydata", { ...data }).then((res)
          console.log(response.data);
          setData(response.data); // Correct the property to access response data
          //setLoading(false);
        } catch (error) {
          console.error('There was an error fetching the data!', error);
          //setLoading(false); 
        }
      };



    return (
        <div>

            {/* USER ADD BUTTON START HERE  */}

            <Grid container spacing={2} style={{ marginBottom: `20px` }}>
                <Grid item lg={10}>
                    <Button variant='contained' endIcon={<AddIcon />} style={{ display: `flex`, alignItems: `center` }} onClick={handleButtonClick}>
                        New User Registration
                    </Button>
                </Grid>
            </Grid>

            {/* USER ADD BUTTON END HERE  */}

            {showForm && (

                <Card>
                    <CardContent>
                        {/* FORM START HERE  */}

                        <form autoComplete='off' onSubmit={handlesubmit}>

                            <Grid container spacing={2}>

                                {/* User details column 1 start here */}
                                <Grid item xl={6} lg={6}>
                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        {/* <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Date</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='date'
                                                    value={''}
                                                    type="date"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid> */}

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography className='label'>User Name</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='user_name' defaultValue={''}  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Password</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='password'  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>


                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Identity Number</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}  >
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='identification_no' defaultValue={''} onChange={handleChange} />
                                            </FormControl>
                                        </Grid>



                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Security Level</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <Select variant='outlined' name="rights" defaultValue={'0'} onChange={handleChange}>
                                                    <MenuItem value='0' disabled>Select</MenuItem>
                                                    <MenuItem value='Operator'>Operator</MenuItem>
                                                    <MenuItem value='Maintenance'>Maintenance</MenuItem>
                                                    <MenuItem value='ME'>ME</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>



                                    </Grid>
                                </Grid>
                                {/* User details column 1 end here */}


                                {/* User details column 2 start here */}
                                <Grid item xl={6} lg={6}>
                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Time</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    type="time"
                                                    name='time'
                                                    value={''}
                                                    onChange={handleChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Personal ID</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='personal_id'  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Repeat Password</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='password' defaultValue={''}  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={4} lg={3} xs={12}>
                                            <Typography>Photo</Typography>
                                        </Grid>

                                        <Grid item xl={3} lg={3} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <Button
                                                    component="label"
                                                    role={undefined}
                                                    variant="contained"
                                                    tabIndex={-1}
                                                    name='photo'
                                                    startIcon={<CloudUploadIcon />}
                                                >
                                                    Upload file
                                                    <VisuallyHiddenInput type="file" />
                                                </Button>
                                            </FormControl>
                                        </Grid>


                                        <Grid item xl={3} lg={3} sm={12} xs={12}>
                                            <img height={'150px'} width={'150px'} alt='' />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                {/* User details column 2 end here */}

                                {/* Title 1  */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <div className='border-top titletext1'></div>
                                    </Grid>
                                </Grid>

                                {/* Parameters section start here  */}

                                <Grid item xl={6} lg={6}>

                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography className='label'>Seam Program Number</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='seam_no' defaultValue={''}  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xl={6} lg={6}>

                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography className='label'>Seam Program Name</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='seam_name' defaultValue={''}  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* Parameters section end here  */}

                                {/* Title 2  */}
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <div className='border-top titletext2'></div>
                                    </Grid>
                                </Grid>

                                {/* Stitches 1 start here  */}
                                <Grid item xl={6} lg={6}>

                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitching Types</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                {/* <Select variant='outlined' defaultValue={'0'}
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                value={selectedValue}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="0">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Free'}>Free</MenuItem>
                                                <MenuItem value={'Sab'}>Sab</MenuItem>
                                            </Select> */}

                                                <Select variant='outlined' defaultValue={'0'} name='type'  onChange={handleChange}>
                                                    <MenuItem value='0' disabled>Select</MenuItem>
                                                    <MenuItem value={'Free'}>Free</MenuItem>
                                                    <MenuItem value={'Sab'}>Sab</MenuItem>
                                                </Select>

                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max Speed</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined' name='maxspeed1' defaultValue={''}  onChange={handleChange} />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Abs.Long</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='abslong1'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='max1'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>


                                    </Grid>



                                </Grid>

                                <Grid item xl={6} lg={6}>
                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitch Length</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stitch_length1'
                                                    type='number'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stl. Corr. Fak</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stl_corr_fak1'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Min</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='min1'
                                                    defaultValue={''}
                                                    onChange={handleChange}

                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitches</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='stitches1'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                {/* Stitches 1 end here  */}


                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <div className='border-top titletext3'></div>
                                    </Grid>
                                </Grid>

                                {/* Stitches 2 start here  */}
                                <Grid item xl={6} lg={6}>

                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitching Types</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                {/* <Select variant='outlined' defaultValue={'0'}
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                value={selectedValue}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="0">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Free'}>Free</MenuItem>
                                                <MenuItem value={'Sab'}>Sab</MenuItem>
                                            </Select> */}

                                                <Select variant='outlined' defaultValue={'0'} name='type2'  onChange={handleChange}>
                                                    <MenuItem value='0' disabled>Select</MenuItem>
                                                    <MenuItem value={'Free'}>Free</MenuItem>
                                                    <MenuItem value={'Sab'}>Sab</MenuItem>
                                                </Select>

                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max Speed</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='maxspeed2' defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Abs.Long</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='abslong2'
                                                    defaultValue={''}
                                                    onChange={handleChange}

                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='max2'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>


                                    </Grid>



                                </Grid>

                                <Grid item xl={6} lg={6}>
                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitch Length</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stitch_length2'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stl. Corr. Fak</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stl_corr_fak2'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Min</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='min2'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitches</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='stitches2'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                {/* Stitches 2 end here  */}

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <div className='border-top titletext4'></div>
                                    </Grid>
                                </Grid>

                                {/* Stitches 3 start here  */}

                                <Grid item xl={6} lg={6}>

                                    <Grid container spacing={2} justifyContent={'space-between'}>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitching Types</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                {/* <Select variant='outlined' defaultValue={'0'}
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                value={selectedValue}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="0">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'Free'}>Free</MenuItem>
                                                <MenuItem value={'Sab'}>Sab</MenuItem>
                                            </Select> */}

                                                <Select variant='outlined' defaultValue={'0'} name='type3' onChange={handleChange}>
                                                    <MenuItem value='0' disabled>Select</MenuItem>
                                                    <MenuItem value={'Free'}>Free</MenuItem>
                                                    <MenuItem value={'Sab'}>Sab</MenuItem>
                                                </Select>

                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max Speed</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='maxspeed3' defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Abs.Long</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='abslong3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Max</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='max3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>


                                    </Grid>



                                </Grid>

                                <Grid item xl={6} lg={6}>
                                    <Grid container spacing={2} justifyContent={'space-between'}>



                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitch Length</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stitch_length3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stl. Corr. Fak</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField variant='outlined'
                                                    name='stl_corr_fak3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Min</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant='outlined'
                                                    name='min3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xl={3} lg={3} xs={12}>
                                            <Typography>Stitches</Typography>
                                        </Grid>
                                        <Grid item xl={7} lg={7} sm={12} xs={12}>
                                            <FormControl fullWidth>
                                                <TextField
                                                    variant="outlined"
                                                    name='stitches3'
                                                    defaultValue={''}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                {/* Stitches 3 end here  */}


                                {/* Submit Button  */}
                                <Grid item xl={12} lg={12} sm={12} display={'flex'} justifyContent={'end'} style={{ marginTop: `10px` }}>
                                    <Grid container spacing={2} justifyContent={'end'} >
                                        <Grid item>
                                            <Button variant='contained' type='submit' color="success" startIcon={<DoneIcon />}>Submit</Button>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>
                        </form>

                        {/* FORM END HERE  */}
                    </CardContent>
                </Card>

            )
            }

            <ThemeProvider theme={tableTheme} >
                <Box sx={{ width: 1 }} marginTop={'1%'}>
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <Box gridColumn="span 12">
                            <MaterialReactTable
                                columns={columns}
                                data={data}
                                enableRowSelection
                                enableColumnOrdering
                                enableColumnPinning
                                renderTopToolbarCustomActions={({ table }) => (
                                    <>
                                        <Button variant="contained" startIcon={<PrintIcon />}>
                                            Print BC
                                        </Button>
                                        {/* <Button variant="contained" startIcon={<PhotoCamera />}>
                                User Photo
                            </Button> */}
                                    </>
                                )}
                            />
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </div >
    )
}

export default UserRegistration;
