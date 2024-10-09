import React from 'react'
import Kalium from '../../assets/K.svg';

interface indikatorKaliumProps {
    kalium: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorKalium: React.FC<indikatorKaliumProps> = ({kalium, batasAtas, batasBawah}) => {

    const bgColor = 
        kalium > batasAtas || kalium < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        kalium > batasAtas || kalium < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Kalium className={`${bgIcon} w-1/4`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Kalium</h5>
                <span className="font-bold text-4xl">{kalium} N</span>
            </div>
        </div>
    )
}

export default indikatorKalium