import React from 'react'
import '@/app/styles/components.css'
import { CardProps } from '@/interfaces/ComponentInterfaces'

const AppCard = ({children, type}: CardProps) => {
  return (
    <div className={`card ${type}`}>
        {children}
    </div>
  )
}

export default AppCard