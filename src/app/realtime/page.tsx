'use client';

import { useEffect, useState } from "react";
import SensorRealtime from "../Components/sensorRealtime";
import Map from "../Components/map";
import Site from "../Components/dropdownSite";

interface Sensor {
    sensor: string;
    read_value: string | number;
    read_date: string | null;
    value_status?: string;
    status_message?: string;
    action_message?: string;
    sensor_name?: string;
}

interface DataResponse {
    site_id: string;
    nitrogen: Sensor[];
    fosfor: Sensor[];
    kalium: Sensor[];
    tds: {
        read_value: string | number;
        sensor_name?: string;
    };
    ec: {
        read_value: string | number;
        sensor_name?: string;
    };
    soil_hum: {
        read_value: string | number;
        sensor_name?: string;
    };
    soil_ph: Sensor[];
    soil_temp: Sensor[];
}

export default function Realtime() {
    const [siteId, setSiteId] = useState<string>("SITE001");
    const [data, setData] = useState<DataResponse | null>(null);

    useEffect(() => {
        if (!siteId) return;
        console.log("Fetching data for siteId:", siteId);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

        fetch(`${API_URL}/api/realtime?site_id=${siteId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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
                <span className="text-right">Update Terakhir: 12121</span>
            </div>
            <div className="bg-gray-600 flex-grow-[3] h-[500px] rounded-xl max-w-screen-2xl overflow-hidden">
                <Map />
            </div>
            {data && (
                <div>
                    {data.soil_temp.map((sensor, index) => {
                        // Validasi panjang array atau objek tunggal
                        const hasSoilHum = !!data.soil_hum?.read_value; // soil_hum adalah objek tunggal
                        const hasNitrogen = index < (data.nitrogen?.length || 0);
                        const hasFosfor = index < (data.fosfor?.length || 0);
                        const hasKalium = index < (data.kalium?.length || 0);
                        const hasSoilPh = index < (data.soil_ph?.length || 0);
                        const hasEc = !!data.ec?.read_value; // ec adalah objek tunggal
                        const hasTds = !!data.tds?.read_value; // tds adalah objek tunggal

                        return (
                            <SensorRealtime
                                key={sensor.sensor}
                                sensor={index + 1}
                                suhu={Number(sensor.read_value) || 0}
                                humid={hasSoilHum ? Number(data.soil_hum.read_value) : 0}
                                nitrogen={hasNitrogen ? Number(data.nitrogen[index]?.read_value) : 0}
                                fosfor={hasFosfor ? Number(data.fosfor[index]?.read_value) : 0}
                                kalium={hasKalium ? Number(data.kalium[index]?.read_value) : 0}
                                ph={hasSoilPh ? Number(data.soil_ph[index]?.read_value) : 0}
                                ec={hasEc ? Number(data.ec.read_value) : 0}
                                tds={hasTds ? Number(data.tds.read_value) : 0}
                                statusPh={hasSoilPh ? data.soil_ph[index]?.value_status || "" : ""}
                                statusSuhu={sensor.value_status || ""}
                                statusNitrogen={hasNitrogen ? data.nitrogen[index]?.value_status || "" : ""}
                                statusFosfor={hasFosfor ? data.fosfor[index]?.value_status || "" : ""}
                                statusKalium={hasKalium ? data.kalium[index]?.value_status || "OK" : "OK"}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
