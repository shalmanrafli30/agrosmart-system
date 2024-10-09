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
            <SensorRealtime suhu={19} humid={30} />
        </div>
    )
}