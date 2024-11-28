import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Back from "../../Components/backButton";
import Header from "../../Components/header";

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

async function fetchSensorData(sensorId: string): Promise<SensorData | null> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
        const response = await fetch(`${API_URL}/api/sensor/${sensorId}`, {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch sensor data: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function EditSensorPage({ params }: { params: { id: string } }) {
    const sensorId = params.id;

    const sensorData = await fetchSensorData(sensorId);

    if (!sensorData) {
        return <p className="text-red-500">Failed to fetch sensor data.</p>;
    }

    return (
        <section>
            <Header title="Edit Sensor" />
            <Suspense fallback={<p>Loading...</p>}>
                <EditSensorForm sensorData={sensorData} />
            </Suspense>
        </section>
    );
}

function EditSensorForm({ sensorData: initialSensorData }: { sensorData: SensorData }) {
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
            console.error(error);
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
        <form onSubmit={handleSubmit} className="max-w-screen-md mx-0 space-y-10">
            <div className="mt-6 ml-6 bg-abu p-4">
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
                <div className="space-x-5 mt-6">
                    <Back route="/sensor" />
                    <input
                        type="submit"
                        value="Simpan"
                        className="bg-[#F9B300] text-white rounded-md p-3"
                    />
                </div>
            </div>
        </form>
    );
}
