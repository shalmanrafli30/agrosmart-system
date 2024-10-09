import React from 'react';
import Angin from '../../assets/Angin.svg';

interface indikatorKecAnginProps {
    wind: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorKecAngin: React.FC<indikatorKecAnginProps> = ({ wind, batasAtas, batasBawah }) => {
    const bgColor = 
        wind > batasAtas || wind < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        wind > batasAtas || wind < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Angin className={`${bgIcon} w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Angin</h5>
                <span className="font-bold text-4xl">{wind} m/s</span>
            </div>
        </div>
    );
}

export default indikatorKecAngin;
