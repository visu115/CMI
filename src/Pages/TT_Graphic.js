import { Button, Card, CardContent, FormControl, Grid, MenuItem, Select, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts';
import React from 'react'

function TT_Graphic() {

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = [
        '0',
        '8',
        '16',
        '32',
        '64',
        '128',
        '256',
    ];

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={2}>
                            <Typography>SAB Seam Section No :</Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={'SAB Seam Section No 1'}>SAB Seam Section No 1</MenuItem>
                                    <MenuItem value={'SAB Seam Section No 2'}>SAB Seam Section No 2</MenuItem>
                                    <MenuItem value={'SAB Seam Section No 3'}>SAB Seam Section No 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={2}>
                            <Typography>Thread Tension Minimum</Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={'453 cN'}>453 cN</MenuItem>
                                    <MenuItem value={'355 cN'}>355 cN</MenuItem>
                                    <MenuItem value={'123 cN'}>123 cN</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={2}>
                            <Typography>Thread Tension Maximum</Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={'234 cN'}>234 cN</MenuItem>
                                    <MenuItem value={'245 cN'}>245 cN</MenuItem>
                                    <MenuItem value={'574 cN'}>574 cN</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={2}>
                            <Typography>Avg Thread Tension Value</Typography>
                        </Grid>
                        <Grid item xl={4}>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={'219.98 cN'}>219.98 cN</MenuItem>
                                    <MenuItem value={'223.9 cN'}>223.9 cN</MenuItem>
                                    <MenuItem value={'332.21 cN'}>332.21 cN</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={5} marginTop={'1%'}>
                        <Grid item>
                            <Button variant='contained'>Open File</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Previous Section</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Next Section</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Draw</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Save</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Print</Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained'>Close</Button>
                        </Grid>
                    </Grid>
                    <Card sx={{ backgroundColor: '#E5E4E2', marginTop: '2%' }}>
                        <Grid container>
                            <Grid item xl={12} lg={12} xs={12}>
                                <LineChart
                                    // width={}
                                    height={600}
                                    series={[
                                        { data: pData, label: 'pv', yAxisKey: 'leftAxisId' },
                                        { data: uData, label: 'uv', yAxisKey: 'rightAxisId' },
                                    ]}
                                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                                    yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                                    rightAxis="rightAxisId"
                                />
                            </Grid>
                        </Grid>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}

export default TT_Graphic
