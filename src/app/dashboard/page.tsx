'use client';

import { useEffect, useState } from "react";
import IndikatorSuhu from "../Components/indikator/indikatorSuhuEnv";
import IndikatorKelembapan from "../Components/indikator/indikatorKelembapanEnv";
import IndikatorAngin from "../Components/indikator/indikatorKecAngin";
import IndikatorCahaya from "../Components/indikator/indikatorCahaya";
import IndikatorHujan from "../Components/indikator/indikatorHujan";
import Map from "../Components/map";
import Tugas from "../Components/warning/tugas";
import Warning from "../Components/warning/anomali";
import FloatingGallery from "../Components/GalleryModal";
import Site from "../Components/dropdownSite";


interface ActionMessage {
  sensor_name: string;
  action_message: string;
  status_message: string;
  value_status:string;
}

interface Plant {
  pl_id: number;
  pl_name: string;
  pl_desc: string;
  pl_date_planting: string;
  age: number;
  phase: string;
  timeto_harvest: number;
  commodity: string;
  variety: string;
}

interface SensorData {
  data: {
    read_value: string;
  };
  value_status?: string;
  status_message?: string;
  action_message?: string;
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

export default function dashboard() {
  const [siteId, setSiteId] = useState<string>("SITE001");
  const [actionMessages, setActionMessages] = useState<ActionMessage[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<DataResponse>({
    site_id: "",
    temperature: { data: { read_value: "0" }, value_status: "", status_message: "", action_message: "" },
    humidity: { data: { read_value: "0" } },
    wind: { data: { read_value: "0" } },
    lux: { data: { read_value: "0" } },
    rain: { data: { read_value: "0" } },
    plants: [],
  });

  useEffect(() => {
    if (!siteId) return;

    // Fetch data utama (menggunakan query parameter)
    fetch(`${API_URL}/api/dashboard?site_id=${siteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard data: ${response.status}`);
        }
        return response.json();
      })
      .then((data: DataResponse) => setData(data))
      .catch((error) => console.error("Error fetching dashboard data:", error));

    // Fetch data realtime (juga menggunakan query parameter)
    fetch(`${API_URL}/api/realtime?site_id=${siteId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch realtime data: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        const warningSensors: ActionMessage[] = [];
        ["nitrogen", "fosfor", "kalium", "soil_ph", "soil_temp"].forEach((key) => {
          if (jsonData[key]) {
            jsonData[key].forEach((sensor: any) => {
              if (sensor.value_status === "Warning" || sensor.value_status === "Danger") {
                warningSensors.push({
                  sensor_name: sensor.sensor_name,
                  action_message: sensor.action_message,
                  status_message: sensor.status_message,
                  value_status: sensor.value_status,
                });
              }
            });
          }
        });
        setActionMessages(warningSensors);
      })
      .catch((error) => console.error("Error fetching realtime data:", error));
  }, [siteId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <Site onSiteChange={(id) => setSiteId(id)} />
        <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
      </div>
      <div className="flex gap-2">
        <div className="bg-gray-600 h-[500px] rounded-xl w-3/4 overflow-hidden relative">
          <Map />
          <FloatingGallery />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Komoditas</h5>
                <span className="font-bold text-xl">
                  {data.plants.length > 0 ? data.plants[0].commodity : "Unknown Plant"}
                </span>
              </div>
              <div className="bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Varietas</h5>
                <span className="font-bold text-xl">
                  {data.plants.length > 0 ? data.plants[0].variety : "Unknown Plant"}
                </span>
              </div>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Umur Tanam</h5>
              <span className="font-bold text-xl">
                {data.plants.length > 0 ? `${data.plants[0].age} HST` : "N/A"}
              </span>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Tanggal Tanam</h5>
              <span className="font-bold text-xl">
                {data.plants.length > 0 ? data.plants[0].pl_date_planting : "N/A"}
              </span>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Fase Tanam</h5>
              <span className="font-bold text-xl">
                {data.plants.length > 0 ? data.plants[0].phase : "N/A"}
              </span>
            </div>
            <div className="bg-primary p-2 rounded-md text-white">
              <h5 className="mb-5 font-medium">Waktu Menuju Panen</h5>
              <span className="font-bold text-xl">
                {data.plants.length > 0 ? `${data.plants[0].timeto_harvest} Hari` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex-grow">
          <h5 className="font-bold text-2xl mb-5">Indikator Lingkungan</h5>
          <div className="grid grid-cols-2 gap-2">
            <IndikatorSuhu suhu={parseFloat(data.temperature.data.read_value)} />
            <IndikatorKelembapan humid={parseFloat(data.humidity.data.read_value)} />
            <IndikatorAngin wind={parseFloat(data.wind.data.read_value)} />
            <IndikatorCahaya lux={parseFloat(data.lux.data.read_value)} />
            <IndikatorHujan rain={parseFloat(data.rain.data.read_value)} />
          </div>
        </div>
        <div className="bg-abu rounded-md p-4 basis-3/6">
          <h5 className="font-bold text-2xl mb-5">Peringatan</h5>
          <div className="grid grid-rows-1 gap-2">
            {actionMessages.length > 0 ? (
              actionMessages.map((msg, index) => (
                <Warning
                  key={index}
                  title={msg.status_message}
                  sensor={msg.sensor_name}
                  aksi={msg.action_message}
                  status={msg.value_status}
                />
              ))
            ) : (
              <p className="text-gray-600">Tidak ada peringatan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
