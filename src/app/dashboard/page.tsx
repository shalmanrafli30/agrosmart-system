'use client'

import { useEffect, useState } from "react";
import IndikatorSuhu from "../Components/indikator/indikatorSuhuEnv";
import IndikatorKelembapan from "../Components/indikator/indikatorKelembapan";
import IndikatorAngin from "../Components/indikator/indikatorKecAngin";
import IndikatorCahaya from "../Components/indikator/indikatorCahaya";
import IndikatorHujan from "../Components/indikator/indikatorHujan";
import Map from "../Components/map";
import Tugas from "../Components/warning/tugas";
import Warning from "../Components/warning/anomali";
import FloatingGallery from "../Components/GalleryModal";
import Site from "../Components/dropdownSite";

export const Tasks = [
  {
    title: "Pemupukan Lanjut",
    date: new Date("2024-11-20")
  }
];

interface Plant {
  pl_id: number;
  pl_name: string;
  pl_desc: string;
  pl_date_planting: string;
  age: number;
  phase: string;
  timeto_harvest: number;
}

interface SensorData {
  read_value: number;
  value_status: string;
}

interface DataResponse {
  site_id: string;
  temperature: SensorData;
  humidity: SensorData;
  wind: SensorData;
  lux: SensorData;
  rain: SensorData;
  plants: Plant[];
}


export default function HomePage() {
  const [siteId, setSiteId] = useState<string>("SITE001");
  const [data, setData] = useState<DataResponse>({
    site_id: "",
    temperature: { read_value: 0, value_status: "" },
    humidity: { read_value: 0, value_status: "" },
    wind: { read_value: 0, value_status: "" },
    lux: { read_value: 0, value_status: "" },
    rain: { read_value: 0, value_status: "" },
    plants: [],
  });

  useEffect(() => {
    if (!siteId) return;
    fetch(`http://127.0.0.1:8000/api/dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ site_id: siteId }), // Send selected site ID in the request body
    })
      .then((response) => response.json())
      .then((jsonData: DataResponse) => setData(jsonData))
      .catch((error) => console.error("Error fetching data:", error));
  }, [siteId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <Site onSiteChange={(id) => setSiteId(id)} />
          <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
      </div>
      <div className="flex gap-2">
        {/* ILUSTRASI LAHAN */}
        <div className="bg-gray-600 h-[500px] rounded-xl w-3/4 overflow-hidden relative">
          {/* <img src="/assets/img/Lahan.jpg" alt="gambar lahan" className="object-cover object-center w-full h-full" /> */}
          <Map />
          <FloatingGallery /> {/* Use the FloatingGallery component here */}
        </div>

        {/* INFO LAHAN */}
        <div className="flex-grow">
          <div className="flex flex-col gap-y-2">
            {/* Tanaman & Umur Tanam - SECTION 1 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex-grow bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Tanaman</h5>
                <span className="font-bold text-xl">{data.plants.length > 0 ? data.plants[0].pl_name : 'Unknown Plant'}</span>
              </div>
              <div className="flex-grow bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Umur Tanam</h5>
                <span className="font-bold text-xl">{data.plants.length > 0 ? `${data.plants[0].age} HST` : 'N/A'}</span>
              </div>
            </div>

            {/* Tanggal Tanam - SECTION 2 */}
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Tanggal Tanam</h5>
              <span className="font-bold text-xl">{data.plants.length > 0 ? data.plants[0].pl_date_planting : 'N/A'}</span>
            </div>

            {/* Fase Tanam - SECTION 3 */}
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Fase Tanam</h5>
              <span className="font-bold text-xl">{data.plants.length > 0 ? data.plants[0].phase : 'N/A'}</span>
            </div>

            {/* Waktu Panen - SECTION 4 */}
            <div className="bg-primary p-2 rounded-md text-white">
              <h5 className="mb-7 font-medium">Waktu Menuju Panen</h5>
              <span className="font-bold text-xl">{data.plants.length > 0 ? `${data.plants[0].timeto_harvest} Hari` : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {/* Indikator */}
        <div className="flex-grow">
          <h5 className="font-bold text-2xl mb-5">Indikator Lingkungan</h5>
          <div className="grid grid-cols-2 gap-2">
            {/* Indikator 1 */}
            <IndikatorSuhu suhu= {data.temperature.read_value} />
            {/* Indikator 2 */}
            <IndikatorKelembapan humid= {data.humidity.read_value} batasAtas={50} batasBawah={20} />
            {/* Indikator 3 */}
            <IndikatorAngin wind= {data.wind.read_value}/>
            {/* Indikator 4 */}
            <IndikatorCahaya lux= {data.lux.read_value} batasAtas={50} batasBawah={20} />
            {/* Indikator 5 */}
            <IndikatorHujan rain= {data.rain.read_value}/>
          </div>
        </div>

        {/* Tugas */}
        <div className="bg-abu rounded-md p-4 basis-3/6">
          <h5 className="font-bold text-2xl mb-5">Tugas</h5>
          {/* Tugas Content */}
          <div className="grid grid-rows-1 gap-2">
            <Tugas title={Tasks[0].title} date={Tasks[0].date} />
            <Warning title="Tingkat pH Kurang" sensor="Sensor 1"/>
          </div>
        </div>
      </div>
    </div>
  );
}
