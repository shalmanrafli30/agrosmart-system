import React from 'react'
import Fosfor from "../../assets/F.svg";

interface indikatorFosforProps {
    fosfor: number;
}

const indikatorFosfor: React.FC<indikatorFosforProps> = ({ fosfor }) => {

    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Fosfor className={`text-[#F0F0F0] w-2/5`} />
            </div>
            <div className='relative z-10'>
                <h5 className={`mb-3`}>Fosfor</h5>
                <span className={`font-bold text-4xl`}>{fosfor} P</span>
            </div>
        </div>
    )
}

export default indikatorFosfor