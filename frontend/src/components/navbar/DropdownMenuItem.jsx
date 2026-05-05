import React from 'react'
import { ICONS } from './icons'

const DropdownMenuItem = ({ item }) => {
  const Icon = ICONS[item.iconId]
  return (
    <a
      href={item.href}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <span className="flex-shrink-0 mt-0.5 text-gray-500 group-hover:text-[#0052ff] transition-colors">
        {Icon && <Icon className="w-5 h-5" />}
      </span>
      <div>
        <div className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</div>
        <div className="text-xs text-gray-500 mt-0.5 leading-snug">{item.description}</div>
      </div>
    </a>
  )
}

export default DropdownMenuItem
