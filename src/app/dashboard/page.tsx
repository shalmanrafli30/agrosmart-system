'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import IndikatorSuhu from "../Components/indikator/indikatorSuhuEnv"
import IndikatorKelembapan from "../Components/indikator/indikatorKelembapanEnv"
import IndikatorAngin from "../Components/indikator/indikatorKecAngin"
import IndikatorCahaya from "../Components/indikator/indikatorCahaya"
import IndikatorHujan from "../Components/indikator/indikatorHujan"
import Map from "../Components/map"
import FloatingGallery from "../Components/GalleryModal"
import Site from "../Components/dropdownSite"
import Realtime from "../Components/indikator/realtimeDashboard"

interface ActionMessage {
  sensor_name: string
  action_message: string
  status_message: string
  value_status: string
}

interface EnvironmentData {
  sensor: string
  read_value: number
  read_date: string | null
  value_status?: string
  status_message?: string
  action_message?: string
  sensor_name?: string
}

interface Sensor {
  sensor: string
  sensor_name: string
  read_value: string
  read_date: string
  value_status: string
  status_message: string
  action_message: string | null
}

interface Plant {
  pl_id: string
  pl_name: string
  pl_desc: string
  pl_date_planting: string
  age: number
  phase: string
  timeto_harvest: number
  commodity: string
  variety: string
}

interface DataResponse {
  nitrogen?: Sensor[]
  fosfor?: Sensor[]
  kalium?: Sensor[]
  soil_ph?: Sensor[]
  temperature?: EnvironmentData[]
  humidity?: EnvironmentData[]
  wind?: EnvironmentData[]
  lux?: EnvironmentData[]
  rain?: EnvironmentData[]
  plants?: Plant[]
  last_updated?: string
  todos?: {
    plant_id: string
    todos: {
      hand_title: string
      todo_date: string
      fertilizer_type: string
    }[]
  }[]
}

export default function Dashboard() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [data, setData] = useState<DataResponse>({})
  const [actionMessages, setActionMessages] = useState<ActionMessage[]>([])
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
  
    // Redirect jika belum login
    if (!token || !user) {
      router.push('/login')
      return
    }
  
    // Jangan fetch kalau siteId belum siap atau belum valid
    if (!siteId || siteId === 'undefined') return;
  
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  
    const fetchJSON = async (url: string) => {
      try {
        const res = await fetch(url, { headers })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.json()
      } catch (err) {
        console.error("Fetch Error:", err)
        return null
      }
    }
  
    const fetchAll = async () => {
      const dashData = await fetchJSON(`${API_URL}/api/dashboard?site_id=${siteId}`)
      const realtimeData = await fetchJSON(`${API_URL}/api/realtime?site_id=${siteId}`)
  
      // === DASHBOARD DATA ===
      if (dashData) {
        setData(dashData)
        const warnings: ActionMessage[] = []
  
        ;['temperature', 'humidity'].forEach((key) => {
          const d = dashData[key as keyof DataResponse] as EnvironmentData[]
          if (d?.[0]?.value_status && ['Warning', 'Danger'].includes(d[0].value_status)) {
            warnings.push({
              sensor_name: d[0].sensor_name || key,
              status_message: d[0].status_message || '-',
              action_message: d[0].action_message || '-',
              value_status: d[0].value_status,
            })
          }
        })
        setActionMessages(warnings)
      }
  
      // === REALTIME SENSOR DATA ===
      if (realtimeData?.sensors) {
        const grouped: Record<number, { nitrogen?: Sensor; fosfor?: Sensor; kalium?: Sensor; soil_ph?: Sensor }> = {}
        const warnings: ActionMessage[] = []
  
        realtimeData.sensors.forEach((sensor: Sensor) => {
          const match = sensor.sensor.match(/(\d+)$/)
          if (!match) return
          const area = parseInt(match[1])
          if (!grouped[area]) grouped[area] = {}
  
          if (sensor.sensor.startsWith('soil_nitro')) grouped[area].nitrogen = sensor
          else if (sensor.sensor.startsWith('soil_phos')) grouped[area].fosfor = sensor
          else if (sensor.sensor.startsWith('soil_pot')) grouped[area].kalium = sensor
          else if (sensor.sensor.startsWith('soil_ph')) grouped[area].soil_ph = sensor
  
          if (sensor.value_status === 'Danger' || sensor.value_status === 'Warning') {
            warnings.push({
              sensor_name: sensor.sensor_name,
              status_message: sensor.status_message,
              action_message: sensor.action_message || '-',
              value_status: sensor.value_status,
            })
          }
        })
  
        const soil_ph: Sensor[] = []
        const nitrogen: Sensor[] = []
        const fosfor: Sensor[] = []
        const kalium: Sensor[] = []
  
        Object.keys(grouped).sort((a, b) => Number(a) - Number(b)).forEach(key => {
          const areaData = grouped[Number(key)]
          if (areaData.soil_ph) soil_ph.push(areaData.soil_ph)
          if (areaData.nitrogen) nitrogen.push(areaData.nitrogen)
          if (areaData.fosfor) fosfor.push(areaData.fosfor)
          if (areaData.kalium) kalium.push(areaData.kalium)
        })
  
        setData(prev => ({ ...prev, soil_ph, nitrogen, fosfor, kalium }))
        setActionMessages(prev => [...prev, ...warnings])
      }
    }
  
    fetchAll()
  }, [siteId])

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
    try {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-full mb-4">
        <Site onSiteChange={(id) => setSiteId(id)} />
        <div className="flex items-center gap-4">
          <span className="text-right text-sm text-gray-600">
            Update Terakhir: {data.last_updated || "Tidak tersedia"}
          </span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium underline"
          >
            Logout
          </button>
        </div>
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
                  statusPh={data.soil_ph?.[index]?.value_status ?? ""}
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
  )
}
