'use client';

import { useEffect, useState } from "react";
import SensorRealtime from "../Components/sensorRealtime";
import Map from "../Components/map";
import Site from "../Components/dropdownSite";
import Warning from "../Components/warning/anomali"; // Sesuaikan path sesuai dengan struktur proyek Anda

interface ActionMessage {
    sensor_name: string;
    action_message: string;
    status_message: string;
    value_status: string;
}

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
    const [actionMessages, setActionMessages] = useState<ActionMessage[]>([]);

    useEffect(() => {
        if (!siteId) return;

        fetch(`/api/realtime?site_id=${siteId}`, {
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
                setData(jsonData);

                // Deteksi sensor dengan masalah
                const warningSensors: ActionMessage[] = [];
                (["nitrogen", "fosfor", "kalium", "soil_ph", "soil_temp"] as (keyof DataResponse)[]).forEach((key) => {
                    if (Array.isArray(jsonData[key])) {
                        jsonData[key]?.forEach((sensor) => {
                            if (sensor.value_status === "Warning" || sensor.value_status === "Danger") {
                                warningSensors.push({
                                    sensor_name: sensor.sensor_name || key,
                                    action_message: sensor.action_message || "Periksa segera!",
                                    status_message: sensor.status_message,
                                    value_status: sensor.value_status || "Warning",
                                });
                            }
                        });
                    }
                });

                setActionMessages(warningSensors);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [siteId]);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
                <span className="text-right">Update Terakhir: 12121</span>
            </div>
            <div className="flex gap-4 items-start">
                {/* Map */}
                <div className="flex-grow h-[500px] w-2/3 rounded-xl overflow-hidden relative bg-gray-100">
                    <Map />
                </div>

                {/* Notifikasi */}
                <div className="w-1/3 p-4 bg-gray-100 rounded-xl overflow-y-auto max-h-[500px]">
                    <h2 className="text-xl font-bold mb-4 bg-gray-100 w-full">Peringatan</h2>
                    <div className="grid gap-2">
                        {actionMessages.length > 0 ? (
                            actionMessages.map((msg: ActionMessage, index: number) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-md text-white ${
                                        msg.value_status === "Danger" ? "bg-red-600" : "bg-yellow-500"
                                    }`}
                                >
                                    <h4 className="font-bold">{msg.status_message}</h4>
                                    <p>Indikator: {msg.sensor_name}</p>
                                    <p className="mt-4 text-2xl font-bold">Aksi: {msg.action_message}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Semua sensor dalam kondisi baik.</p>
                        )}
                    </div>
                </div>
            </div>



            {data && (
                <div>
                    {data.soil_temp.map((sensor, index) => {
                        const hasSoilHum = !!data.soil_hum?.read_value;
                        const hasNitrogen = index < (data.nitrogen?.length || 0);
                        const hasFosfor = index < (data.fosfor?.length || 0);
                        const hasKalium = index < (data.kalium?.length || 0);
                        const hasSoilPh = index < (data.soil_ph?.length || 0);
                        const hasEc = !!data.ec?.read_value;
                        const hasTds = !!data.tds?.read_value;

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
