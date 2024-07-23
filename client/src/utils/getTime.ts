"use client"
export function getTime() : string{
    const now = new Date();
    const options  = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
    };

    return now.toLocaleTimeString('en-US', options as Intl.DateTimeFormatOptions);
}