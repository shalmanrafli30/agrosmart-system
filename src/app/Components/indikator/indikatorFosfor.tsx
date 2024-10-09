import React from 'react'
import Fosfor from "../../assets/F.svg";

interface indikatorFosforProps {
    fosfor: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorFosfor: React.FC<indikatorFosforProps> = ({ fosfor, batasAtas, batasBawah}) => {
    const bgColor = 
        fosfor > batasAtas || fosfor < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        fosfor > batasAtas || fosfor < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Fosfor className={`${bgIcon} w-1/4`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Fosfor</h5>
                <span className="font-bold text-4xl">{fosfor} P</span>
            </div>
        </div>
    )
}

export default indikatorFosfor