import type { Metadata } from "next";
import SensorRealtime from "../Components/sensorRealtime";

export const metadata: Metadata = {
    title: "Realtime",
    description: "AgroSmartSystem Realtime",
};

// Dummy data
export const data = [
    {
        sensor: 1,
        suhu: 19,
        humid: 24,
        nitrogen: 30,
        fosfor: 40,
        kalium: 20,
        ph: 7,
        ec: 120,
        tds: 190
    },
    {
        sensor: 2,
        suhu: 25,
        humid: 30,
        nitrogen: 45,
        fosfor: 35,
        kalium: 25,
        ph: 6.5,
        ec: 130,
        tds: 200
    },
    {
        sensor: 3,
        suhu: 22,
        humid: 28,
        nitrogen: 40,
        fosfor: 50,
        kalium: 15,
        ph: 6.8,
        ec: 110,
        tds: 180
    },
    {
        sensor: 4,
        suhu: 27,
        humid: 35,
        nitrogen: 35,
        fosfor: 45,
        kalium: 22,
        ph: 7.2,
        ec: 125,
        tds: 210
    },
    {
        sensor: 5,
        suhu: 20,
        humid: 32,
        nitrogen: 38,
        fosfor: 42,
        kalium: 18,
        ph: 6.7,
        ec: 115,
        tds: 195
    }
];

export default function Realtime() {
    return (
        <div className="p-6">
            <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl max-w-screen-2xl overflow-hidden">
                <img src="/assets/img/Lahan.jpg" alt="gambar lahan" className="object-cover object-center w-full h-full"/>
            </div>
            {data.map((sensorData) => (
                <SensorRealtime 
                    key={sensorData.sensor} // Using sensor ID as key
                    sensor={sensorData.sensor} 
                    suhu={sensorData.suhu} 
                    humid={sensorData.humid} 
                    nitrogen={sensorData.nitrogen} 
                    fosfor={sensorData.fosfor} 
                    kalium={sensorData.kalium} 
                    ph={sensorData.ph} 
                    ec={sensorData.ec} 
                    tds={sensorData.tds} 
                />
            ))}
        </div>
    );
}
