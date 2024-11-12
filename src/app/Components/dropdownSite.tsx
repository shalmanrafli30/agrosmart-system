import React from "react";

interface DropdownSiteProps {
  onSiteChange: (siteId: string) => void;
}

const DropdownSite: React.FC<DropdownSiteProps> = ({ onSiteChange }) => {
  const Sites = [
    { id: "SITE001", title: "SITE001 - Lahan Padi" },
    // { id: "SITE002", title: "SITE002 - Lahan Padi" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSiteChange(event.target.value); // Notify the parent component of the site change
  };

  return (
    <div className="mb-6">
      <span>Lokasi:</span>
      <select name="site" className="bg-white font-bold" onChange={handleChange}>
        <option value="">Pilih Lokasi</option>
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
