import React from 'react'
import Nitrogen from '../../assets/N.svg';

interface indikatorNitrogenProps {
    nitrogen: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorNitrogen: React.FC<indikatorNitrogenProps> = ({nitrogen, batasAtas, batasBawah}) => {

    const bgColor = 
        nitrogen > batasAtas || nitrogen < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        nitrogen > batasAtas || nitrogen < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Nitrogen className={`${bgIcon} w-1/4`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Nitrogen</h5>
                <span className="font-bold text-4xl">{nitrogen} N</span>
            </div>
        </div>
    )
}

export default indikatorNitrogen