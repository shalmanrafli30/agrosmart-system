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
    statusPh: string;
    statusSuhu: string;
    statusNitrogen: string;
    statusFosfor: string;
    statusKalium: string;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ sensor, suhu, humid, nitrogen, fosfor, kalium, ph, ec, tds, statusPh, statusSuhu, statusNitrogen, statusFosfor, statusKalium }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Sensor {sensor}</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                <IndikatorSuhu suhu={suhu} status={statusSuhu} />
                <IndikatorPh ph={ph} status={statusPh}/>
                <IndikatorNitrogen nitrogen={nitrogen} status={statusNitrogen} />
                <IndikatorFosfor fosfor={fosfor} status={statusFosfor} />
                <IndikatorKalium kalium={kalium} status={statusKalium} />
                <IndikatorKelembapan humid={humid}/>
                <IndikatorEc ec={ec}/>
                <IndikatorTds tds={tds}/>
            </div>
        </div>
    );
};

export default SensorRealtime;
