"use client"
import { getTime } from '@/utils/getTime';
import React, { useState, useEffect } from 'react';

const useTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(getTime());
    const intervalId = setInterval(() => {
      setCurrentTime(getTime());
    }, 60000); 

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
};

export default useTime;
