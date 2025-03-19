import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider, useTheme, CssBaseline, Container, Card, Typography, Box, Button } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PrintIcon from '@mui/icons-material/Print';
import ClearIcon from '@mui/icons-material/Clear';

const columns = [
    {
        accessorKey: 'userName',
        header: 'User Name',
    },
    {
        accessorKey: 'personnelNumber',
        header: 'Personnel Number',
    },
    {
        accessorKey: 'accessLevel',
        header: 'Access Level',
    },
    {
        accessorKey: 'lastLoginAt',
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

const UserRegistrationTable = () => {
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

    return (
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
    );
};

export default UserRegistrationTable;
