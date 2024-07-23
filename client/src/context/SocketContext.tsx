"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
  off: (event: string, callback?: (data: any) => void) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children : React.ReactNode }> = ({ children }) => {
  const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "";
  const [socket, setSoket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);
    setSoket(socket);

    return () => {
      socket.disconnect();
    };
  }, [url]);

  const on = (event: string, callback: (data: any) => void) => {
    socket?.on(event, callback);
  };

  const emit = (event: string, data: any) => {
    socket?.emit(event, data);
  };

  const off = (event: string, callback?: (data: any) => void) => {
    socket?.off(event, callback);
  };

  return (
    <SocketContext.Provider value={{ socket, on, emit, off }}>
      {children}
    </SocketContext.Provider>
  );
};
