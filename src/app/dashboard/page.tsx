'use client';

import { useEffect, useState } from "react";
import IndikatorSuhu from "../Components/indikator/indikatorSuhuEnv";
import IndikatorKelembapan from "../Components/indikator/indikatorKelembapanEnv";
import IndikatorAngin from "../Components/indikator/indikatorKecAngin";
import IndikatorCahaya from "../Components/indikator/indikatorCahaya";
import IndikatorHujan from "../Components/indikator/indikatorHujan";
import Map from "../Components/map";
import FloatingGallery from "../Components/GalleryModal";
import Site from "../Components/dropdownSite";
import Realtime from "../Components/indikator/realtimeDashboard";
import Warning from "../Components/warning/anomali";

interface ActionMessage {
  sensor_name: string;
  action_message: string;
  status_message: string;
  value_status: string;
}

interface SensorRealtime {
  sensor: string;
  read_value: string | number;
  read_date: string | null;
  value_status?: string;
  status_message?: string;
  action_message?: string;
  sensor_name?: string;
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

interface EnvironmentData {
  sensor: string;
  read_value: number;
  read_date: string | null;
  value_status?: string;
  status_message?: string;
  action_message?: string;
  sensor_name?: string;
}

interface DataResponse {
  nitrogen?: SensorRealtime[];
  fosfor?: SensorRealtime[];
  kalium?: SensorRealtime[];
  soil_ph?: SensorRealtime[];
  temperature?: EnvironmentData[];
  humidity?: EnvironmentData[];
  wind?: EnvironmentData[];
  lux?: EnvironmentData[];
  rain?: EnvironmentData[];
  plants?: Plant[];
  last_updated?: string;
  todos?: {
    plant_id: number;
    todos: {
      hand_title: string;
      hand_day: number;
      hand_day_toleran: number;
      fertilizer_type: string;
      todo_date: string;
      tolerant_date: string;
      days_remaining: number;
      days_tolerant_remaining: number;
    }[];
  }[];
}

export default function Dashboard() {
  const [siteId, setSiteId] = useState<string>("SITE000");
  const [actionMessages, setActionMessages] = useState<ActionMessage[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [data, setData] = useState<DataResponse>({
    nitrogen: [],
    fosfor: [],
    kalium: [],
    soil_ph: [],
    temperature: [],
    humidity: [],
    wind: [],
    lux: [],
    rain: [],
    plants: [],
    last_updated: "",
    todos: [],
  });
  

  useEffect(() => {
    if (!siteId) return;

    // Fetch dashboard data
    fetch(`${API_URL}/api/dashboard?site_id=${siteId}`)
      .then((res) => res.json())
      .then((dashboardData: DataResponse) => {
        console.log("Dashboard Data:", dashboardData); // Debugging
        setData((prev) => ({ ...prev, ...dashboardData }));
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));

    // Fetch realtime data
    fetch(`${API_URL}/api/realtime?site_id=${siteId}`)
      .then((res) => res.json())
      .then((realtimeData: Partial<DataResponse>) => {
        console.log("Realtime Data:", realtimeData); // Debugging

        const warningSensors: ActionMessage[] = [];
        (["soil_ph", "nitrogen", "fosfor", "kalium"] as (keyof DataResponse)[]).forEach((key) => {
          if (Array.isArray(realtimeData[key])) {
            realtimeData[key]?.forEach((sensor) => {
              if (sensor.value_status === "Warning" || sensor.value_status === "Danger") {
                warningSensors.push({
                  sensor_name: sensor.sensor_name || key,
                  action_message: sensor.action_message ?? "Periksa segera!",
                  status_message: sensor.status_message ?? "",
                  value_status: sensor.value_status ?? "Warning",
                });
              }
            });
          }
        });

        setActionMessages(warningSensors);

        // Update state with realtime data
        setData((prev) => ({
          ...prev,
          ...realtimeData,
        }));
      })
      .catch((error) => console.error("Error fetching realtime data:", error));
  }, [siteId]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <Site onSiteChange={(id) => setSiteId(id)} />
        <span className="text-right">Update Terakhir: {data.last_updated || "Data tidak tersedia"}</span>
      </div>

      <div className="flex gap-2">
        <div className="bg-gray-300 h-auto rounded-xl w-4/6 overflow-hidden relative">
          <Map />
          <FloatingGallery />
        </div>
        <div className="flex-grow">
          <div className="flex flex-col gap-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Komoditas</h5>
                <span className="font-bold text-xl">
                  {data.plants?.length ? data.plants[0].commodity : "Unknown Plant"}
                </span>
              </div>
              <div className="bg-abu p-2 rounded-md">
                <h5 className="mb-5 font-medium">Varietas</h5>
                <span className="font-bold text-xl">
                  {data.plants?.length ? data.plants[0].variety : "Unknown Plant"}
                </span>
              </div>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Umur Tanam</h5>
              <span className="font-bold text-xl">
                {data.plants?.length ? `${data.plants[0].age} HST` : "N/A"}
              </span>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Tanggal Tanam</h5>
              <span className="font-bold text-xl">
                {data.plants?.length ? data.plants[0].pl_date_planting : "N/A"}
              </span>
            </div>
            <div className="bg-abu p-2 rounded-md">
              <h5 className="mb-5 font-medium">Fase</h5>
              <span className="font-bold text-xl">
                {data.plants?.length ? data.plants[0].phase : "N/A"}
              </span>
            </div>
            <div className="bg-primary p-2 rounded-md text-white">
              <h5 className="mb-5 font-medium">Waktu Menuju Panen</h5>
              <span className="font-bold text-xl">
                {data.plants?.length ? `${data.plants[0].timeto_harvest} Hari` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2 mb-5">
        <div className="flex-grow">
          <h5 className="font-bold text-2xl mb-5">Indikator Lingkungan</h5>
          <div className="grid grid-cols-2 gap-2">
            <IndikatorSuhu suhu={data.temperature?.[0]?.read_value || 0} />
            <IndikatorKelembapan humid={data.humidity?.[0]?.read_value || 0} />
            <IndikatorAngin wind={data.wind?.[0]?.read_value || 0} />
            <IndikatorCahaya lux={data.lux?.[0]?.read_value || 0} />
            <IndikatorHujan rain={data.rain?.[0]?.read_value || 0} />
          </div>
        </div>
        <div className="bg-abu rounded-md p-4 basis-3/6">
          {/* TUGAS */}
          <div className="mb-5">
            <h5 className="font-bold text-2xl mb-5">Tugas</h5>
            {data.todos && data.todos.length > 0 ? (
              data.todos.map((todoGroup, groupIndex) =>
                todoGroup.todos.map((todo, index) => (
                  <div key={`${groupIndex}-${index}`} className="p-4 rounded-md text-black bg-[#E0E0E0] mb-3">
                    <h4 className="font-bold text-2xl">{todo.hand_title}</h4>
                    <p className="mt-4 font-normal">Waktu: <strong>{todo.todo_date}</strong></p>
                    <p className="mt-4 font-normal">Pupuk: <strong>{todo.fertilizer_type}</strong></p>
                  </div>
                ))
              )
            ) : (
              <p className="text-gray-600">Tidak ada tugas saat ini.</p>
            )}
          </div>

          {/* PERINGATAN */}
          <h5 className="font-bold text-2xl mb-5">Peringatan</h5>
          <div className="rounded-md overflow-y-auto max-h-[280px]">
            <div className="grid gap-2">
              {actionMessages.length > 0 ? (
                actionMessages.map((msg: ActionMessage, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md text-white ${
                      msg.value_status === "Danger" ? "bg-red-600" : "bg-yellow-500"
                    }`}
                  >
                    <h4 className="font-bold text-2xl">{msg.status_message}</h4>
                    <p>Indikator: {msg.sensor_name}</p>
                    <p className="mt-4 text-lg font-bold">Aksi: {msg.action_message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Semua sensor dalam kondisi baik.</p>
              )}
            </div> 
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-bold text-2xl mb-5">Realtime</h3>
        {data.soil_ph?.length ? (
          <div className="mt-5">
            {data.soil_ph.map((sensor, index) => {
              const nitrogen = data.nitrogen?.[index]?.read_value || 0;
              const fosfor = data.fosfor?.[index]?.read_value || 0;
              const kalium = data.kalium?.[index]?.read_value || 0;
              const ph = sensor.read_value || 0;

              return (
                <Realtime
                  key={sensor.sensor}
                  sensor={index + 1}
                  nitrogen={Number(nitrogen)}
                  fosfor={Number(fosfor)}
                  kalium={Number(kalium)}
                  ph={Number(ph)}
                  statusPh={sensor.value_status ?? ""}
                  statusNitrogen={data.nitrogen?.[index]?.value_status ?? ""}
                  statusFosfor={data.fosfor?.[index]?.value_status ?? ""}
                  statusKalium={data.kalium?.[index]?.value_status ?? "OK"}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">Data sensor tidak tersedia.</p>
        )}
      </div>
    </div>
  );
}
