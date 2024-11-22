'use client';

import { useEffect, useState } from "react";
import Chart from '../Components/Chart';
import Site from "../Components/dropdownSite";

interface SensorData {
    ds_id: string;
    ds_name: string;
}

export default function Page() {
    const [siteId, setSiteId] = useState<string>("SITE001");
    const [dsId, setDsId] = useState<string | null>(null); // State for selected ds_id
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [chartData, setChartData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

    // Fetch Sensor Data Based on Site ID
    useEffect(() => {
        if (!siteId) return;

        const fetchSensorData = async () => {
            setError(null);
            try {
                const response = await fetch(`${API_URL}/api/sensor?site_id=${siteId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch sensor data: ${response.statusText}`);
                }
                const data: SensorData[] = await response.json();
                setSensorData(data);
                if (data.length > 0) {
                    setDsId(data[0].ds_id); // Automatically select the first ds_id
                }
            } catch (error) {
                console.error("Error fetching sensor data:", error);
                setError((error as Error).message);
            }
        };

        fetchSensorData();
    }, [siteId]);

    // Fetch History Data Based on Form Inputs
    const fetchHistoryData = async () => {
        if (!dsId || !startDate || !endDate) {
            setErrorMessage("Please select all required fields.");
            return;
        }

        const requestBody = {
            site_id: siteId,
            ds_id: dsId,
            start_date: startDate,
            end_date: endDate,
        };

        console.log("Request body:", requestBody);

        try {
            const response = await fetch(`${API_URL}/api/riwayat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("Received data:", data);

            if (data.message) {
                setErrorMessage(data.message);
                setChartData(null);
            } else {
                setChartData(data);
                setErrorMessage(null);
            }
        } catch (error) {
            console.error("Error fetching history data:", error);
            setErrorMessage('An error occurred while fetching data.');
            setChartData(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchHistoryData(); // Fetch history data on form submission
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
                <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
            </div>
            <div className="mb-6 text-left">
                <form className="max-w-fit" onSubmit={handleSubmit}>
                    <div className="flex mb-4 w-fit">
                        <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                            Sensor:
                        </span>
                        <select
                            name="ds_id"
                            id="ds_id"
                            className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
                            onChange={(e) => setDsId(e.target.value)}
                            value={dsId || ''}
                        >
                            {sensorData.map((sensor) => (
                                <option key={sensor.ds_id} value={sensor.ds_id}>
                                    {sensor.ds_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-5 mb-4">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                From:
                            </span>
                            <input
                                type="datetime-local"
                                name="start_date"
                                className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <span className="font-bold text-2xl">-</span>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                To:
                            </span>
                            <input
                                type="datetime-local"
                                name="end_date"
                                className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="bg-primary text-black font-semibold text-sm rounded-md p-3 cursor-pointer hover:bg-secondary w-2/12" />
                </form>
            </div>

            {errorMessage && (
                <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                    {errorMessage}
                </div>
            )}

            {chartData && (
            <Chart
                data={chartData}
                sensorName={sensorData.find((sensor) => sensor.ds_id === dsId)?.ds_name || 'Unknown'}
            />
            )}

        </div>
    );
}
