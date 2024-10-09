import React from 'react';
import IndikatorSuhu from './indikator/indikatorSuhu';
import IndikatorKelembapan from './indikator/indikatorKelembapan';

interface SensorRealtimeProps {
    suhu: number;
    humid: number;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ suhu, humid }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Sensor 1</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                {/* THE CONTENT IS HERE */}
                <IndikatorSuhu suhu={suhu} />
                <IndikatorKelembapan humid={humid} />
                <IndikatorSuhu suhu={suhu} />
                <IndikatorSuhu suhu={suhu} />
                <IndikatorSuhu suhu={suhu} />
                <IndikatorSuhu suhu={suhu} />
                <IndikatorSuhu suhu={suhu} />
                <IndikatorSuhu suhu={suhu} />

            </div>
        </div>
    );
};

export default SensorRealtime;
