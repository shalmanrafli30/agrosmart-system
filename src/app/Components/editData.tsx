'use client';

import { useRouter } from 'next/navigation';
import Edit from '../assets/Edit.svg';

export default function EditData({ route }: { route: string }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(route);
    };

    return (
        <Edit className="cursor-pointer text-[#F9B300] hover:text-kuningCerah" onClick={handleClick} />
    );
}
