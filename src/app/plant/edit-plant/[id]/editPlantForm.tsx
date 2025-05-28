"use client";

import { useEffect, useState } from "react";
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

export default function EditPlantFormClient({ plantId }: { plantId: string }) {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda belum login.");
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/api/tanaman/${plantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setPlantData(data.data);
        } else {
          alert("Tanaman tidak ditemukan.");
          router.push("/tanaman");
        }
      })
      .catch(() => {
        alert("Gagal mengambil data.");
        router.push("/tanaman");
      })
      .finally(() => setLoading(false));
  }, [plantId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlantData((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "pl_lat" || name === "pl_lon" ? parseFloat(value) : value,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !plantData) return;

    try {
      const res = await fetch(`${API_URL}/api/tanaman/${plantId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(plantData),
      });

      if (!res.ok) throw new Error("Gagal update");
      alert("Berhasil diperbarui.");
      router.push("/plant");
    } catch (err) {
      alert("Terjadi kesalahan saat memperbarui.");
    }
  };

  if (loading || !plantData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="mt-6 ml-6 bg-abu p-4">
        <h3 className="mb-5 text-center font-bold text-xl">Edit Tanaman</h3>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-screen-md">
          {[
            { label: "ID Tanaman", name: "pl_id", disabled: true },
            { label: "ID Device", name: "dev_id", disabled: true },
            { label: "Nama Tanaman", name: "pl_name" },
            { label: "Deskripsi", name: "pl_desc" },
            { label: "Lokasi", name: "pl_area" },
            { label: "Tanggal Tanam", name: "pl_date_planting", type: "datetime-local" },
            { label: "Latitude", name: "pl_lat", type: "number" },
            { label: "Longitude", name: "pl_lon", type: "number" },
          ].map(({ label, name, type = "text", disabled = false }) => (
            <div key={name} className="flex space-x-5 items-center">
              <label htmlFor={name} className="text-black font-bold w-32">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                disabled={disabled}
                value={
                  type === "datetime-local"
                    ? (plantData[name as keyof PlantData] as string)?.slice(0, 16)
                    : plantData[name as keyof PlantData]
                }
                onChange={handleChange}
                className={`border border-abu3 text-sm p-2 w-full ${
                  disabled ? "bg-gray-200" : "bg-white"
                } text-black`}
              />
            </div>
          ))}

          <div className="space-x-5 mt-6">
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
  );
}


