import React from 'react';
import Temp from '../../assets/suhu.svg';

interface indikatorSuhuProps {
    suhu: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorSuhu: React.FC<indikatorSuhuProps> = ({ suhu, batasAtas, batasBawah }) => {
    const bgColor = 
        suhu > batasAtas || suhu < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        suhu > batasAtas || suhu < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Temp className={`${bgIcon} w-1/5 mr-2`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Suhu</h5>
                <span className="font-bold text-4xl">{suhu} °C</span>
            </div>
        </div>
    );
}

export default indikatorSuhu;
