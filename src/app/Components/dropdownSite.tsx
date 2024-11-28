import React, { useState } from "react";

interface DropdownSiteProps {
  onSiteChange: (siteId: string) => void;
}

const DropdownSite: React.FC<DropdownSiteProps> = ({ onSiteChange }) => {
  const Sites = [
      { id: "SITE001", title: "Poktan Pasir Malang, Desa Langensari, Kecamapatan Karangtengah, Kab. Cianjur" },
      // { id: "SITE002", title: "SITE002 - Lahan Padi" },
    //   Poktan Giri Utami, Desa Putrajawa, Kab. Garut
  ];

  return (
      <div className="mb-6">
          <span>Lokasi:</span>
          <select
              name="site"
              className="bg-white font-bold"
              defaultValue="SITE001" // Set default value
              onChange={(event) => onSiteChange(event.target.value)}
          >
              {Sites.map((site) => (
                  <option key={site.id} value={site.id}>
                      {site.title}
                  </option>
              ))}
          </select>
      </div>
  );
};


export default DropdownSite;
