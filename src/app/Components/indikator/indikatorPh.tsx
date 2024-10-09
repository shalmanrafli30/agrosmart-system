import React from 'react'
// import Kalium from '../../assets/K.svg';

interface indikatorPhProps {
    ph: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorPh: React.FC<indikatorPhProps> = ({ph, batasAtas, batasBawah}) => {

    const bgColor = 
        ph > batasAtas || ph < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        ph > batasAtas || ph < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            {/* <div className="absolute inset-0 flex items-center justify-end z-0">
                <Kalium className={`${bgIcon} w-1/4`} />
            </div> */}
            <div className='relative z-10'>
                <h5 className="mb-3">pH</h5>
                <span className="font-bold text-4xl">{ph}</span>
            </div>
        </div>
    )
}

export default indikatorPh