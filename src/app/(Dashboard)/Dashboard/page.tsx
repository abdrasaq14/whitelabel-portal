"use client"
import React, {useEffect} from 'react'
import useNavigation from '@/customHooks/useNavigation';

const page = () => {

  const {checkUserAuthenticity} = useNavigation();

  useEffect(() => checkUserAuthenticity(), []);

  return (
    <div>Dashboard</div>
  )
}

export default page