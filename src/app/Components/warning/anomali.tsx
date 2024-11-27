import React from 'react';
import Peringatan from '../../assets/Warning.svg';

interface AnomaliProps {
    title: string;
    sensor: string;
    aksi: string;
    status: string;
}

const Tugas: React.FC<AnomaliProps> = ({ title, sensor, aksi, status }) => {
    const bgColor = {
        OK: 'bg-primary',
        Warning: 'bg-[#FFD74B]',
        Danger: 'bg-warning',
    }[status];

    const textColor = {
        OK: 'text-white',
        Danger: 'text-white',
        Warning: 'text-black'
    }[status];

    return (
        <div className={`${bgColor} w-full rounded-md p-4 text-white`}>
            <div className='flex space-x-3'>
                <Peringatan className={`${textColor} w-auto h-6`}/>
                <h3 className={`${textColor} font-bold text-2xl mb-6`}>{title} ({sensor})</h3>
            </div>
            <span className={`${textColor} text-base`}> Aksi: 
                <span className={`${textColor} ml-2 text-lg font-bold`}>
                    {aksi}
                </span>
            </span>
        </div>
    );
};

export default Tugas;
