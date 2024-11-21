"use client"

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { fetchOrders, getOrderSlice } from '@/store/slices/orderSlice'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useStorage from './useStorage'

const useOrders = () => {
  const orderSlice = useAppSelector(getOrderSlice) // Get the order slice from the state
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const {currentUser} = useStorage();
  const [totalResults, setTotalResults] = useState(0);
  // Local state for pagination
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  console.log(orderSlice)
  // Function to fetch orders
  const handleFetchOrders = async () => {
    try {
      setLoading(true)
      const response = await dispatch(fetchOrders({ page, limit: 10, platform: currentUser?.user.whiteLabelName  }))
      console.log(response)
    } catch (error) {
      toast.error('An error occurred while fetching orders.')
    } finally {
      setLoading(false)
    }
  }

  

  // Effect to fetch orders when the component mounts or when `page` changes
  useEffect(() => {
    handleFetchOrders()
  }, [page, search]) // Re-run when `page` changes

  // Effect to show error toast when there is an error in the order slice
  useEffect(() => {
    if (orderSlice.error) {
      toast.error(orderSlice.error)
    }
  }, [orderSlice.error])

  // Paginate (you can use next/prev buttons for this)
  const handleNextPage = () => setPage(prevPage => prevPage + 1)
  const handlePrevPage = () => setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1))

  return {
    orders: orderSlice.orderResult, // The list of orders from your state
    loading: orderSlice.loading,
    error: orderSlice.error,
    page,
    handleNextPage,
    handlePrevPage,
    search,
    setSearch
  }
}

export default useOrders
