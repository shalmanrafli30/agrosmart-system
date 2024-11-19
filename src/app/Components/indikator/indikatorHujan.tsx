import React from 'react';
import Hujan from '../../assets/Hujan.svg';

interface indikatorHujanProps {
    rain: number;
}

const indikatorHujan: React.FC<indikatorHujanProps> = ({ rain}) => {
    // const bgColor = 
    //     rain > batasAtas || rain < batasBawah ? 'bg-warning' : 
    //     'bg-primary';

    // const bgIcon =
    //     rain > batasAtas || rain < batasBawah ? 'text-warningSecondary' : 
    //     'text-secondary';

    return (
        <div className={`bg-white border-2 border-[#F0F0F0] w-full h-auto p-4 text-black rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Hujan className={`w-1/3`} />
            </div>
            <div className='relative z-10'>
                <h5 className="mb-3">Curah Hujan</h5>
                <span className="font-bold text-4xl">{rain} mm</span>
            </div>
        </div>
    );
}

export default indikatorHujan;
