'use client';

import { useEffect, useState } from "react";
import SensorRealtime from "../Components/sensorRealtime";
import Map from "../Components/map";
import Site from "../Components/dropdownSite";

interface Sensor {
    data: {
        ds_id: string;
        read_value: string | number;
    };
    value_status?: string;
}

interface DataResponse {
    site_id: string;
    nitrogen: Sensor[];
    fosfor: Sensor[];
    kalium: Sensor[];
    tds: {
        data: Sensor["data"][];
    };
    ec: {
        data: Sensor["data"][];
    };
    soil_hum: {
        data: Sensor["data"][];
    };
    soil_ph: Sensor[];
    soil_temp: Sensor[];
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
        console.log("Fetching data for siteId:", siteId);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        fetch(`${API_URL}/api/realtime`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: DataResponse) => {
                console.log("Received data:", jsonData);
                setData(jsonData);
            })
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
                            key={sensor.data.ds_id} // Ensure `data.ds_id` is used
                            sensor={index + 1}
                            suhu={Number(sensor.data.read_value)} // Correctly access `data.read_value`
                            humid={Number(data.soil_hum.data[index]?.read_value) || 0}
                            nitrogen={Number(data.nitrogen[index]?.data.read_value) || 0}
                            fosfor={Number(data.fosfor[index]?.data.read_value) || 0}
                            kalium={Number(data.kalium[index]?.data.read_value) || 0}
                            ph={Number(data.soil_ph[index]?.data.read_value) || 0}
                            ec={Number(data.ec.data[index]?.read_value) || 0}
                            tds={Number(data.tds.data[index]?.read_value) || 0}
                            statusPh={data.soil_ph[index]?.value_status || ""}
                            statusSuhu={data.soil_temp[index]?.value_status || ""}
                            statusNitrogen={data.nitrogen[index]?.value_status || ""}
                            statusFosfor={data.fosfor[index]?.value_status || ""}
                            statusKalium={data.kalium[index]?.value_status || "OK"}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
