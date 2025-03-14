'use client'
import React, { useState, useEffect } from 'react'

export default function OrderNumber () {
  const [orderNumber, setOrderNumber] = useState(null)
  const [serialNumber, setSerialNumber] = useState(null)

  const handleGetOrder = async () => {
    try {
      const response = await fetch('/api/checkout')
      const result = await response.json()

      if (result.Checkouts?.length) {
        const lastOrder = result.Checkouts[result.Checkouts.length - 1]
        setOrderNumber(lastOrder?.orderNumber || null)
        setSerialNumber(lastOrder?.serialnumber || null)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    handleGetOrder()
  }, [])

  return (
    <div>
      {orderNumber && serialNumber ? (
        <p className='mb-4'>Order Number: {orderNumber}{serialNumber}</p>
      ) : (
        <p className='mb-4'>No orders found</p>
      )}
    </div>
  )
}
