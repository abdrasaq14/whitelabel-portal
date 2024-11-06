"use client"
import React, {useEffect} from 'react'
import useNavigation from '@/customHooks/useNavigation';
import useDashboard from '@/customHooks/useDashboard';

const page = () => {

  const {stats} = useDashboard();

  const {checkUserAuthenticity} = useNavigation();

  useEffect(() => checkUserAuthenticity(), []);

  return (
    <div>Dashboard</div>
  )
}

export default page