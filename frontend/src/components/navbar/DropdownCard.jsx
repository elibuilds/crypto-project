import React from 'react'
import { HiOutlineChevronRight } from 'react-icons/hi2'

const DropdownCard = ({ card, href }) => (
  <div className="flex items-center gap-5 bg-gray-50 rounded-xl p-5 h-full">
    <div className="flex-shrink-0 w-40 h-28 rounded-lg overflow-hidden">
      <img
        src={card.image}
        alt={card.heading}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex flex-col justify-center">
      <h4 className="font-semibold text-gray-900 text-sm mb-1 leading-snug">
        {card.heading}
      </h4>
      <p className="text-xs text-gray-500 mb-3 leading-relaxed">
        {card.body}
      </p>
      <a
        href={href}
        className="inline-flex items-center gap-0.5 text-sm font-semibold text-[#0052ff] hover:underline"
      >
        Learn more
        <HiOutlineChevronRight className="w-4 h-4" />
      </a>
    </div>
  </div>
)

export default DropdownCard
