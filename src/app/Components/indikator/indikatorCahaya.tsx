import React from 'react'
import Cahaya from "../../assets/Cahaya.svg";

interface indikatorCahayaProps {
    lux: number;
}

const indikatorCahaya: React.FC<indikatorCahayaProps> = ({ lux }) => {
    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Cahaya className={`text-[#FFF0B4] w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kecerahan</h5>
                <span className="font-bold text-4xl">{lux} L</span>
            </div>
        </div>
    )
}

export default indikatorCahaya