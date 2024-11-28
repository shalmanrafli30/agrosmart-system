"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Back from "../../../Components/backButton";

interface SensorData {
    ds_id: string;
    ds_name: string;
    dc_normal_value: number;
    ds_min_norm_value: number;
    ds_max_norm_value: number;
    ds_min_value: number;
    ds_max_value: number;
    ds_min_val_warn: number;
    ds_max_val_warn: number;
    ds_sts: number;
}

export default function EditSensorFormClient({ sensorData: initialSensorData }: { sensorData: SensorData }) {
    const [sensorData, setSensorData] = useState<SensorData>(initialSensorData);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${API_URL}/api/sensor/${sensorData.ds_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sensorData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update sensor data: ${response.statusText}`);
            }

            alert("Sensor updated successfully!");
            router.push("/sensor");
        } catch (error) {
            console.error("Error updating sensor:", error);
            alert("Failed to update sensor data.");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setSensorData((prevState) => ({
            ...prevState,
            [name]: name === "ds_sts" ? Number(value) : value,
        }));
    };

    return (
        <div className="p-6">
            <div className="mt-6 ml-6 bg-abu p-4">
                <form onSubmit={handleSubmit} className="max-w-screen-md mx-0 space-y-10">
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">ID Sensor</label>
                        <input
                            type="text"
                            name="ds_id"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Label</label>
                        <input
                            type="text"
                            name="ds_name"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Status</label>
                        <select
                            name="ds_sts"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2 font-bold"
                            value={sensorData.ds_sts}
                            onChange={handleChange}
                            required
                        >
                            <option value={1}>Aktif</option>
                            <option value={0}>Tidak Aktif</option>
                        </select>
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Batas Nilai Normal</label>
                        <input
                            type="number"
                            name="dc_normal_value"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.dc_normal_value}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Batas Normal Bawah</label>
                        <input
                            type="number"
                            name="ds_min_norm_value"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_min_norm_value}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Batas Normal Atas</label>
                        <input
                            type="number"
                            name="ds_max_norm_value"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_max_norm_value}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Batas Peringatan Bawah</label>
                        <input
                            type="number"
                            name="ds_min_val_warn"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_min_val_warn}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex space-x-5 items-center mb-2">
                        <label className="text-black text-base font-bold w-32">Batas Peringatan Atas</label>
                        <input
                            type="number"
                            name="ds_max_val_warn"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={sensorData.ds_max_val_warn}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-x-5 mt-6">
                        <Back route="/sensor" />
                        <input
                            type="submit"
                            value="Simpan"
                            className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
