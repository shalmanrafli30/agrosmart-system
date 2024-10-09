import React from 'react'
// import Kalium from '../../assets/K.svg';

interface indikatorTdsProps {
    tds: number;
    batasAtas: number;
    batasBawah: number;
}

const indikatorTds: React.FC<indikatorTdsProps> = ({tds, batasAtas, batasBawah}) => {

    const bgColor = 
        tds > batasAtas || tds < batasBawah ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        tds > batasAtas || tds < batasBawah ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            {/* <div className="absolute inset-0 flex items-center justify-end z-0">
                <Kalium className={`${bgIcon} w-1/4`} />
            </div> */}
            <div className='relative z-10'>
                <h5 className="mb-3">TDS</h5>
                <span className="font-bold text-4xl">{tds} ppm</span>
            </div>
        </div>
    )
}

export default indikatorTds