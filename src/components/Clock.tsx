import React, { useState, useEffect } from 'react';

const padWithZero = (num: number): string => {
    return num < 10 ? '0' + num : num.toString();
}

const formatTime = (date: Date): string => {
    const hours = padWithZero(date.getHours());
    const minutes = padWithZero(date.getMinutes());
    const seconds = padWithZero(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

const Clock: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(formatTime(new Date()));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>{currentTime}</p>
        </div>
    )
}

export default Clock;
