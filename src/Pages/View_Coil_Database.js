import { Box, Container, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React from 'react'

export default function View_Coil_Database() {
    const columns = [
        {
            accessorKey: 'spoolNo',
            header: 'Spools no.',
        },
        {
            accessorKey: 'threadBarcode',
            header: 'Thread Barcode',
        },
        {
            accessorKey: 'bobbinInformation',
            header: 'Bobbin Winder Informtion',
        },
        {
            accessorKey: 'insertionInformation',
            header: 'Insertion Information',
        },
    ];
    const data = [
        {
            threadBarcode: 'Dylan',
            spoolNo: 'Murray',
            bobbinInformation: '261 Erdman Ford',
            insertionInformation: 'Kentucky',
        },
        {
            threadBarcode: 'Raquel',
            spoolNo: 'Kohler',
            bobbinInformation: '769 Dominic Grove',
            insertionInformation: 'Ohio',
        },
        {
            threadBarcode: 'Ervin',
            spoolNo: 'Reinger',
            bobbinInformation: '566 Brakus Inlet',
            insertionInformation: 'West Virginia',
        },
        {
            threadBarcode: 'Brittany',
            spoolNo: 'McCullough',
            bobbinInformation: '722 Emie Stream',
            insertionInformation: 'Nebraska',
        },
        {
            threadBarcode: 'Branson',
            spoolNo: 'Frami',
            bobbinInformation: '32188 Larkin Turnpike',
            insertionInformation: 'South Carolina',
        },
    ];

    return (
        <div>
            <Box sx={{ width: 1 }} marginTop={'1%'}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 12">
                        <Box sx={{ marginY: '1%' }} >
                            <Typography variant={'h6'} >View Coil Database</Typography>
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
