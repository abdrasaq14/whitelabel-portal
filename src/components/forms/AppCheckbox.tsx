import { AppCheckboxProps } from '@/interfaces/ComponentInterfaces'
import React, {ReactElement, useState} from 'react'

const AppCheckbox = ({label, checked=false, onChange}: AppCheckboxProps): ReactElement => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      {/* Hidden default checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden peer" // peer class for custom styles
      />
      
      {/* Custom checkbox */}
      <span
        className={`w-5 h-5 rounded border border-purple-main flex justify-center items-center transition-colors 
          ${checked ? 'bg-purple-main border-purple-main' : ''}`}
      >
        {/* Inner checkmark (only visible when checked) */}
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      
      {/* Label text */}
      <span className="ml-2 text-accent-light font-satoshiRegular text-xs">{label}</span>
    </label>
  )
}

export default AppCheckbox