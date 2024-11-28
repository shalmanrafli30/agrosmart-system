'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Back from '../../Components/backButton';
import Header from "../../Components/header";

export default function EditSensorPage() {
    const [sensorData, setSensorData] = useState({
        ds_id: "",
        ds_name: "",
        dc_normal_value: 0,
        ds_min_norm_value: 0,
        ds_max_norm_value: 0,
        ds_min_value: 0,
        ds_max_value: 0,
        ds_min_val_warn: 0,
        ds_max_val_warn: 0,
        ds_sts: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const sensorId = searchParams.get("id");
    const router = useRouter();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Fetch sensor data when the component loads
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/sensor/${sensorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch sensor data");
                }
                const data = await response.json();
                setSensorData(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        if (sensorId) {
            fetchData();
        }
    }, [sensorId]);

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/sensor/${sensorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sensorData),
            });

            if (!response.ok) {
                throw new Error("Failed to update sensor data");
            }

            alert("Sensor updated successfully!");
            router.push("/sensor"); // Redirect to the sensor list page
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle input changes
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSensorData((prev) => ({
            ...prev,
            [name]: name === "ds_sts" ? Number(value) : value, // Convert ds_sts to number
        }));
    };

    return (
        <section>
            <Header title="Edit Sensor" />
            <div className="p-6">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
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
                                value={loading ? "Saving..." : "Simpan"}
                                className={`${
                                    loading ? "cursor-not-allowed opacity-50" : "hover:bg-kuningCerah"
                                } bg-[#F9B300] text-white rounded-md p-3`}
                                disabled={loading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
