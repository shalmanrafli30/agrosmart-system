import React from 'react'
import Humidity from "../../assets/Humidity.svg";

const indikatorKelembapan = ({ humid }: { humid: number }) => {
    const bgColor = 
        humid > 60 || humid < 30 ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        humid > 60 || humid < 30 ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Humidity className={`${bgIcon} w-1/4 mr-2`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kelembapan</h5>
                <span className="font-bold text-4xl">{humid} %H</span>
            </div>
        </div>
    )
}

export default indikatorKelembapan