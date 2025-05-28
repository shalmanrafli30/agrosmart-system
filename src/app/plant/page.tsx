"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditPlant from '../Components/editData';
import Site from "../Components/dropdownSite";
import Edit from '../assets/Edit.svg';

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

export default function TanamanPage() {
  const [plantData, setPlantData] = useState<PlantData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // 🔒 Redirect jika belum login
    if (!token || !user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/api/tanaman`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        setPlantData(result.data || []);
      } catch (error) {
        console.error("Error fetching plant data:", error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="p-6">
      <div className="relative overflow-x-auto">
        <table className="w-full text-base text-left rtl:text-right text-gray-500">
          <thead className="text-base text-black uppercase bg-abu2 border-2 border-abu3">
            <tr>
              <th className="px-6 py-3 border-r-2 border-abu3">ID Tanaman</th>
              <th className="px-6 py-3 border-r-2 border-abu3">ID Device</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Nama Tanaman</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Deskripsi</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Lokasi</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Tanggal Tanam</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Latitude</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Longitude</th>
              <th className="px-6 py-3 border-r-2 border-abu3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={9} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={9} className="px-6 py-4 text-center text-red-500">{error}</td></tr>
            ) : plantData.length > 0 ? (
              plantData.map((plant, index) => (
                <tr key={index} className="bg-white border-2 border-abu3 text-black">
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_id}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.dev_id}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_name}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_desc}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_area}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_date_planting}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_lat}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3">{plant.pl_lon}</td>
                  <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                    <div className="flex space-x-2">
                      <EditPlant route={`/plant/edit-plant/${plant.pl_id}`} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={9} className="px-6 py-4 text-center">No Data Available</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
