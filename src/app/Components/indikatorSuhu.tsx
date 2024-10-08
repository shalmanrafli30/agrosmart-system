import React from 'react';
import Temp from "../assets/suhu.svg";

const indikatorSuhu = ({ suhu }: { suhu: number }) => {
    // Tentukan kelas latar belakang berdasarkan suhu
    const bgColor = 
        suhu > 30 || suhu < 20 ? 'bg-warning' : 
        'bg-primary';

    const bgIcon =
        suhu > 30 || suhu < 20 ? 'text-warningSecondary' : 
        'text-secondary';

    return (
        <div className={`${bgColor} w-full h-auto p-4 text-white rounded-xl relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-end z-0">
                <Temp className={`${bgIcon} w-1/4 mr-2`} />
            </div>
            <div className='relative z-10'> {/* Pastikan z-index untuk konten diatur lebih tinggi */}
                <h5 className="mb-3">Suhu</h5>
                <span className="font-bold text-4xl">{suhu} °C</span>
            </div>
        </div>
    );
}

export default indikatorSuhu;
