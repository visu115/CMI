import { Button, Card, CardContent, Container, Modal, FormControl, Grid, MenuItem, Select, TextField, Typography, ThemeProvider, createTheme, useTheme, Box, InputAdornment, InputLabel, colors, FormHelperText, CardHeader } from '@mui/material'
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
import { Form, useNavigate } from 'react-router-dom';



// Function to handle edit action



// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };


const UserRegistration = () => {


    const [values, SetValues] = useState({});

    const navigate = useNavigate();

    const [selectedValue, setSelectedValue] = useState('');

    const handleOption = (event) => {
        setSelectedValue(event.target.value);
    };

    const [showForm, setShowForm] = useState(false);
    const [showUserForm, setshowUserForm] = useState(false);
    const handleEdit = (userData) => {
        setShowForm(!showForm);
        console.log("Editing User:", userData);
        SetValues(userData);
        // Perform navigation, open modal, or set state for editing
    };

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = () => {

        setShowForm(false);
    };
    const handleAddNewUser = async () => {
        setshowUserForm(true)
        setShowForm(false);

    }

    const Articlecolumns = [
        // {
        //     accessorKey: 'user_name',
        //     header: 'User Name',
        // },
        // {
        //     accessorKey: 'personal_id',
        //     header: 'Personnel ID',
        // },
        // {
        //     accessorKey: 'rights',
        //     header: 'Access Level',
        // },
        // {
        //     accessorKey: 'time',
        //     header: 'Last Login at',
        // },
        // {
        //     accessorKey: 'lastLogoutAt',
        //     header: 'Last Logout at',
        // },
        {
            accessorKey: 'program_no',
            header: 'Program No',
        },
        {
            accessorKey: 'seam_name',
            header: 'Seam No',
        },
        {
            header: 'Action',
            accessorKey: 'action', // No need for actual data, just for column header
            Cell: ({ row }) => (
                <button
                    onClick={() => handleEdit(row.original)}
                    style={{
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Edit
                </button>
            ),
        },
    ];


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

    const [articledata, setArticleData] = useState([]);
    const [userData, setUserData] = useState([]);

    const handleChange = (e) => {
        //console.log( e.target.value);
        const { name, value } = e.target;

        values[name] = value;
        SetValues(() => ({ ...values }))
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            //navigate('/user_dashboard');
            console.log(values);
            const res = await server.post('/register', values);
            console.log(res.data);
            SetValues({})
            setShowForm(false)
            getArcticleData();
        } catch (error) {
            console.error(error);
        }
    };
    const [available, setAvailable] = useState(null);

    const handleUsernameChange = async (e) => {
        const value = e.target.value;
        if (value.length > 2) {
            try {
                const response = await server.get(`/check_username?user_name=${value}`);
                setAvailable(response.data);
            } catch (error) {
                console.error("Error Check UserName:-", error);
            }
        } else {
            setAvailable(null);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        //setLoading(true);

        // Get data from session storage
        const userString = sessionStorage.getItem('user');
        //setLoading(true);
        const user = JSON.parse(userString);

        // Access the user_name property
        const userName = user.user_name;

        try {
            console.log("Updating...", values);
            const res = await server.post('/update_register', values, { timeout: 5000 });

            if (res.status === 200) {
                console.log(res.data);
                if (res.data.updatedUser.user_name == userName) {
                    sessionStorage.setItem('user', JSON.stringify(res.data.updatedUser));
                }
                SetValues({})
                getArcticleData();

                setShowForm(false)
            } else {
                console.log("Update failed");
            }
        } catch (error) {
            console.error("Error updating:", error);
        } finally {
            //setLoading(false);
        }
    };


    useEffect(() => {
        getArcticleData();
        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    const getArcticleData = async () => {
        try {
            //setLoading(true);
            const response = await server.get('/getArticleList');
            // await server.get("/companydata", { ...data }).then((res)
            console.log("Table Data", response.data);
            setArticleData(response.data); // Correct the property to access response data
            //setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            //setLoading(false); 
        }
    };

    const getUserData = async () => {
        try {
            //setLoading(true);
            const response = await server.get('/getAllUsers');
            // await server.get("/companydata", { ...data }).then((res)
            console.log("Table Data", response.data);
            setUserData(response.data); // Correct the property to access response data
            //setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
            //setLoading(false); 
        }
    };

    const [formData, setFormData] = useState({
        user_name: "",
        rights: "",
        password: ""
    });

    const handleuserchange = (e) => {

        setFormData({ ...formData, [e.target.name?.toLocaleLowerCase()]: e.target.value });
    };

    const handleUserSubmit = async () => {
        if (!formData.user_name || !formData.password || !formData.rights) {
            alert("Please fill all fields.");
            return;
        }
        const payload = {
            username: formData.user_name,
            password: formData.password,
            rights: formData.rights
        }
        try {
            const response = await server.post("/New_user_register", payload);
            console.log("Response:", response.data);
            setshowUserForm(false)
            setFormData({ user_name: '', password: '', rights: '' })
            getUserData();
        } catch (error) {
            console.error("Error submitting user:", error);
            alert("Failed to submit user.");
        }
    };
    const handlecancel = () => {
        setshowUserForm(false)
        setShowForm(false)
        setFormData({ user_name: '', password: '', rights: '' })
        SetValues({})
    }

    const UsersTable = ({ data }) => {
        const UserColumns = [
            { accessorKey: "user_name", header: "User Name" },
            { accessorKey: "rights", header: "Access Level" },
        ];

        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Users Table
                    </Typography>
                    <MaterialReactTable columns={UserColumns} data={data} />
                </CardContent>
            </Card>
        );
    };

    const ArticlesTable = ({ data }) => {
        const Articlecolumns = [
            { accessorKey: "program_no", header: "Program No" },
            { accessorKey: "seam_name", header: "Seam No" },
            { accessorKey: "article_code", header: "Article Code" },

            {
                header: "Action",
                accessorKey: "action",
                Cell: ({ row }) => (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(row.original)}
                    >
                        Edit
                    </Button>
                ),
            },
        ];

        return (
            <Card sx={{ marginBottom: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Article Table
                    </Typography>
                    <MaterialReactTable columns={Articlecolumns} data={data} />
                </CardContent>
            </Card>
        );
    };
    return (
        <div>
            {showUserForm ? (<>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
                    <Card sx={{ maxWidth: "500px", width: "100%", padding: "24px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "12px" }}>
                        <CardHeader title="Add User" sx={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "bold" }} />
                        <CardContent>
                            <Typography variant="h6" sx={{ textAlign: "center", marginBottom: "16px", color: "#555" }}>
                                Fill in the details below
                            </Typography>
                            <Grid container spacing={2}>
                                {/* User Name Field */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                                        User Name
                                    </Typography>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            name="user_name"
                                            value={formData.user_name}
                                            onChange={handleuserchange}
                                            placeholder="Enter username"
                                            sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                                        />
                                    </FormControl>
                                </Grid>

                                {/* Password Field */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                                        Password
                                    </Typography>
                                    <FormControl fullWidth>
                                        <TextField
                                            variant="outlined"
                                            type="password"
                                            autoComplete='new-password'
                                            name="Password"
                                            value={formData.password}
                                            onChange={handleuserchange}
                                            placeholder="Enter password"
                                            sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                                        />
                                    </FormControl>
                                </Grid>

                                {/* Rights Selection Field */}
                                <Grid item xs={12}>
                                    <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                                        Rights
                                    </Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            value={formData.rights}
                                            name='rights'
                                            onChange={handleuserchange}
                                            displayEmpty
                                            sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
                                        >
                                            <MenuItem value="" disabled>Select Rights</MenuItem>
                                            <MenuItem value="Maintenance">Maintenance</MenuItem>
                                            <MenuItem value="Operator">Operator</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Submit Button */}

                                <Grid item xs={12}>
                                    <Grid container spacing={2} justifyContent="end">
                                        <Grid item>
                                            <Button color='primary' variant="contained" onClick={handleUserSubmit} >Submit</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button color='error' variant="contained" onClick={handlecancel} >cancel</Button>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            </>) : (<>
                {/* USER ADD BUTTON START HERE  */}

                <Grid container spacing={2} style={{ marginBottom: `20px` }}>
                    <Grid item>
                        <Button variant='contained' endIcon={<AddIcon />} style={{ display: `flex`, alignItems: `center` }} onClick={handleButtonClick}>
                            New Article Creation
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' endIcon={<AddIcon />} style={{ display: `flex`, alignItems: `center` }} onClick={handleAddNewUser}>
                            Add New user
                        </Button>
                    </Grid>
                </Grid>

                {/* USER ADD BUTTON END HERE  */}

                {showForm ? (

                    <Card>
                        <CardContent>
                            {/* FORM START HERE  */}

                            <form autoComplete='off'>

                                <Grid container spacing={2}>

                                    {/* User details column 1 start here */}
                                    <Grid item xl={6} lg={6}>
                                        <Grid container spacing={2} justifyContent={'space-between'}>



                                        </Grid>
                                    </Grid>


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
                                                <Typography className='label'>Program Number</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='program_no' value={values.program_no} onChange={handleChange} />
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


                                                    <Select variant='outlined' defaultValue={'0'} name='section_seam_1' value={values.section_seam_1} onChange={handleChange}>
                                                        <MenuItem value='0' disabled>Select</MenuItem>
                                                        {/* <MenuItem value={'Free'}>Free</MenuItem> */}
                                                        <MenuItem value={'Sab'}>Sab</MenuItem>
                                                    </Select>

                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Thread Tension</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='thread_tension' value={values.thread_tension} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Stiches Length</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant="outlined"
                                                        name='stiches_length'
                                                        value={values.stiches_length}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Foot Pressure</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant='outlined'
                                                        name='foot_pressure'
                                                        value={values.foot_pressure}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>No Of Stitches (MAX)</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant="outlined"
                                                        name='no_stitches_max1'
                                                        value={values.no_stitches_max1}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>

                                        </Grid>



                                    </Grid>

                                    <Grid item xl={6} lg={6}>
                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Foot Height</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined'
                                                        name='foot_height'
                                                        type='number'
                                                        value={values.foot_height}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Sewing Spped</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined'
                                                        name='sewing_speed'
                                                        value={values.sewing_speed}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>Walking Foot Stoke</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant='outlined'
                                                        name='walkimg_fot_stoke'
                                                        value={values.walkimg_fot_stoke}
                                                        onChange={handleChange}

                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>No Of Stitches</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant="outlined"
                                                        name='no_stitches1'
                                                        value={values.no_stitches1}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography>No Of Stitches (MIN)</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField
                                                        variant="outlined"
                                                        name='no_stitches_min1'
                                                        value={values.no_stitches_min1}
                                                        onChange={handleChange}
                                                    />
                                                </FormControl>
                                            </Grid>




                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <div className='border-top titletext5'></div>
                                        </Grid>
                                    </Grid>
                                    {/* Code Start */}


                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Artical Code</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='article_code' value={values.article_code} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>

                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Code Reader 1</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='codereader1' value={values.codereader1} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>

                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Code Reder 2</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='codereader2' value={values.codereader2} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>

                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Code Reader 3</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='codereader3' value={values.codereader3} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>


                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Code Reader 4</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='codereader4' value={values.codereader4} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>
                                    <Grid item xl={6} lg={6}>

                                        <Grid container spacing={2} justifyContent={'space-between'}>

                                            <Grid item xl={3} lg={3} xs={12}>
                                                <Typography className='label'>Code Reader 5</Typography>
                                            </Grid>
                                            <Grid item xl={7} lg={7} sm={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <TextField variant='outlined' name='codereader5' value={values.codereader5} onChange={handleChange} />
                                                </FormControl>
                                            </Grid>

                                        </Grid>




                                    </Grid>

                                    {/* Scan Data */}



                                    {/* Submit Button  */}
                                    <Grid item xl={12} lg={12} sm={12} display={'flex'} justifyContent={'end'} style={{ marginTop: `10px` }}>
                                        <Grid container spacing={2} justifyContent={'end'} >
                                            <Grid item>
                                                {values._id ?
                                                    <Button variant='contained' type='submit' color="success" onClick={handleUpdate} startIcon={<DoneIcon />}>Update</Button>
                                                    : <Button variant='contained' type='submit' color="success" onClick={handlesubmit} startIcon={<DoneIcon />}>Submit</Button>
                                                }
                                            </Grid>
                                            <Grid item>
                                                <Button color='error' variant="contained" onClick={handlecancel} >cancel</Button>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                            </form>

                            {/* FORM END HERE  */}
                        </CardContent>
                    </Card>

                ) : (<>

                    <ThemeProvider theme={tableTheme} >
                        <Box sx={{ width: 1 }} marginTop={'1%'}>
                            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                                {/* <Box gridColumn="span 12">
                                <MaterialReactTable
                                    columns={Articlecolumns}
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
                                {/* </>
                                    )}
                                />
                            </Box> */}
                                <Box gridColumn="span 12">
                                    <ArticlesTable data={articledata} />
                                </Box>
                                <Box gridColumn="span 12">
                                    <UsersTable data={userData} />
                                </Box>
                            </Box>
                        </Box>
                    </ThemeProvider>
                </>)
                }
            </>)}
        </div >
    )
}

export default UserRegistration;
