'use client'

import type { Metadata } from "next";
import AddArea from '../Components/AddButton';
import EditPlant from '../Components/editData';
import Edit from '../assets/Edit.svg';
import Hapus from '../assets/Hapus.svg';
import Site from "../Components/dropdownSite";
import { useState, useEffect } from 'react';

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

export default function page() {
    const [siteId, setSiteId] = useState<string>("SITE000");
    const [plantData, setPlantData] = useState<PlantData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!siteId) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/api/tanaman?site_id=${siteId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const result = await response.json();
                setPlantData(result.data); // Pastikan mengambil array di dalam 'data'
                console.log(result.data); // Debugging
            } catch (error) {
                console.error("Error fetching plant data:", error);
                setError((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };        
        fetchData();
    }, [siteId]);
    console.log("Rendering with plantData:", plantData);
    return (
        <div className="p-6">
            <Site onSiteChange={(id) => setSiteId(id)} />
            {/* <AddArea route="/area/tambah-area" title="Tambah Area"/> */}
            {/* Table */}
            <div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-base text-left rtl:text-right text-gray-500">
                        <thead className="text-base text-black uppercase bg-abu2 border-2 border-abu3">
                            <tr>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    ID Tanaman
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    ID Device
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Nama Tanaman
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Poktan
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Alamat
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Tanggal Tanam
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Latitude
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Longtitude
                                </th>
                                <th scope="col" className="px-6 py-3 border-r-2 border-abu3">
                                    Aksi
                                </th>
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
                            ) : plantData.length > 0 ? (
                                plantData.map((plant, index) => (
                                    <tr key={index} className="bg-white border-2 border-abu3 text-black">
                                        <td scope="row" className="px-6 py-4 border-r-2 border-abu3 font-normal">
                                            {plant.pl_id}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.dev_id}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_name}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_desc}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_area}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_date_planting}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_lat}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3">
                                            {plant.pl_lon}
                                        </td>
                                        <td className="px-6 py-4 border-r-2 border-abu3 w-2">
                                            <div className="flex space-x-2">
                                                {/* <Edit className="cursor-pointer text-[#F9B300] hover:text-kuningCerah"/> */}
                                                <EditPlant route={`/plant/edit-plant/${plant.pl_id}`} />
                                                {/* <Hapus className="cursor-pointer text-warningSecondary hover:text-warning"/> */}
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
    )
}