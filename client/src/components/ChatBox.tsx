"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './UI/Button';
import TitleLayout from './UI/TitleLayout';
import { useSocket } from '@/context/SocketContext';
import { useGameStore } from '@/store/store';




const ChatBox: React.FC = () => {
    const { socket} = useSocket();
    const {messages, sendChatMessage, clientInfo}= useGameStore();
    const messageInputRef = useRef<HTMLInputElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        chatContainerRef.current?.scrollTo({ top: chatContainerRef?.current.scrollHeight , behavior: 'smooth' });
    },[chatContainerRef])
    

    const sendMessage = () => {
        const message = messageInputRef.current?.value;
        if (message && socket && clientInfo) {
            sendChatMessage({ userId: clientInfo.userId, message: message }, socket);
            messageInputRef.current.value = '';
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleButtonClick = () => {
        sendMessage();
    }

    return (
        <TitleLayout title="Chat" iconSrc='/images/chat.png'>
            <div ref={chatContainerRef} className="bg-secondary overflow-y-auto px-4 py-2 rounded-tl-md rounded-tr-md h-[180px]">
                {messages.map((message,i) => (
                    <div key={i} className='flex items-center mb-2'>
                        <div className="mr-2 text-primary font-bold">{message.sender}:</div>
                        <div className="p-1 rounded-lg text-sm text-white bg-secondary-200">
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center h-1/5 px-4 py-2 bg-secondary-200 rounded-br-md rounded-bl-md gap-2">
                <input
                    ref={messageInputRef}
                    onKeyDownCapture={handleKeyPress}
                    className="w-[70%] flex-grow bg-black text-white rounded-md p-2"
                    placeholder="Type your message..."
                />
                <Button text="Send" onClick={handleButtonClick} varient='small' />
            </div>
        </TitleLayout>
    );
};

export default ChatBox;
