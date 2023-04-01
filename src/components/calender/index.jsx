import { Paper } from '@mui/material';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender.css';

function MyApp() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Paper
        className={'calender'}
        sx={{display: 'flex', justifyContent: 'center'}}
      >
      <Calendar 
        className={'mainCalender'}
        onChange={onChange} 
        value={value}
      />
      </Paper>
    </div>
  );
}

export default MyApp