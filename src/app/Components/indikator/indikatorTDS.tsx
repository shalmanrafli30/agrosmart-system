import React from 'react'
import TDS from '../../assets/TDS.svg';

interface indikatorTdsProps {
    tds: number;
}

const indikatorTds: React.FC<indikatorTdsProps> = ({ tds }) => {
    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <TDS className={`text-[#F0F0F0] w-2/4`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">TDS</h5>
                <span className="font-bold text-4xl">{tds} ppm</span>
            </div>
        </div>
    )
}

export default indikatorTds