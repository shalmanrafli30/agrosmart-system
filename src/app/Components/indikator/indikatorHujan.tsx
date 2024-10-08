import React from 'react'
import Hujan from '../../assets/Hujan.svg';


const indikatorHujan = ({ rain }: { rain: number }) => {
    const bgColor = 
        rain > 100 || rain < 50 ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        rain > 100 || rain < 50 ? 'text-warningSecondary' : 
        'text-secondary';
    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Hujan className={`${bgIcon} w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Curah Hujan</h5>
                <span className="font-bold text-4xl">{rain} mm</span>
            </div>
        </div>
    )
}

export default indikatorHujan