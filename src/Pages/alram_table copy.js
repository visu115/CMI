import { Box, Container, Typography } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import React, { useEffect, useState,useContext,useMemo } from 'react';
import server from '../server/server.js';
import { commondata } from '../App';
import { render } from '@testing-library/react';

const AlramTable = () => {  // Updated component name to start with uppercase

    const { socket, setsocket } = useContext(commondata);
    const [getdata, setGetdata] = useState([]);  // State to store alarm data
    const [loading, setLoading] = useState(true);

   // Fetch alarm data from the backend
   useEffect(() => {
    async function fetchAlarms() {

        var userString = sessionStorage.getItem('user');
var user = JSON.parse(userString);

        try {
            const response = await server.get('/getAlramMessages', {
                headers: {
                    'username': user.user_name  // Include username in headers
                }
            });
            
            
            const jsonData = response.data;
            console.log("Alarm Data", jsonData);
            
            setGetdata(jsonData);  // Set the fetched data to state
            setLoading(false);  // Disable loading once data is fetched
        } catch (error) {
            console.error("Error fetching alarm data:", error);
            setLoading(false);
        }
    }

    fetchAlarms();
}, []);  // Empty dependency array means this runs once

    
const columns = useMemo(
    () => [
      {
        accessorKey: 's_no', // Access the serial number from the API response
        header: 'S.No',
        id: 's_no_column', // Unique ID for this column
      },
      {
        accessorKey: 'messages', // Access the messages from the API response
        header: 'Alarm Message',
        id: 'messages_column', // Unique ID for this column
        cell: ({ cell }) => (cell.getValue() ? cell.getValue().join(' / ') : ''), // Join messages array with '/'
      },
      {
        accessorKey: 'createdAt', // Access the createdAt (Date & Time)
        header: 'Date & Time',
        id: 'createdAt_date_column', // Unique ID for this column
        cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          };
          const formatter = new Intl.DateTimeFormat('en-IN', options);
          return formatter.format(date).replace(',', ''); // Format the date and time in IST
        },
      },
    ],
    []
  );  

// Display loading state while fetching data
if (loading) {
    return <Typography>Loading...</Typography>;
}
    return (
        <div>
            <Box sx={{ width: 1 }} marginTop={'1%'}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 12">
                        <Box sx={{ marginY: '1%' }} >
                            <Typography variant={'h6'} >Alarm Database</Typography>
                        </Box>
                        <MaterialReactTable
                           columns={columns}
                           data={getdata} 
                            enableRowSelection
                            enableColumnOrdering
                        />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AlramTable