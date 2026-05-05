import React from 'react'
import DropdownMenuItem from './DropdownMenuItem'

const DropdownSection = ({ section }) => (
  <div>
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
      {section.heading}
    </h3>
    <div>
      {section.items.map((item, idx) => (
        <DropdownMenuItem key={idx} item={item} />
      ))}
    </div>
  </div>
)

export default DropdownSection
