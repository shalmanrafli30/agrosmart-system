import React from 'react';
import IndikatorNitrogen from './indikatorNitrogen';
import IndikatorFosfor from './indikatorFosfor';
import IndikatorKalium from './indikatorKalium';
import IndikatorPh from './indikatorPh';

interface SensorRealtimeProps {
    sensor: number;
    nitrogen: number;
    fosfor: number;
    kalium: number;
    ph: number;
    statusPh: string;
    statusNitrogen: string;
    statusFosfor: string;
    statusKalium: string;
}

const SensorRealtime: React.FC<SensorRealtimeProps> = ({ sensor, nitrogen, fosfor, kalium, ph, statusPh, statusNitrogen, statusFosfor, statusKalium }) => {
    return (
        <div className="mt-5">
            <h3 className="font-bold text-2xl mb-5">Area {sensor}</h3>
            <div className="bg-abu w-full rounded-md grid grid-cols-4 gap-2 p-4">
                <IndikatorPh ph={ph} status={statusPh}/>
                <IndikatorNitrogen nitrogen={nitrogen} />
                <IndikatorFosfor fosfor={fosfor} />
                <IndikatorKalium kalium={kalium} />
            </div>
        </div>
    );
};

export default SensorRealtime;
