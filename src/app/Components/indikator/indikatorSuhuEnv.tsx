import React from 'react';
import Temp from '../../assets/suhu2.svg';

interface indikatorSuhuProps {
    suhu: number;
}

const indikatorSuhuEnv: React.FC<indikatorSuhuProps> = ({ suhu }) => {
    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Temp className={`w-1/5 mr-2`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Suhu</h5>
                <span className="font-bold text-4xl">{suhu} °C</span>
            </div>
        </div>
    );
}

export default indikatorSuhuEnv;
