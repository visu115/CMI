import { Box, Typography, CircularProgress } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useState, useContext, useMemo } from 'react';
import server from '../server/server.js';
import { commondata } from '../App';

const AlarmTable = () => {
  const { socket, setsocket } = useContext(commondata);
  const [getdata, setGetdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAlarms() {
      const userString = sessionStorage.getItem('user');
      const user = JSON.parse(userString);

      try {
        const response = await server.get('/getAlramMessages', {
          headers: {
            'username': user.user_name,
          },
        });

        const jsonData = response.data;
        console.log('Alarm Data', jsonData);

        setGetdata(jsonData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching alarm data:', error);
        setError('Failed to load alarm data.');
        setLoading(false);
      }
    }

    fetchAlarms();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 's_no',
        header: 'S.No',
        id: 's_no_column',
      },
      {
        accessorKey: 'messages',
        header: 'Alarm Message',
        id: 'messages_column',
        cell: ({ cell }) => (cell.getValue() ? cell.getValue().join(' / ') : ''),
      },
      {
        accessorKey: 'createdAt',
        header: 'Date & Time',
        id: 'createdAt_date_column',
        cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          };
          const formatter = new Intl.DateTimeFormat('en-IN', options);
          return formatter.format(date).replace(',', '');
        },
      },
    ],
    []
  );

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Box sx={{ width: 1 }} marginTop={'1%'}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 12">
            <Box sx={{ marginY: '1%' }}>
              <Typography variant={'h6'}>Alarm Database</Typography>
            </Box>
            <MaterialReactTable
              columns={columns}
              data={getdata}
              enableRowSelection
              enableColumnOrdering
              initialState={{
                sorting: [
                  {
                    id: 'createdAt_date_column',
                    desc: true,
                  },
                ],
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AlarmTable;
