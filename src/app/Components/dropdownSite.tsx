import React, { useState } from 'react'

const dropdownSite = () => {
const [dropdownOpen, setDropdownOpen] = useState(false);
const Sites = [
    {title: 'SITE001 - Lahan Padi'},
    {title: 'SITE002 - Lahan Padi'}
]
  
  return (
    <div className="p-6">
      <select name="site" className=''>
        {Sites.map(option => (
          <option value={option.title}>{option.title}</option>
        ))}
      </select>
    </div>
  )
}

export default dropdownSite