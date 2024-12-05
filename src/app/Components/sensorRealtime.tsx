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
    statusHumid: string;
    statusEc: string;
    statusTDS: string;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ sensor, suhu, humid, nitrogen, fosfor, kalium, ph, ec, tds, statusPh, statusSuhu, statusNitrogen, statusFosfor, statusKalium, statusHumid, statusEc, statusTDS }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Area {sensor}</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                <IndikatorSuhu suhu={suhu} status={statusSuhu} />
                <IndikatorPh ph={ph} status={statusPh}/>
                <IndikatorNitrogen nitrogen={nitrogen} status={statusNitrogen}/>
                <IndikatorFosfor fosfor={fosfor} status={statusFosfor}/>
                <IndikatorKalium kalium={kalium} status={statusKalium}/>
                <IndikatorKelembapan humid={humid} status={statusHumid}/>
                <IndikatorEc ec={ec} status={statusEc}/>
                <IndikatorTds tds={tds} status={statusTDS}/>
            </div>
        </div>
    );
};

export default SensorRealtime;
