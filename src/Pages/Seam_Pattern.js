import { Box, Container, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React from 'react'

export default function Seam_Pattern() {
    const columns = [
        {
            accessorKey: 'exisitingSeam',
            header: 'Existing Seam Patterns',
        },
        {
            accessorKey: 'lastUpdated',
            header: 'Last Updated',
        },

    ];
    const data = [
        {
            lastUpdated: 'Dylan',
            exisitingSeam: 'Murray',

        },
        {
            lastUpdated: 'Raquel',
            exisitingSeam: 'Kohler',

        },
        {
            lastUpdated: 'Ervin',
            exisitingSeam: 'Reinger',

        },
        {
            lastUpdated: 'Brittany',
            exisitingSeam: 'McCullough',

        },
        {
            lastUpdated: 'Branson',
            exisitingSeam: 'Frami',

        },
    ];

    return (
        <div>
            <Box sx={{ width: 1 }} marginTop={'1%'}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 12">
                        <Box sx={{ marginY: '1%' }} >
                            <Typography variant={'h6'} >Number and Name for new Seam Pattern</Typography>
                        </Box>
                        <MaterialReactTable
                            columns={columns}
                            data={data}
                            enableRowSelection
                            enableColumnOrdering
                        // enableColumnPinning
                        // enableRowActions
                        // positionActionsColumn='last'
                        // renderRowActions={() => {
                        //     return (
                        //         <Box display={'flex'}>
                        //             <IconButton color='primary'>
                        //                 <EditIcon />
                        //             </IconButton>
                        //             <IconButton color='error'>
                        //                 <DeleteIcon />
                        //             </IconButton>
                        //         </Box>
                        //     )

                        // }}
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}
