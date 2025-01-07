import React from 'react'
import Image from 'next/image';
import Map from '../assets/Map/Map.svg';
import Alert1 from '../assets/Map/Alert-Sensor1.svg';
import Alert2 from '../assets/Map/Alert-Sensor2.svg';
import Alert3 from '../assets/Map/Alert-Sensor3.svg';
import Alert4 from '../assets/Map/Alert-Sensor4.svg';
import Alert5 from '../assets/Map/Alert-Sensor5.svg';

const map = () => {
    return (
        <div className="relative w-full h-full">
            {/* Background Image (if needed) */}
            <img src="/assets/img/Lahan-cianjur.jpg" alt="gambar lahan" className="object- object-cover" />
            {/* Alert on Map */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <Alert1 className="object-cover object-center" />
            </div> */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <Alert2 className="object-cover object-center" />
            </div> */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <Alert3 className="object-cover object-center" />
            </div> */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <Alert4 className="object-cover object-center" />
            </div> */}
            {/* <div className="absolute inset-0 flex items-center justify-center z-10">
                <Alert5 className="object-cover object-center" />
            </div> */}
        </div>
    )
}

export default map