import React from 'react';
import IndikatorSuhu from './indikator/indikatorSuhu';
import IndikatorKelembapan from './indikator/indikatorKelembapan';
import IndikatorNitrogen from './indikator/indikatorNitrogen';
import IndikatorFosfor from './indikator/indikatorFosfor';
import IndikatorKalium from './indikator/indikatorKalium';
import IndikatorPh from './indikator/indikatorPh';
import IndikatorEc from './indikator/indikatorEC';
import IndikatorTds from './indikator/indikatorTDS';

interface SensorRealtimeProps {
    sensor: number;
    suhu: number;
    humid: number;
    nitrogen: number;
    fosfor: number;
    kalium: number;
    ph: number;
    ec: number;
    tds: number;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ sensor, suhu, humid, nitrogen, fosfor, kalium, ph, ec, tds }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Sensor {sensor}</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                <IndikatorSuhu suhu={suhu} batasAtas={30} batasBawah={20} />
                <IndikatorKelembapan humid={humid} batasAtas={60} batasBawah={30} />
                <IndikatorNitrogen nitrogen={nitrogen} batasAtas={40} batasBawah={20} />
                <IndikatorFosfor fosfor={fosfor} batasAtas={30} batasBawah={15} />
                <IndikatorKalium kalium={kalium} batasAtas={200} batasBawah={100} />
                <IndikatorPh ph={ph} batasAtas={7} batasBawah={5} />
                <IndikatorEc ec={ec} batasAtas={3} batasBawah={1} />
                <IndikatorTds tds={tds} batasAtas={2000} batasBawah={500} />
            </div>
        </div>
    );
};

export default SensorRealtime;
