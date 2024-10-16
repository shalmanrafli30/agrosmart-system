"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

interface IndikatorAddButtonProps {
    route: string;
    title: string;
}

const ClientAreaComponent: React.FC<IndikatorAddButtonProps> = ({ route, title }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <div className="text-end my-6">
            <span 
                className="bg-primary text-white p-4 rounded-md text-lg font-bold hover:bg-secondary cursor-pointer"
                onClick={handleClick}
            >
                {title}
            </span>
        </div>
    );
};

export default ClientAreaComponent;
