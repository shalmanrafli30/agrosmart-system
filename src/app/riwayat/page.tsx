"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Site from "../Components/dropdownSite";
import Select from "react-select";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("../Components/Chart"), { ssr: false });

function transformChartData(rawData: any[]) {
  const groupedData: Record<string, { x: string; y: number }[]> = {};

  rawData.forEach((item) => {
    const indicatorName = item.sensor_name ?? item.ds_id;
    if (!groupedData[indicatorName]) {
      groupedData[indicatorName] = [];
    }

    groupedData[indicatorName].push({
      x: item.read_date,
      y: parseFloat(item.read_value) || 0,
    });
  });

  return Object.entries(groupedData).map(([name, readings]) => ({
    name,
    data: readings,
  }));
}

export default function RiwayatPage() {
  const router = useRouter();
  const [siteId, setSiteId] = useState<string | null>(null);
  const [areaOptions, setAreaOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedSensors, setSelectedSensors] = useState<{ value: string; label: string }[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingAreas, setLoadingAreas] = useState<boolean>(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Auth check + ambil siteId dari localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.push("/login");
    } else {
      const storedSiteId = localStorage.getItem("selectedSiteId");
      if (storedSiteId) {
        setSiteId(storedSiteId);
      }
    }
  }, [router]);

  // ✅ Ambil daftar area setelah siteId tersedia
  useEffect(() => {
    if (!siteId) return;

    const token = localStorage.getItem("token");
    setLoadingAreas(true);

    fetch(`${API_URL}/api/area-options?site_id=${siteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Area options:", data);
        if (data.areas) {
          setAreaOptions(data.areas);
        } else {
          setAreaOptions([]);
        }
        setLoadingAreas(false);
      })
      .catch((err) => {
        console.error("Failed to fetch area options:", err);
        setAreaOptions([]);
        setLoadingAreas(false);
      });
  }, [siteId]);

  const fetchHistoryData = async () => {
    if (selectedSensors.length === 0 || !startDate || !endDate) {
      setErrorMessage("Please select all required fields.");
      return;
    }

    const requestBody = {
      site_id: siteId,
      areas: selectedSensors.map((sensor) => sensor.value),
      sensors: ["all"],
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const response = await fetch(`${API_URL}/api/riwayat2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestBody),
      });

      const rawData = await response.json();

      if (rawData.message) {
        setErrorMessage(rawData.message);
        setChartData(null);
      } else {
        const transformedData = transformChartData(rawData);
        setChartData(transformedData);
        setErrorMessage(null);
      }
    } catch (err) {
      console.error("Error fetching history data:", err);
      setErrorMessage("An error occurred while fetching data.");
      setChartData(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistoryData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center w-full">
        <Site onSiteChange={(id) => setSiteId(id)} />
      </div>

      <form onSubmit={handleSubmit} className="max-w-fit">
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Area:</span>
          {loadingAreas ? (
            <div className="text-gray-500">Loading area options...</div>
          ) : (
            <Select
              isMulti
              options={areaOptions}
              value={selectedSensors}
              onChange={(selectedOptions) => setSelectedSensors(selectedOptions as any)}
              placeholder="Pilih area"
              className="w-full"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#fff",
                  border: state.isFocused ? "2px solid #3ACBB6" : "1px solid #3ACBB6",
                  boxShadow: state.isFocused ? "0 0 5px #4caf50" : "none",
                  borderRadius: "8px",
                  padding: "5px",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#3ACBB6" : "white",
                  color: state.isSelected ? "#3ACBB6" : "#333",
                  padding: "5px",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: "8px",
                  marginTop: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }),
                multiValue: (provided) => ({
                  ...provided,
                  backgroundColor: "#3ACBB6",
                  borderRadius: "4px",
                  color: "black",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  color: "black",
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                    color: "white",
                  },
                }),
              }}
            />
          )}
        </div>

        <div className="flex items-center space-x-5 mb-4">
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
              Dari:
            </span>
            <input
              type="date"
              name="start_date"
              className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <span className="font-bold text-2xl">-</span>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-black font-semibold bg-primary border border-e-0 border-primary rounded-s-md">
              Ke:
            </span>
            <input
              type="date"
              name="end_date"
              className="rounded-none rounded-e-lg bg-white border border-primary text-black block flex-1 min-w-0 w-full text-sm p-2.5 focus:ring-transparent"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-black font-semibold text-sm rounded-md p-3 hover:bg-secondary w-2/12"
        >
          Submit
        </button>
      </form>

      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">{errorMessage}</div>
      )}

      {chartData && (
        <Chart data={chartData} sensorName={selectedSensors.map((sensor) => sensor.label).join(", ")} />
      )}
    </div>
  );
}
