import React from 'react'
import Cahaya from "../../assets/Cahaya.svg";

interface indikatorCahayaProps {
    lux: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorCahaya: React.FC<indikatorCahayaProps> = ({ lux, batasAtas, batasBawah}) => {
    const bgColor = 
        lux > batasAtas || lux < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        lux > batasAtas || lux < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Cahaya className={`${bgIcon} w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kecerahan</h5>
                <span className="font-bold text-4xl">{lux} L</span>
            </div>
        </div>
    )
}

export default indikatorCahaya