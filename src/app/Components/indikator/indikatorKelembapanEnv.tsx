import React from 'react';
import Humidity from '../../assets/Humidity.svg';

interface indikatorKelembapanProps {
    humid: number;
}

const indikatorKelembapanEnv: React.FC<indikatorKelembapanProps> = ({ humid }) => {
    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Humidity className={`text-[#B4EDFF] w-1/5 mr-2`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kelembapan</h5>
                <span className="font-bold text-4xl">{humid} %H</span>
            </div>
        </div>
    );
}

export default indikatorKelembapanEnv;
