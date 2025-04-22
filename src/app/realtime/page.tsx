'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SensorRealtime from "../Components/sensorRealtime";
import Map from "../Components/map";
import Site from "../Components/dropdownSite";
import Warning from "../Components/warning/anomali";

interface ActionMessage {
    sensor_name: string;
    action_message: string;
    status_message: string;
    value_status: string;
}

interface Sensor {
    sensor: string;
    sensor_name: string;
    read_value: string;
    read_date: string;
    value_status: string;
    status_message: string;
    action_message: string | null;
}

interface DataResponse {
    soil_temp: Sensor[];
    soil_hum: Sensor[];
    soil_ph: Sensor[];
    nitrogen: Sensor[];
    fosfor: Sensor[];
    kalium: Sensor[];
    ec: Sensor[];
    tds: Sensor[];
    salinity: Sensor[];
    last_updated?: string;
}

export default function Realtime() {
    const [siteId, setSiteId] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("selectedSiteId") || null;
        }
        return null;
    });      
    const [data, setData] = useState<DataResponse | null>(null);
    const [actionMessages, setActionMessages] = useState<ActionMessage[]>([]);
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (!token || !user) {
            router.push('/login');
            return;
        }

        if (!siteId || siteId === 'undefined') return;
            const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };

        const fetchRealtime = async () => {
            try {
                const response = await fetch(`${API_URL}/api/realtime?site_id=${siteId}`, {headers});
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const res = await response.json();

                const sensors: Sensor[] = res.sensors || [];
                const groupBy = (prefix: string) => sensors.filter(s => s.sensor.startsWith(prefix));

                const parsed: DataResponse = {
                    soil_temp: groupBy('soil_temp'),
                    soil_hum: groupBy('soil_hum'),
                    soil_ph: groupBy('soil_ph'),
                    nitrogen: groupBy('soil_nitro'),
                    fosfor: groupBy('soil_phos'),
                    kalium: groupBy('soil_pot'),
                    ec: groupBy('soil_con'),
                    tds: groupBy('soil_tds'),
                    salinity: groupBy('soil_salin'),
                    last_updated: res.last_updated,
                };

                setData(parsed);

                const warnings: ActionMessage[] = [];
                sensors.forEach(sensor => {
                if (['Warning', 'Danger'].includes(sensor.value_status)) {
                    warnings.push({
                        sensor_name: sensor.sensor_name,
                        action_message: sensor.action_message || '-',
                        status_message: sensor.status_message,
                        value_status: sensor.value_status,
                    });
                }
                });

                setActionMessages(warnings);
            } catch (err) {
                console.error("Error fetching realtime:", err);
            }
        };

        fetchRealtime();
    }, [siteId]);

    return (
        <div className="p-6">
        <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
            <span className="text-right">Update Terakhir: {data?.last_updated || "Data tidak tersedia"}</span>
        </div>

        <div className="flex gap-4 items-start">
            <div className="flex-grow h-3/5 w-2/5 rounded-xl overflow-hidden relative bg-gray-100">
                <Map />
            </div>

            <div className="w-1/3 p-4 bg-gray-100 rounded-xl overflow-y-auto max-h-[500px]">
            <h2 className="text-xl font-bold mb-4 bg-gray-100 w-full">Peringatan</h2>
            <div className="grid gap-2">
                {actionMessages.length > 0 ? (
                actionMessages.map((msg, index) => (
                    <div
                    key={`${msg.sensor_name}-${index}`}
                    className={`p-4 rounded-md text-white ${
                        msg.value_status === "Danger" ? "bg-red-600" : "bg-yellow-500"
                    }`}
                    >
                        <h4 className="font-bold text-2xl">{msg.status_message}</h4>
                        <p>Indikator: {msg.sensor_name}</p>
                        <p className="mt-4 text-lg font-bold">Aksi: {msg.action_message}</p>
                    </div>
                ))
                ) : (
                <p className="text-gray-600">Semua sensor dalam kondisi baik.</p>
                )}
            </div>
            </div>
        </div>

        {data?.soil_temp.length ? (
            <div className="mt-6">
            {data.soil_temp.map((sensor, index) => (
                <SensorRealtime
                    key={sensor.sensor || `sensor-${index}`}
                    sensor={index + 1}
                    suhu={+sensor.read_value || 0}
                    humid={+data.soil_hum[index]?.read_value || 0}
                    nitrogen={+data.nitrogen[index]?.read_value || 0}
                    fosfor={+data.fosfor[index]?.read_value || 0}
                    kalium={+data.kalium[index]?.read_value || 0}
                    ph={+data.soil_ph[index]?.read_value || 0}
                    ec={+data.ec[index]?.read_value || 0}
                    tds={+data.tds[index]?.read_value || 0}
                    statusSuhu={sensor.value_status || "OK"}
                    statusHumid={data.soil_hum[index]?.value_status || "OK"}
                    statusNitrogen={data.nitrogen[index]?.value_status || "OK"}
                    statusFosfor={data.fosfor[index]?.value_status || "OK"}
                    statusKalium={data.kalium[index]?.value_status || "OK"}
                    statusPh={data.soil_ph[index]?.value_status || "OK"}
                    statusEc={data.ec[index]?.value_status || "OK"}
                    statusTDS={data.tds[index]?.value_status || "OK"}
                />
            ))}
            </div>
        ) : (
            <p className="text-gray-500 mt-6">Belum ada data suhu tanah.</p>
        )}
        </div>
    );
}
