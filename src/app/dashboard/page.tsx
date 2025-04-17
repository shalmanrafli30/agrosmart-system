// Final Revisi Dashboard.tsx dengan pemisahan API dashboard & realtime

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

interface Sensor {
  sensor: string
  sensor_name: string
  read_value: string
  read_date: string
  value_status: string
  status_message: string
  action_message: string | null
}

export default function Dashboard() {
  const [siteId, setSiteId] = useState<string | null>(null)
  const [data, setData] = useState<DataResponse>({})
  const [realtimeSensors, setRealtimeSensors] = useState<Sensor[]>([])
  const [actionMessages, setActionMessages] = useState<ActionMessage[]>([])
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
  
    if (!token || !user) {
      router.push('/login')
      return
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
    }
  
    const parsedUser = JSON.parse(user)
    const siteId = parsedUser.site_id || parsedUser.user_site_id || 'SITE002'
    setSiteId(siteId)
  
    fetch(`${API_URL}/api/dashboard?site_id=${siteId}`, { headers })
      .then((res) => res.json())
      .then((resData: DataResponse) => {
        setData(resData)
  
        const warning: ActionMessage[] = []
        ;['temperature', 'humidity'].forEach((key) => {
          const d = resData[key as keyof DataResponse] as EnvironmentData[]
          if (d && d[0]?.value_status && (d[0].value_status === 'Warning' || d[0].value_status === 'Danger')) {
            warning.push({
              sensor_name: d[0].sensor_name || key,
              status_message: d[0].status_message || '-',
              action_message: d[0].action_message || '-',
              value_status: d[0].value_status,
            })
          }
        })
        setActionMessages(warning)
      })
      .catch((err) => console.error("Dashboard Error:", err))
  
    fetch(`${API_URL}/api/realtime?site_id=${siteId}`, { headers })
      .then((res) => res.json())
      .then((res) => {
        setRealtimeSensors(res.sensors || [])
  
        const sensorWarnings = res.sensors.filter((s: Sensor) => s.value_status === 'Danger' || s.value_status === 'Warning')
        const formattedWarnings: ActionMessage[] = sensorWarnings.map((s: Sensor) => ({
          sensor_name: s.sensor_name,
          status_message: s.status_message,
          action_message: s.action_message || '-',
          value_status: s.value_status,
        }))
        setActionMessages(prev => [...prev, ...formattedWarnings])
      })
      .catch((err) => console.error("Error fetching realtime data", err))
  }, [])
  

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

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

      <div className="grid grid-cols-2 gap-2">
        <IndikatorSuhu suhu={data.temperature?.[0]?.read_value || 0} />
        <IndikatorKelembapan humid={data.humidity?.[0]?.read_value || 0} />
        <IndikatorAngin wind={data.wind?.[0]?.read_value || 0} />
        <IndikatorCahaya lux={data.lux?.[0]?.read_value || 0} />
        <IndikatorHujan rain={data.rain?.[0]?.read_value || 0} />
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl mb-2">Peringatan</h3>
        <div className="space-y-2">
          {actionMessages.length ? actionMessages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-md text-white ${msg.value_status === 'Danger' ? 'bg-red-600' : 'bg-yellow-500'}`}>
              <h4 className="font-bold text-lg">{msg.status_message}</h4>
              <p>Indikator: {msg.sensor_name}</p>
              <p className="mt-2 font-semibold">Aksi: {msg.action_message}</p>
            </div>
          )) : <p className="text-gray-600">Tidak ada peringatan saat ini.</p>}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl mb-2">Tanaman</h3>
        {data.plants?.length ? (
          <div className="space-y-2">
            <p><strong>Komoditas:</strong> {data.plants[0].commodity}</p>
            <p><strong>Varietas:</strong> {data.plants[0].variety}</p>
            <p><strong>Umur Tanam:</strong> {data.plants[0].age} HST</p>
            <p><strong>Tanggal Tanam:</strong> {data.plants[0].pl_date_planting}</p>
            <p><strong>Fase:</strong> {data.plants[0].phase}</p>
            <p><strong>Menuju Panen:</strong> {data.plants[0].timeto_harvest} Hari</p>
          </div>
        ) : <p className="text-gray-600">Tidak ada data tanaman.</p>}
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-xl mb-2">Sensor Realtime</h3>
        {realtimeSensors.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {realtimeSensors.map((sensor, index) => (
              <div key={index} className={`p-3 border rounded-md ${sensor.value_status === 'Danger' ? 'border-red-500' : 'border-gray-300'}`}>
                <p className="font-semibold">{sensor.sensor_name}</p>
                <p className="text-sm">Nilai: {sensor.read_value}</p>
                <p className="text-sm">Status: {sensor.value_status}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-600">Belum ada data sensor realtime.</p>}
      </div>
    </div>
  )
}
