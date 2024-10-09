import type { Metadata } from "next";
import SensorRealtime from "../Components/sensorRealtime";

export const metadata: Metadata = {
    title: "Realtime",
    description: "AgroSmartSystem Realtime",
};

export default function Realtime() {
    return (
        <div className="p-6">
            <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl max-w-screen-2xl">

            </div>
            <SensorRealtime sensor={1} suhu={19} humid={30} nitrogen={30} fosfor={40} kalium={30} ph={8} ec={100} tds={200}/>
        </div>
    )
}