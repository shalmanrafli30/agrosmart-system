import React from 'react';
import IndikatorSuhu from './indikator/indikatorSuhu';
import IndikatorKelembapan from './indikator/indikatorKelembapan';
import IndikatorNitrogen from './indikator/indikatorNitrogen';

interface SensorRealtimeProps {
    suhu: number;
    humid: number;
    nitrogen: number;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ suhu, humid, nitrogen }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Sensor 1</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                {/* THE CONTENT IS HERE */}
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
                <IndikatorKelembapan humid={humid} batasAtas={50} batasBawah={20}/>
                <IndikatorNitrogen nitrogen={nitrogen} batasAtas={40} batasBawah={20} />
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
                <IndikatorSuhu suhu={suhu} batasAtas={50} batasBawah={20}/>
            </div>
        </div>
    );
};

export default SensorRealtime;
