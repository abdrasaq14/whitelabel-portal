import { ValidationErrorProps } from '@/interfaces/ComponentInterfaces'
import React from 'react'

const ValidationError = ({icon: Icon=null, message}: ValidationErrorProps) => {
  return (
    <div className="flex items-center">
        {Icon && <Icon size={12} className='text-danger-main' />}
        <span className="text-danger-main ml-1 text-sm">{message}</span>
    </div>
  )
}

export default ValidationError