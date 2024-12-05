'use client';

import AddSensor from '../Components/AddButton';
import EditSensor from '../Components/editData';
import Hapus from '../assets/Hapus.svg';
import Header from "../Components/header";
import Site from "../Components/dropdownSite";
import { useState, useEffect } from 'react';

interface SensorData {
    ds_id: string;
    ds_name: string;
    dc_normal_value: number;
    ds_min_norm_value: number;
    ds_max_norm_value: number;
    ds_min_val_warn: number;
    ds_max_val_warn: number;
    ds_sts: number;
}

export default function Page() {
    const [siteId, setSiteId] = useState<string>("SITE000");
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!siteId) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null); // Reset error state before fetching
            try {
                const response = await fetch(`${API_URL}/api/sensor?site_id=${siteId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data: SensorData[] = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [siteId]); // Re-run fetch when siteId changes

    return (
        <section>
            <Header title="Sensor" />
            <div className="p-6">
                <Site onSiteChange={(id) => setSiteId(id)} />
                {/* <AddSensor route="/sensor/tambah-sensor" title="Tambah Sensor" /> */}
                <div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-base text-left rtl:text-right text-gray-500">
                            <thead className="text-base text-black uppercase bg-abu2 border-2 border-abu3">
                                <tr>
                                    <th className="px-6 py-3 border-r-2 border-abu3">ID Sensor</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Label</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Batas Nilai Normal</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Batas Normal Bawah</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Batas Normal Atas</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Batas Peringatan Bawah</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Batas Peringatan Atas</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Status</th>
                                    <th className="px-6 py-3 border-r-2 border-abu3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center">Loading...</td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : sensorData.length > 0 ? (
                                    sensorData.map((sensor, index) => (
                                        <tr key={index} className="bg-white border-2 border-abu3 text-black">
                                            <td scope="row" className="px-6 py-4 border-r-2 border-abu3 font-normal">
                                                {sensor.ds_id}
                                            </td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.ds_name}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.dc_normal_value}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.ds_min_norm_value}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.ds_max_norm_value}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.ds_min_val_warn}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">{sensor.ds_max_val_warn}</td>
                                            <td className="px-6 py-4 border-r-2 border-abu3">
                                                {sensor.ds_sts === 1 ? "Aktif" : "Tidak Aktif"}
                                            </td>
                                            <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                                                <div className="flex space-x-2">
                                                    <EditSensor route={`/sensor/edit-sensor/${sensor.ds_id}`} />
                                                    {/* <Hapus className="cursor-pointer text-warningSecondary hover:text-warning" /> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-4 text-center">No Data Available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
