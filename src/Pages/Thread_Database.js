import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
export default function Thread_Database() {
    const columns = [
        {
            accessorKey: 'threadBarcode',
            header: 'Thread Barcode',
        },
        {
            accessorKey: 'threadIdNo',
            header: 'Thread ID no.',
        },
        {
            accessorKey: 'nameofThread',
            header: 'Name of Thread',
        },
        {
            accessorKey: 'threadManufature',
            header: 'Thread Manufacture',
        },
    ];
    const data = [
        {
            threadBarcode: 'Dylan',
            threadIdNo: 'Murray',
            nameofThread: '261 Erdman Ford',
            city: 'East Daphne',
            threadManufature: 'Kentucky',
        },
        {
            threadBarcode: 'Raquel',
            threadIdNo: 'Kohler',
            nameofThread: '769 Dominic Grove',
            city: 'Columbus',
            threadManufature: 'Ohio',
        },
        {
            threadBarcode: 'Ervin',
            threadIdNo: 'Reinger',
            nameofThread: '566 Brakus Inlet',
            city: 'South Linda',
            threadManufature: 'West Virginia',
        },
        {
            threadBarcode: 'Brittany',
            threadIdNo: 'McCullough',
            nameofThread: '722 Emie Stream',
            city: 'Lincoln',
            threadManufature: 'Nebraska',
        },
        {
            threadBarcode: 'Branson',
            threadIdNo: 'Frami',
            nameofThread: '32188 Larkin Turnpike',
            city: 'Charleston',
            threadManufature: 'South Carolina',
        },
    ];

    return (
        <div>
            <Box sx={{ width: 1 }} marginTop={'1%'}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 12">
                        <Box sx={{ marginY: '1%' }} display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h6'>Thread Database</Typography>
                            <Button variant='contained' startIcon={<AddIcon />}>New Thread</Button>
                        </Box>
                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            enableRowSelection
                            enableColumnOrdering
                            enableColumnPinning
                            enableRowActions
                            positionActionsColumn='last'
                            renderRowActions={() => {
                                return (
                                    <Box display={'flex'}>
                                        <IconButton color='primary'>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                )

                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
