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

interface DataResponse {
  nitrogen?: SensorRealtime[];
  fosfor?: SensorRealtime[];
  kalium?: SensorRealtime[];
  soil_ph?: SensorRealtime[];
  temperature?: { data: { read_value: string } };
  humidity?: { data: { read_value: string } };
  wind?: { data: { read_value: string } };
  lux?: { data: { read_value: string } };
  rain?: { data: { read_value: string } };
  plants?: Plant[];
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

export default function Dashboard() {
  const [siteId, setSiteId] = useState<string>("SITE001");
  const [actionMessages, setActionMessages] = useState<ActionMessage[]>([]);
  const [data, setData] = useState<DataResponse>({
    nitrogen: [],
    fosfor: [],
    kalium: [],
    soil_ph: [],
    temperature: { data: { read_value: "0" } },
    humidity: { data: { read_value: "0" } },
    wind: { data: { read_value: "0" } },
    lux: { data: { read_value: "0" } },
    rain: { data: { read_value: "0" } },
    plants: [],
  });

  useEffect(() => {
    if (!siteId) return;

    // Fetch dashboard data
    fetch(`/api/dashboard?site_id=${siteId}`)
      .then((res) => res.json())
      .then((dashboardData: DataResponse) => {
        console.log("Dashboard Data:", dashboardData); // Debugging
        setData((prev) => ({ ...prev, ...dashboardData }));
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));

    // Fetch realtime data
    fetch(`/api/realtime?site_id=${siteId}`)
      .then((res) => res.json())
      .then((realtimeData: Partial<DataResponse>) => {
        console.log("Realtime Data:", realtimeData); // Debugging

        const warningSensors: ActionMessage[] = [];
        (["nitrogen", "fosfor", "kalium", "soil_ph"] as (keyof DataResponse)[]).forEach((key) => {
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
        <span className="text-right">Update Terakhir: 16/10/2024 21:35 PM</span>
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
            <div className="bg-primary p-2 rounded-md text-white">
              <h5 className="mb-5 font-medium">Waktu Menuju Panen</h5>
              <span className="font-bold text-xl">
                {data.plants?.length ? `${data.plants[0].timeto_harvest} Hari` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="flex-grow">
          <h5 className="font-bold text-2xl mb-5">Indikator Lingkungan</h5>
          <div className="grid grid-cols-2 gap-2">
            <IndikatorSuhu suhu={parseFloat(data.temperature?.data.read_value || "0")} />
            <IndikatorKelembapan humid={parseFloat(data.humidity?.data.read_value || "0")} />
            <IndikatorAngin wind={parseFloat(data.wind?.data.read_value || "0")} />
            <IndikatorCahaya lux={parseFloat(data.lux?.data.read_value || "0")} />
            <IndikatorHujan rain={parseFloat(data.rain?.data.read_value || "0")} />
          </div>
        </div>
        <div className="bg-abu rounded-md p-4 basis-3/6">
          <h5 className="font-bold text-2xl mb-5">Peringatan</h5>
          <div className="p-4 rounded-md overflow-y-auto max-h-[280px]">
            <div className="grid gap-2">
              {actionMessages.length > 0 ? (
                actionMessages.map((msg: ActionMessage, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md text-white ${
                      msg.value_status === "Danger" ? "bg-red-600" : "bg-yellow-500"
                    }`}
                  >
                    <h4 className="font-bold">{msg.status_message}</h4>
                    <p>Indikator: {msg.sensor_name}</p>
                    <p className="mt-4 text-2xl font-bold">Aksi: {msg.action_message}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Semua sensor dalam kondisi baik.</p>
              )}
            </div> 
          </div>
        </div>
      </div>

      {data.soil_ph?.length ? (
        <div>
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
  );
}
