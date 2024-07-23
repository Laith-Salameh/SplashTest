"use client"

import React from 'react';

interface TitleLayoutProps {
    title: string;
    iconSrc: string;
    children: React.ReactNode;
}

const TitleLayout: React.FC<TitleLayoutProps> = ({ title, iconSrc, children }) => {
    return (
        <div className='flex flex-col'>
            <div className="flex mb-4 ml-2 w-full gap-4">
                {iconSrc && <img className="w-[30px] aspect-square" src={iconSrc} alt="title" />}
                <h3 className="text-lg font-medium text-white">{title}</h3>
            </div>
            <div className='w-full h-full'>
                {children}
            </div>

        </div>

    );
};

export default TitleLayout;
