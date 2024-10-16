"use client";

import { useRouter } from 'next/navigation';

export default function ClientAreaComponent({ route }: { route: string }) {
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
                Tambah Area
            </span>
        </div>
    );
}
