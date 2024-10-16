import React from 'react';
import Peringatan from '../../assets/Warning.svg';

interface AnomaliProps {
    title: string;
    sensor: string;
}

const Tugas: React.FC<AnomaliProps> = ({ title, sensor }) => {
    return (
        <div className="bg-warning w-full rounded-md p-4 text-white">
            <div className='flex space-x-3'>
                <Peringatan className="w-auto h-6 text-white"/>
                <h3 className="font-bold text-2xl mb-6">{title} ({sensor})</h3>
            </div>
            <span className="text-base"> Aksi: 
                <span className="text-lg font-bold">
                    Penyiraman Obat
                </span>
            </span>
        </div>
    );
};

export default Tugas;
