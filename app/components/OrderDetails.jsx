'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IoGridOutline } from 'react-icons/io5'
import { IoHomeOutline } from 'react-icons/io5'
import { BiSolidContact } from 'react-icons/bi'
import { MdOutlineRoundaboutRight } from 'react-icons/md'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { MdLocalOffer } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState, useCallback } from 'react'
import RemoveBtn3 from './RemoveBtn3'
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'react-bootstrap'
import { FaEye } from 'react-icons/fa'

const getAllCheckouts = async () => {
  try {
    const res = await fetch('/api/checkout')

    if (!res.ok) {
      throw new Error('Failed to fetch checkouts')
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.log('Error loading checkouts: ', error)
    return null
  }
}

function generateOrderNumber () {
  const date = new Date()
  const dateString = date.toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD
  const hours = date.getHours().toString().padStart(2, '0'); // HH
  const minutes = date.getMinutes().toString().padStart(2, '0'); // MM
  const seconds = date.getSeconds().toString().padStart(2, '0'); // SS
  
  const timeString = `${hours}:${minutes}:${seconds}`;

  return `ORD-${dateString}-${timeString}-`
}

export default function OrderDetails () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [subTotal, setSubTotal] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(200)
  const [total, setTotal] = useState(0)

  const [newdata, setNewData] = useState([])
  const [newOrders, setNewOrders] = useState(new Set());

  const handleGetOrder = useCallback(async () => {
    try {
      const response = await fetch('/api/checkout');
      const result = await response.json();
      const orders = result.Checkouts || [];
      setNewData(orders);

      // Get viewed orders from localStorage
      const viewedOrders = JSON.parse(localStorage.getItem('viewedOrders') || '[]');

      // Mark new orders
      const currentTime = new Date().getTime();
      const newOrderIds = new Set(
        orders
          .filter(order => 
            currentTime - new Date(order.createdAt).getTime() < 24 * 60 * 60 * 1000 &&
            !viewedOrders.includes(order._id)
          )
          .map(order => order._id)
      );
      setNewOrders(newOrderIds);
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }, []);

  useEffect(() => {
    handleGetOrder();
  }, [handleGetOrder]);

  // Last index logic
  const randomNumber =
    newdata.length > 0
      ? 10000 + (newdata.length - 1)
      : Math.floor(1000 + Math.random() * 9000) // Fallback random number
  const lastOrderNumber = generateOrderNumber()

  const handleOpen = item => {
    setOpen(true);
    setPreviewOrder(item);
    removeNewLabel(item._id);

    // Update localStorage
    const viewedOrders = JSON.parse(localStorage.getItem('viewedOrders') || '[]');
    if (!viewedOrders.includes(item._id)) {
      viewedOrders.push(item._id);
      localStorage.setItem('viewedOrders', JSON.stringify(viewedOrders));
    }
  };

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setPreviewOrder('')
    }, 200)
  }

  const removeNewLabel = (orderId) => {
    setNewOrders(prevNewOrders => {
      const updatedNewOrders = new Set(prevNewOrders);
      updatedNewOrders.delete(orderId);
      return updatedNewOrders;
    });
  };


  const [previewOrder, setPreviewOrder] = useState('')

  const { data: session } = useSession()

  useEffect(() => {
    if (previewOrder) {
      setSubTotal(
        previewOrder.products.reduce(
          (acc, item) => acc + parseInt(item.price),
          0
        )
      )
    }
  }, [previewOrder])

  useEffect(() => {
    if (subTotal > 0) {
      setTotal(parseInt(subTotal) + parseInt(deliveryCharges))
    }
  }, [subTotal, deliveryCharges]) // Added deliveryCharges here

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllCheckouts()
      console.log(
        'checkouts',
        result?.Checkouts?.map(item => ({
          ...item,
          products: item.products.map(prd => ({
            ...prd.product_id,
            quantity: prd.quantity,
            price: prd.price,
            size: prd.size
          }))
        }))
      )
      setData(
        result?.Checkouts?.map(item => ({
          ...item,
          products: item.products.map(prd => ({
            ...prd.product_id,
            quantity: prd.quantity,
            price: prd.price,
            size: prd.size
          }))
        }))
      )
      setLoading(false)
    }

    fetchData()
  }, [])
  const [showModal, setShowModal] = useState(false)

  const handleImageClick = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Modal
        show={open}
        onBackdropClick={handleClose}
        onEscapeKeyDown={handleClose}
        onHide={handleClose}
        className='common-modal'
        size='lg'
        centered
      >
        <ModalHeader>
          <div className='d-flex justify-content-center w-100 px-1 py-0'>
            <p className='title  py-0 text-center text-3xl'>
              {'Order Details'}
            </p>
          </div>
        </ModalHeader>
        <ModalBody>
          {/* Products */}
          {previewOrder ? (
            <div key={previewOrder._id}>
              <div className='row'>
                {previewOrder.products.map((prod, inxp) => (
                  <>
                    <div className='col-lg-1' style={{ marginTop: '34px' }}>
                      <p>{inxp + 1}.</p>
                    </div>

                    <div className='col-lg-2' style={{ marginTop: '37px' }}>
                      <h3>{prod?.title}</h3>
                    </div>
                    <div
                      className='col-lg-3 line-clamp-3'
                      style={{ marginTop: '34px' }}
                    >
                      <p>{prod.description}</p>
                    </div>
                    <div className='col-lg-1' style={{ marginTop: '34px' }}>
                      <p>{prod.code}</p>
                    </div>
                    <div className='col-lg-1' style={{ marginTop: '34px' }}>
                      <p>Rs:{prod.price}</p>
                    </div>
                    <div
                      className='col-lg-1 text-[13px] text-center'
                      style={{ marginTop: '34px' }}
                    >
                      <p>Quantity:{prod.quantity}</p>
                    </div>
                    <div
                      className='col-lg-2 text-[13px] text-center'
                      style={{ marginTop: '34px' }}
                    >
                      <p>size:{prod.size}</p>
                    </div>
                    <div className='col-lg-1'>
                      <img
                        src={prod.images[0]}
                        alt='cap'
                        width={40}
                        className='mt-4'
                      />
                    </div>
                  </>
                ))}
              </div>
              <br />
              <br />
              <br />
              <div className='row'>
                <div className='col-lg-6 mt-5 border border-[#f0f0f0] p-3 mb-5 bg-body-tertiary rounded'>
                  <div className='mt-3'>
                    {/* {data.map((item, index) => (
                      <p key={index}>{${lastOrderNumber}${pre}}</p>
                    ))} */}
                    <p>{previewOrder?.orderNumber}{previewOrder?.serialnumber}</p><br />

                    <p>Email : {previewOrder?.email}</p>
                    <br />
                    <p>Phone Number : {previewOrder?.num}</p>
                    <br />
                    <p>Name : {previewOrder?.name}</p>
                    <br />
                    <p>Country : {previewOrder?.country}</p>
                    <br />
                    <p>City : {previewOrder?.city}</p>
                    <br />
                    <p>Address : {previewOrder?.address}</p>
                    <br />
                    <p>Payment Method : {previewOrder?.paymentMethod}</p>
                    <br />
                    <img
                      src={previewOrder?.slipimg}
                      alt='Preview'
                      style={{
                        width: '200px',
                        height: '200px',
                        cursor: 'pointer'
                      }}
                      onClick={handleImageClick}
                    />

                    {/* Modal */}
                    {showModal && (
                      <div
                        className='modal'
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          zIndex: 1000
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px'
                          }}
                        >
                          <img
                            src={previewOrder?.slipimg}
                            alt='Full Size Preview'
                            style={{ maxWidth: '100%', maxHeight: '80vh' }}
                          />
                          <button
                            onClick={handleCloseModal}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              backgroundColor: '#222222',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '30px',
                              height: '30px',
                              cursor: 'pointer'
                            }}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='container mt-5'>
                    <div className='flex flex-wrap'>
                      <div
                        style={{ height: '100%', width: 600 }}
                        className='mt-2 border border-[#f0f0f0] p-3 mb-5 bg-body-tertiary rounded'
                      >
                        <div>
                          <h3 className='text-3xl text-center font-sans font-bold'>
                            Cart Total
                          </h3>
                          <br />
                          <hr />
                          <br />
                          <br />
                          <div className='flex flex-wrap justify-between p-2'>
                            <div>
                              <h5 className='font-sans text-lg font-bold'>
                                Subtotal
                              </h5>
                            </div>
                            <div>
                              <h6 className='font-sans text-lg font-bold'>
                                {subTotal}/- PKR
                              </h6>
                            </div>
                          </div>
                          <hr />
                          <div className='flex flex-wrap justify-between p-2'>
                            <div>
                              <h5 className='font-sans text-lg font-bold'>
                                Delivery Charges
                              </h5>
                            </div>
                            <div>
                              <h6 className='font-sans text-lg font-bold'>
                                {deliveryCharges}/- PKR
                              </h6>
                            </div>
                          </div>
                          <hr />
                          <div className='flex flex-wrap justify-between p-2'>
                            <div>
                              <h5 className='font-sans text-lg font-bold'>
                                Total
                              </h5>
                            </div>
                            <div>
                              <h6 className='font-sans text-lg font-bold'>
                                {total}/- PKR
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>No details found</div>
          )}
        </ModalBody>
      </Modal>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-2 col-md-4 bg-[#222222] p-4'>
            <Link href={'/dashboard'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <IoGridOutline size={25} style={{ color: 'white' }} />
                </div>
                <div>
                  <p className='text-white text-center text-md '>Dashboard</p>
                </div>
              </div>
            </Link>
            <Link href={'/'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <IoHomeOutline size={25} style={{ color: 'white' }} />
                </div>
                <div>
                  <p className='text-white text-center text-md '>Home</p>
                </div>
              </div>
            </Link>
            <Link href={'/contact'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <BiSolidContact size={25} style={{ color: 'white' }} />
                </div>
                <div>
                  <p className='text-white text-center text-md '>Contact</p>
                </div>
              </div>
            </Link>
            <Link href={'/about'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <MdOutlineRoundaboutRight
                    size={25}
                    style={{ color: 'white' }}
                  />
                </div>
                <div>
                  <p className='text-white text-center text-md '>About</p>
                </div>
              </div>
            </Link>
            <Link href={'/category'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <MdOutlineProductionQuantityLimits
                    size={25}
                    style={{ color: 'white' }}
                  />
                </div>
                <div>
                  <p className='text-white text-center text-md '>Products</p>
                </div>
              </div>
            </Link>
            <Link href={'/#offers'}>
              <div className='flex gap-4 hover:bg-[#239ED0] p-2 mt-3 rounded'>
                <div>
                  <MdLocalOffer size={25} style={{ color: 'white' }} />
                </div>
                <div>
                  <p className='text-white text-center text-md '>
                    Special Offers
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className='col-lg-10 col-md-8'>
            <div className='m-3'>
              <h1 className='text-2xl font-semibold '>All Orders</h1>
              <div className='mt-3 border border-[#f0f0f0] p-3 mb-3 bg-[#222222] rounded'>
                <div className='row'>
                  <div className='col-lg-1'>
                    <p className='text-sm text-white text-center'>S.No</p>
                  </div>
                  <div className='col-lg-2'>
                    <p className='text-sm text-white text-center'>Name</p>
                  </div>
                  <div className='col-lg-2'>
                    <p className='text-sm text-white text-center'>Email</p>
                  </div>
                  <div className='col-lg-2'>
                    <p className='text-sm text-white text-center'>
                      Phone Number
                    </p>
                  </div>
                  <div className='col-lg-2'>
                    <p className='text-sm text-white text-center'>Country</p>
                  </div>
                  <div className='col-lg-2'>
                    <p className='text-sm text-white text-center'>Address</p>
                  </div>
                </div>
              </div>
              {loading ? (
                <div className='flex items-center justify-center h-full w-full my-5 py-5'>
                  <Spinner color='#000' size='xl' />
                </div>
              ) : data ? (
                data.map((item, index) => (
                  <div key={item._id}>
                    <div className="mt-3 border border-[#f0f0f0] p-3 mb-3 bg-body-tertiary rounded relative">
                      {newOrders.has(item._id) && (
                        <span className="absolute top-0 left-0 bg-green-500 text-white text-[9px] px-2 py-1 rounded-br">New</span>
                      )}
                      <div className='row'>
                        <div className='col-lg-1'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item?.serialnumber}
                          </p>
                        </div>
                        <div className='col-lg-2'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item.name}
                          </p>
                        </div>
                        <div className='col-lg-2'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item.email}
                          </p>
                        </div>
                        <div className='col-lg-2'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item.num}
                          </p>
                        </div>
                        <div className='col-lg-2'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item.country}
                          </p>
                        </div>
                        <div className='col-lg-2'>
                          <p
                            style={{ marginTop: '8px' }}
                            className='text-sm text-black text-center'
                          >
                            {item.address}
                          </p>
                        </div>

                        <div className='col-lg-1 flex items-center justify-center gap-[1.5rem]'>
                          <div className='mt-1'>
                            <RemoveBtn3 id={item._id} />
                          </div>
                          <div
                            onClick={() => handleOpen(item)}
                            className='cursor-pointer'
                          >
                            <FaEye size={24} color='#000' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className='flex items-center justify-center h-full w-full my-5 py-5'>
                  No information available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

