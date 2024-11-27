import React from 'react'
import Kalium from '../../assets/K.svg';

interface indikatorKaliumProps {
    kalium: number;
}

const indikatorKalium: React.FC<indikatorKaliumProps> = ({ kalium }) => {

    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Kalium className={`text-[#F0F0F0] w-2/5`} />
            </div>
            <div className='relative z-10'>
                <h5 className={`mb-3`}>Kalium</h5>
                <span className={`font-bold text-4xl`}>{kalium} K</span>
            </div>
        </div>
    )
}

export default indikatorKalium