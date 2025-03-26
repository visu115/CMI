import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import server from '../server/server';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Report = () => {
    const [reportData, setReportData] = useState([]);

    const getReportData = async () => {
        try {
            const res = await server.get('/getAllReport');
            setReportData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReportData();
    }, []);

    const columns = [
        {
            accessorKey: 'date',
            header: 'Date & Time',
            size: 180,
            Cell: ({ row }) => {
                const rawDate = row.original.created_date;
                const formattedDate = new Date(rawDate).toLocaleDateString('en-GB');
                const formattedTime = new Date(rawDate).toLocaleTimeString('en-US', { hour12: true });
                return `${formattedDate} - ${formattedTime}`;
            },
        },
        { accessorKey: 'user_name', header: 'User Name', size: 200 },
        { accessorKey: 'rights', header: 'Rights', size: 120 },
        { accessorKey: 'article_code', header: 'Article Code', size: 120 },
        { accessorKey: 'program_no', header: 'Program No', size: 120 },
    ];

    const exportToExcel = () => {
        if (reportData.length === 0) {
            console.warn("No data available for export");
            return;
        }
        const currentDate = new Date().toLocaleDateString('en-GB');
        const exportData = reportData.map((row) => ({
            Date: new Date(row.created_date).toLocaleDateString('en-GB'),
            Time: new Date(row.created_date).toLocaleTimeString('en-US', { hour12: true }),
            'User Name': row.user_name,
            Rights: row.rights,
            'Article Code': row.article_code,
            'Program No': row.program_no,
            'Seam Number': row.seam_name,
            'Seam Name': row.section_seam_1,
            'Sewing Speed': row.sewing_speed,
            'Thread Tension': row.thread_tension,
            'Code Reader 1': row.codereader1,
            'Code Reader 2': row.codereader2,
            'Code Reader 3': row.codereader3,
            'Code Reader 4': row.codereader4,
            'Code Reader 5': row.codereader5,
            'Foot Height': row.foot_height,
            'Foot Pressure': row.foot_pressure,
            'No of Stiches 1': row.no_stitches1,
            'No of Stiches Max ': row.no_stitches_max1,
            'No of Stiches Min': row.no_stitches_min1,
            'Walkimg Foot Stoke': row.walkimg_fot_stoke,

        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report Data');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataBlob, `${currentDate}_report.xlsx`);
    };

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    mt: 5,
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #f0f4f8 0%, #e6eaf0 100%)',
                    boxShadow: '0 3px 3px 3px rgba(0,0,0,0.1)',
                    // maxWidth: 1200,
                    width: '100%',
                    margin: 'auto'
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Report Overview
                </Typography>

                <Card elevation={3} sx={{ borderRadius: 2 }}>
                    <CardContent>
                        <Grid container justifyContent="end" alignItems="center" mb={2}>
                            <Button variant="contained" color="primary" onClick={exportToExcel}>
                                Export to Excel
                            </Button>
                        </Grid>

                        <Box sx={{ overflowX: 'auto', borderRadius: 1, p: 1, backgroundColor: '#f8f9fa' }}>
                            <MaterialReactTable
                                muiTableBodyRowProps={({ row }) => ({
                                    onClick: () => console.info(row.id),
                                    sx: { cursor: 'pointer' },
                                })}
                                enableDensityToggle={false}
                                enableHiding={false}
                                enableColumnFilters={false}
                                columns={columns}
                                data={reportData}
                                positionToolbarAlertBanner="bottom"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default Report;
