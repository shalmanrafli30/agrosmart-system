import React from 'react';
import Angin from '../../assets/Angin.svg';

interface indikatorKecAnginProps {
    wind: number;
}

const indikatorKecAngin: React.FC<indikatorKecAnginProps> = ({ wind }) => {
    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Angin className={`text-[#F0F0F0] w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kecepatan Angin</h5>
                <span className="font-bold text-4xl">{wind} m/s</span>
            </div>
        </div>
    );
}

export default indikatorKecAngin;
