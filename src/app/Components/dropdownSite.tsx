'use client'

import React, { useEffect, useState } from "react"

interface DropdownSiteProps {
  onSiteChange: (siteId: string) => void
}

interface SiteOption {
  site_id: string
  site_name: string
}

const DropdownSite: React.FC<DropdownSiteProps> = ({ onSiteChange }) => {
  const [sites, setSites] = useState<SiteOption[]>([])
  const [selectedSite, setSelectedSite] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [hasInitialized, setHasInitialized] = useState<boolean>(false)

  useEffect(() => {
    const fetchSites = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/site`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
  
        const result = await res.json();
        if (Array.isArray(result.data) && result.data.length > 0) {
          setSites(result.data);

          const savedSite = localStorage.getItem("selectedSiteId");
          const defaultSite = savedSite || result.data[0].site_id;

          setSelectedSite(defaultSite);
          onSiteChange(defaultSite);
        }

      } catch (err) {
        console.error("Error fetching site list:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSites();
  }, [onSiteChange]);
  

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSite = e.target.value
    setSelectedSite(newSite)
    localStorage.setItem("selectedSiteId", newSite); // ✅ Simpan ke localStorage
    onSiteChange(newSite)
  }

  return (
    <div className="mb-6">
      <span>Lahan:</span>
      <select
        name="site"
        className="bg-white font-bold"
        value={selectedSite}
        onChange={handleChange}
        disabled={loading || sites.length === 0}
      >
        {loading ? (
          <option>Memuat lokasi...</option>
        ) : sites.length === 0 ? (
          <option>Tidak ada lokasi</option>
        ) : (
          sites.map((site) => (
            <option key={site.site_id} value={site.site_id}>
              {site.site_name}
            </option>
          ))
        )}
      </select>
    </div>
  )
}

export default DropdownSite
