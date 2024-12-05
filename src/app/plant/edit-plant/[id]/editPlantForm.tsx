"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Back from "../../../Components/backButton";

interface PlantData {
    pl_id: string;
    dev_id: string;
    pl_name: string;
    pl_desc: string;
    pl_area: string;
    pl_date_planting: string;
    pl_lat: number;
    pl_lon: number;
}

export default function EditPlantFormClient({plantData: initialPlantData} : {plantData: PlantData}) {
    const [plantData, setPlantData] = useState<PlantData>(initialPlantData);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${API_URL}/api/tanaman/${plantData.pl_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(plantData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update sensor data: ${response.statusText}`)
            }

            alert("Tanaman berhasil diperbarui!");
            router.push("/tanaman")
        } catch (error) {
            console.error("Error memperbarui data tanaman:", error);
            alert("Gagal memperbarui data tanaman.")
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
    
        setPlantData((prevState) => ({
            ...prevState,
            [name]: name === "pl_lat" || name === "pl_lon" ? parseFloat(value) : value,
        }));
    };
    console.log("Data dikirim ke server:", plantData);

    

    return (
        <div className="p-6">
            <div className="mt-6 ml-6 bg-abu p-4">
                <h3 className="mb-5 text-center font-bold text-xl">Edit Area</h3>
                <form onSubmit={handleSubmit} className="max-w-screen-md mx-0 space-y-10">
                    <div id="idPlant" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="idPlant" className="text-black text-base font-bold w-32">ID Tanaman</label>
                        <input
                            type="text"
                            name="pl_id" // Sesuaikan dengan state
                            id="idPlant"
                            className="bg-gray-200 border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_id}
                            required
                            disabled
                        />
                    </div>
                    <div id="idDevice" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="idDevice" className="text-black text-base font-bold w-32">ID Device</label>
                        <input
                            type="text"
                            name="dev_id" // Sesuaikan dengan state
                            id="idDevice"
                            className="bg-gray-200 border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.dev_id}
                            required
                            disabled
                        />
                    </div>
                    <div id="namaPlant" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="namaPlant" className="text-black text-base font-bold w-32">Nama Tanaman</label>
                        <input
                            type="text"
                            name="pl_name" // Sesuaikan dengan state
                            id="namaPlant"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="poktan" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="poktan" className="text-black text-base font-bold w-32">Poktan</label>
                        <input
                            type="text"
                            name="pl_desc" // Sesuaikan dengan state
                            id="poktan"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_desc}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="alamat" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="alamat" className="text-black text-base font-bold w-32">Alamat</label>
                        <input
                            type="text"
                            name="pl_area" // Sesuaikan dengan state
                            id="alamat"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_area}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="plantDateTime" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="plantDateTime" className="text-black text-base font-bold w-32">Tanggal Tanam</label>
                        <input
                            type="datetime-local"
                            name="pl_date_planting" // Sesuaikan dengan state
                            id="plantDateTime"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_date_planting?.slice(0, 16)} // Format datetime-local
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="latitude" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="latitude" className="text-black text-base font-bold w-32">Latitude</label>
                        <input
                            type="number"
                            name="pl_lat" // Sesuaikan dengan state
                            id="latitude"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_lat}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="longitude" className="flex space-x-5 items-center mb-2">
                        <label htmlFor="longitude" className="text-black text-base font-bold w-32">Longitude</label>
                        <input
                            type="number"
                            name="pl_lon" // Sesuaikan dengan state
                            id="longitude"
                            className="bg-white border border-abu3 text-black text-sm w-full p-2"
                            value={plantData.pl_lon}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div id="aksi" className="space-x-5 mt-6">
                        <Back route="/plant" />
                        <input
                            type="submit"
                            value="Simpan"
                            className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer hover:bg-kuningCerah"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}