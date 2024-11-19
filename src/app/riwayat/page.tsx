'use client'

import { useEffect, useState } from "react";
import Chart from '../Components/Chart';
import Site from "../Components/dropdownSite";

export default function Page() {
    const [siteId, setSiteId] = useState<string>("SITE001");
    const [area, setArea] = useState<string>("AREA001");
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [chartData, setChartData] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk menyimpan pesan error

    const fetchData = async () => {
        // Log body yang akan dikirim
        const requestBody = {
            site_id: siteId,
            area_id: area,
            start_date: startDate,
            end_date: endDate,
        };
    
        console.log("Request body:", requestBody);  // Menampilkan body yang akan dikirim
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/riwayat`, {
                method: 'POST', // Menggunakan metode POST
                headers: {
                    'Content-Type': 'application/json', // Mengirim data dalam format JSON
                },
                body: JSON.stringify(requestBody), // Mengirim body sebagai JSON
            });
    
            const data = await response.json();
            console.log("Received data:", data); // Menampilkan data yang diterima dari API
    
            if (data.message) {
                // Jika ada pesan error, simpan ke state errorMessage
                setErrorMessage(data.message);
                setChartData(null); // Menghapus data chart jika ada error
            } else {
                setChartData(data); // Menyimpan data untuk digunakan di komponen Chart
                setErrorMessage(null); // Menghapus pesan error jika data berhasil diterima
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage('Terjadi kesalahan saat mengambil data.'); // Menyimpan error general jika fetch gagal
            setChartData(null); // Menghapus data chart jika terjadi error
        }
    };

    // Menambahkan event handler untuk form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Mencegah form untuk mengirim otomatis
        if (startDate && endDate) {
            fetchData(); // Panggil fetchData hanya saat form disubmit
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center w-full mb-4">
                <Site onSiteChange={(id) => setSiteId(id)} />
                <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
            </div>
            <div className="mb-6 text-left">
                <form className="max-w-fit" onSubmit={handleSubmit}>
                    <div className="flex mb-4 w-fit">
                        <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                            Area:
                        </span>
                        <select name="area" id="area" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent" onChange={(e) => setArea(e.target.value)}>
                            <option value="AREA001">Lingkungan</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-5 mb-4">
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                Dari:
                            </span>
                            <input type="datetime-local" name="dari" id="" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent" onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <span className="font-bold text-2xl">-</span>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
                                Ke:
                            </span>
                            <input type="datetime-local" name="dari" id="" className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent" onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <input type="submit" value="Kirim" className="bg-primary text-black font-semibold text-sm rounded-md p-3 cursor-pointer hover:bg-secondary w-2/12"/>
                </form>
            </div>

            {/* Menampilkan pesan error jika ada */}
            {errorMessage && (
                <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                    {errorMessage}
                </div>
            )}

            {/* Pass data to chart component */}
            {chartData && <Chart data={chartData} />}
        </div>
    );
}
