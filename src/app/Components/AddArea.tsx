"use client";

import { useRouter } from 'next/navigation';

export default function ClientAreaComponent() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/area/tambah-area');
    };

    return (
        <div className="text-end my-6">
            <span 
                className="bg-primary text-white p-4 rounded-md text-lg font-bold hover:bg-secondary cursor-pointer"
                onClick={handleClick}
            >
                Tambah Area
            </span>
        </div>
    );
}
