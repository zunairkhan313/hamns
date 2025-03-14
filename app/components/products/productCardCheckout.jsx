'use client'

import React from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function ProductCardCheckout () {
  const { cart } = useSelector(state => state.cart)

  return cart?.length > 0
    ? cart?.map((item, index) => (
        <div
          key={index}
          style={{ height: '100%', width: '100%' }}
          className='mt-2 border border-[#f0f0f0] p-3 mb-2 bg-body-tertiary rounded'
        >
          <div className='flex flex-wrap gap-3 justify-around'>
            {item?.images?.length > 0 && (
              <img
                style={{ height: '100px' }}
                className='rounded object-cover'
                width={100}
                src={item?.images[0]}
                alt={'tshirts'}
              />
            )}

            <div className='mt-2'>
              <h4 className='font-text text-[20px] font-bold'>{item?.title}</h4>
              <p className='mt-2 text-[14px] font-text'>
                {truncateText(item?.description, 30)}
              </p>
              <h5 className='font-text font-bold text-[14px] mt-2'>
                Quantity : {item?.quantity}
              </h5>
              <h5 className='font-text font-bold text-[14px] mt-2'>
                Size : {item?.size}
              </h5>
            </div>

            <div className='price' style={{marginTop:"40px"}}>
              <h5 className='font-text font-bold'>{item?.price}/- PKR</h5>
            </div>
          </div>
        </div>
      ))
    : 'No items in cart'
}
