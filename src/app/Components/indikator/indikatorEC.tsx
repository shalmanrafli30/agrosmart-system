import React from 'react'
import EC from '../../assets/EC.svg';

interface indikatorEcProps {
    ec: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorEc: React.FC<indikatorEcProps> = ({ec, batasAtas, batasBawah}) => {

    const bgColor = 
        ec > batasAtas || ec < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        ec > batasAtas || ec < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <EC className={`${bgIcon} w-2/5`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">EC</h5>
                <span className="font-bold text-4xl">{ec} dS/m</span>
            </div>
        </div>
    )
}

export default indikatorEc