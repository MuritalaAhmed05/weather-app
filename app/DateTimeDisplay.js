// components/DateTimeDisplay.js
import { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

//   const formatDate = (date) => {
//     return date.toLocaleDateString();
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString();
//   };

const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  return (
    <div>
      <p className='text-wrap'> {formatDate(dateTime)} at {formatTime(dateTime)}</p>
      
    </div>
  );
};

export default DateTimeDisplay;
