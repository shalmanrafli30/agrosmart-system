import React from 'react'
import EC from '../../assets/EC.svg';

interface indikatorEcProps {
    ec: number;
    status: string;
}

const indikatorEc: React.FC<indikatorEcProps> = ({ ec, status }) => {
    const bgColor = {
        OK: 'bg-primary',
        Warning: 'bg-[#FFD74B]',
        Danger: 'bg-warning',
    }[status];

    const bgIcon = {
        OK: 'text-secondary',
        Warning: 'text-[#FFF0B4]',
        Danger: 'text-warningSecondary',
    }[status];

    const textColor = {
        OK: 'text-white',
        Danger: 'text-white',
        Warning: 'text-black'
    }[status];

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <EC className={`${bgIcon} w-2/5`} />
            </div>
            <div className='relative z-10'>
                <h5 className={`mb-3 ${textColor}`}>EC</h5>
                <span className={`font-bold text-4xl ${textColor}`}>{ec} dS/m</span>
            </div>
        </div>
    )
}

export default indikatorEc