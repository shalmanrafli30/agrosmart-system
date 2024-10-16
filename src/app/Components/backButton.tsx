"use client";

import { useRouter } from 'next/navigation';

export default function ClientAreaComponent({ route }: { route: string }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <input type="button" value="Kembali" className="bg-darkCustom text-white rounded-md p-3 cursor-pointer hover:bg-sky-950 " onClick={handleClick}/>
    );
}
