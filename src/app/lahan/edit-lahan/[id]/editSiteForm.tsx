"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Back from "../../../Components/backButton";

interface SiteData {
  site_id: string;
  site_name: string;
  site_address: string;
  site_lat: number;
  site_lon: number;
  site_elevasi: number;
  site_sts: number;
}

export default function EditSiteFormClient({ siteId }: { siteId: string }) {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Anda belum login.");
      router.push("/login");
      return;
    }

    fetch(`${API_URL}/api/site/${siteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setSiteData(data.data);
        } else {
          alert("Lahan tidak ditemukan.");
          router.push("/lahan");
        }
      })
      .catch(() => {
        alert("Gagal mengambil data.");
        router.push("/lahan");
      })
      .finally(() => setLoading(false));
  }, [siteId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSiteData((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "site_lat" ||
              name === "site_lon" ||
              name === "site_elevasi"
                ? parseFloat(value)
                : value,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !siteData) return;

    try {
      const res = await fetch(`${API_URL}/api/site/${siteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(siteData),
      });

      if (!res.ok) throw new Error("Gagal update");
      alert("Berhasil diperbarui.");
      router.push("/lahan");
    } catch (err) {
      alert("Terjadi kesalahan saat memperbarui.");
    }
  };

  if (loading || !siteData) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="mt-6 ml-6 bg-abu p-4">
        <h3 className="mb-5 text-center font-bold text-xl">Edit Lahan</h3>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-screen-md">
          {/* Input fields */}
          {[
            { label: "ID Lahan", name: "site_id", disabled: true },
            { label: "Nama Lahan", name: "site_name" },
            { label: "Alamat", name: "site_address" },
            { label: "Latitude", name: "site_lat", type: "number" },
            { label: "Longitude", name: "site_lon", type: "number" },
            { label: "Elevasi", name: "site_elevasi", type: "number" },
          ].map(({ label, name, type = "text", disabled = false }) => (
            <div key={name} className="flex space-x-5 items-center">
              <label htmlFor={name} className="text-black font-bold w-32">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                disabled={disabled}
                value={siteData[name as keyof SiteData]}
                onChange={handleChange}
                className={`border border-abu3 text-sm p-2 w-full ${
                  disabled ? "bg-gray-200" : "bg-white"
                } text-black`}
              />
            </div>
          ))}

          {/* Dropdown for Status */}
          <div className="flex space-x-5 items-center">
            <label htmlFor="site_sts" className="text-black font-bold w-32">
              Status
            </label>
            <select
              id="site_sts"
              name="site_sts"
              value={siteData.site_sts}
              onChange={(e) =>
                setSiteData((prev) =>
                  prev ? { ...prev, site_sts: parseInt(e.target.value) } : null
                )
              }
              className="border border-abu3 text-sm p-2 w-full bg-white text-black font-bold"
            >
              <option value={1}>Aktif</option>
              <option value={0}>Tidak Aktif</option>
            </select>
          </div>

          <div className="space-x-5 mt-6">
            <Back route="/lahan" />
            <input
              type="submit"
              value="Simpan"
              className="bg-[#F9B300] text-white rounded-md p-3 cursor-pointer hover:bg-kuningCerah"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
