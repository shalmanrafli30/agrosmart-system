import React from 'react'
import Angin from "../../assets/Angin.svg";

const indikatorKecAngin = ({ wind }: { wind: number }) => {
    const bgColor = 
        wind > 15 || wind < 1 ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        wind > 15 || wind < 1 ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Angin className={`${bgIcon} w-1/3 mr-2`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Angin</h5>
                <span className="font-bold text-4xl">{wind} m/s</span>
            </div>
        </div>
    )
}

export default indikatorKecAngin