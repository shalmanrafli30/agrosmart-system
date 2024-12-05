import React, { useState } from "react";

interface DropdownSiteProps {
  onSiteChange: (siteId: string) => void;
}

const DropdownSite: React.FC<DropdownSiteProps> = ({ onSiteChange }) => {
  const Sites = [
    { id: "SITE000", title: "Poktan Pasir Malang, Desa Langensari, Kecamatan Karangtengah, Kab. Cianjur" },
    // { id: "SITE001", title: "Poktan Giri Utami, Desa Putrajawa, Kab. Garut" },
    //   Poktan Giri Utami, Desa Putrajawa, Kab. Garut
    // Poktan Pasir Malang, Desa Langensari, Kecamapatan Karangtengah, Kab. Cianjur
  ];

  return (
      <div className="mb-6">
          <span>Lokasi:</span>
          <select
              name="site"
              className="bg-white font-bold"
              defaultValue="SITE000" // Set default value
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
