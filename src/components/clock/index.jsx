import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import './clock.css'

function MyApp() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={'clockContainer'}>
      <Clock className={'clock'} value={value} />
      <p className={'digitalClock'}>{new Date(value).toLocaleTimeString()}</p>
    </div>
  );
}

export default MyApp