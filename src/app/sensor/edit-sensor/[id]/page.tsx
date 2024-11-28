import { Suspense } from "react";
import Header from "../../../Components/header";
import EditSensorFormClient from "./editSensorForm";

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

// Fungsi untuk mengambil data sensor dari API
async function fetchSensorData(sensorId: string): Promise<SensorData | null> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/api/sensor/${sensorId}`, {
            cache: "no-store", // Pastikan mendapatkan data terbaru
        });

        if (!response.ok) {
            console.error(`Failed to fetch sensor data. Status: ${response.status}`);
            return null;
        }

        const data: SensorData = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return null;
    }
}

// Halaman utama untuk Edit Sensor
export default async function EditSensorPage({
    params: asyncParams,
}: {
    params: Promise<{ id: string }>;
}) {
    // Tunggu params selesai diproses
    const params = await asyncParams;
    const sensorId = params.id; // Tangkap parameter `id` dari URL

    console.log("Fetching data for sensor ID:", sensorId); // Debug log

    const sensorData = await fetchSensorData(sensorId);

    if (!sensorData) {
        return (
            <section>
                <Header title="Edit Sensor" />
                <p className="text-red-500 text-center mt-4">
                    Sensor with ID "{sensorId}" not found. Please check the ID or try again later.
                </p>
            </section>
        );
    }

    return (
        <section>
            <Header title="Edit Sensor" />
            <Suspense fallback={<p>Loading...</p>}>
                <EditSensorFormClient sensorData={sensorData} />
            </Suspense>
        </section>
    );
}
