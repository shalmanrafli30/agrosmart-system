'use client';

import { useEffect, useState } from "react";
import SensorRealtime from "../Components/sensorRealtime";
import Map from "../Components/map";
import Site from "../Components/dropdownSite";

interface SensorData {
    ds_id: string;
    read_value: number | string;
    value_status: string;
}

interface DataResponse {
    site_id: string;
    nitrogen: SensorData[];
    fosfor: SensorData[];
    kalium: SensorData[];
    tds: SensorData[];
    ec: SensorData[];
    soil_hum: SensorData[];
    soil_ph: SensorData[];
    soil_temp: SensorData[];
}

export default function Realtime() {
    const [siteId, setSiteId] = useState<string>("SITE001");
    const [data, setData] = useState<DataResponse | null>(null);

    const requestBody = {
        site_id: siteId,
    };

    console.log("Request body:", requestBody);

    useEffect(() => {
        if (!siteId) return;
        fetch(`http://127.0.0.1:8000/api/realtime`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((jsonData: DataResponse) => setData(jsonData))
            .catch((error) => console.error("Error fetching data:", error));
    }, [siteId]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
                <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
            </div>
            <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl max-w-screen-2xl overflow-hidden">
                <Map />
            </div>
            {data && (
                <div>
                    {data.soil_temp.map((sensor, index) => (
                        <SensorRealtime
                            key={sensor.ds_id}
                            sensor={index + 1} // Assign sensor number dynamically
                            suhu={Number(sensor.read_value)}
                            humid={Number(data.soil_hum[index]?.read_value) || 0}
                            nitrogen={Number(data.nitrogen[index]?.read_value) || 0}
                            fosfor={Number(data.fosfor[index]?.read_value) || 0}
                            kalium={Number(data.kalium[index]?.read_value) || 0}
                            ph={Number(data.soil_ph[index]?.read_value) || 0}
                            ec={Number(data.ec[index]?.read_value) || 0}
                            tds={Number(data.tds[index]?.read_value) || 0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
