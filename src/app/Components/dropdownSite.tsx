const dropdownSite = () => {
  const Sites = [
    { title: 'SITE001 - Lahan Padi' },
    { title: 'SITE002 - Lahan Padi' }
  ];

  return (
    <div className="p-6">
      <span>Lokasi:</span>
      <select name="site" className="bg-white font-bold">
        {Sites.map((option, index) => (
          <option key={index} className="bg-white" value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default dropdownSite;
