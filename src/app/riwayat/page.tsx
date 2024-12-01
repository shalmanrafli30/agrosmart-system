"use client";

import { useEffect, useState } from "react";
// import Chart from "../Components/Chart";
import Site from "../Components/dropdownSite";
import Select from "react-select";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("../Components/Chart"), { ssr: false });

interface SensorData {
    ds_id: string;
    ds_name: string;
}

export default function RiwayatPage() {
    const [siteId, setSiteId] = useState<string>("SITE001");
    const [selectedSensors, setSelectedSensors] = useState<{ value: string; label: string }[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [chartData, setChartData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch Sensor Data Based on Site ID
    useEffect(() => {
        if (!siteId) return;

        const fetchSensorData = async () => {
            try {
                const response = await fetch(`/api/sensor?site_id=${siteId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch sensor data: ${response.statusText}`);
                }
                const data: SensorData[] = await response.json();
                setSensorData(data);
            } catch (err) {
                console.error("Error fetching sensor data:", err);
                setError((err as Error).message);
            }
        };

        fetchSensorData();
    }, [siteId]);

    // Fetch History Data Based on Form Inputs
    const fetchHistoryData = async () => {
        if (selectedSensors.length === 0 || !startDate || !endDate) {
            setErrorMessage("Please select all required fields.");
            return;
        }

        const requestBody = {
            site_id: siteId,
            sensors: selectedSensors.map((sensor) => sensor.value),
            start_date: startDate,
            end_date: endDate,
        };

        try {
            const response = await fetch(`${API_URL}/api/riwayat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            if (data.message) {
                setErrorMessage(data.message);
                setChartData(null);
            } else {
                setChartData(data);
                setErrorMessage(null);
            }
        } catch (err) {
            console.error("Error fetching history data:", err);
            setErrorMessage("An error occurred while fetching data.");
            setChartData(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchHistoryData();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
                <span className="text-right">Update Terakhir: 1212</span>
            </div>
            <form onSubmit={handleSubmit} className="max-w-fit">
                <div className="mb-4">
                    <span className="block text-sm font-semibold mb-2">Sensor:</span>
                    <Select
                        isMulti
                        options={sensorData.map((sensor) => ({
                            value: sensor.ds_id,
                            label: sensor.ds_name,
                        }))}
                        value={selectedSensors}
                        onChange={(selectedOptions) => setSelectedSensors(selectedOptions as any)}
                        className="w-full"
                    />
                </div>
                <div className="flex items-center space-x-5 mb-4">
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                            Dari:
                        </span>
                        <input
                            type="date"
                            name="start_date"
                            className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <span className="font-bold text-2xl">-</span>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                            Ke:
                        </span>
                        <input
                            type="date"
                            name="end_date"
                            className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary text-black font-semibold text-sm rounded-md p-3 hover:bg-secondary w-2/12"
                >
                    Submit
                </button>
            </form>

            {errorMessage && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{errorMessage}</div>}

            {chartData && <Chart data={chartData} sensorName={selectedSensors.map((sensor) => sensor.label).join(", ")} />}
        </div>
    );
}
