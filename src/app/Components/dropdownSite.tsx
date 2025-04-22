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
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/sites`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        })

        const data = await res.json()
        console.log("Fetched site list:", data)

        if (Array.isArray(data) && data.length > 0) {
          setSites(data)

          // Set selected site only once during mount
          if (!hasInitialized) {
            const firstSiteId = data[0].site_id
            setSelectedSite(firstSiteId)
            onSiteChange(firstSiteId)
            setHasInitialized(true)
          }
        } else {
          console.warn("No sites found or response malformed:", data)
        }
      } catch (err) {
        console.error("Error fetching site list:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSites()
  }, [onSiteChange, hasInitialized])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSite = e.target.value
    setSelectedSite(newSite)
    onSiteChange(newSite)
  }

  return (
    <div className="mb-6">
      <span>Lokasi:</span>
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
