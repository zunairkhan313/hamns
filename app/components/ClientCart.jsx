'use client'
import { MdDeliveryDining } from 'react-icons/md'
import cash from '../../public/image/cash.webp'
import online from '../../public/image/online.png'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProductCardCart from './products/productCardCart'
import { useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import Swal from 'sweetalert2'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import '../components/hr.css'
import Image from 'next/image'
import easy from '../../public/image/easy.png'
import jazz from '../../public/image/jazz.png'
// import meezan from '../../public/image/meezan.png'
// import ProductCardCheckout from './products/productCardCheckout'

export default function ClientCart () {
  const { cart } = useSelector(state => state.cart)
  const [city, setCity] = useState('')
  const [num, setNum] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD') // Default value is 'cod'

  const form = useRef()
  const handlePaymentChange = e => {
    setPaymentMethod(e.target.value)
  }

  const router = useRouter()

  const [subTotal, setSubTotal] = useState(0)
  const [deliveryCharges, setDeliveryCharges] = useState(200)
  const [total, setTotal] = useState(0)
  const [slipimg, setSlipImg] = useState('')

  const handleUploadImage = e => {
    const files = e.target.files
    const urls = []

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()

      reader.onload = e => {
        urls.push(e.target.result)
        if (urls.length === files.length) {
          setSlipImg(urls)
        }
      }

      reader.readAsDataURL(files[i])
    }
  }

  useEffect(() => {
    setSubTotal(cart.reduce((acc, item) => acc + parseInt(item.price), 0))
  }, [cart])

  useEffect(() => {
    if (subTotal > 0) {
      setTotal(parseInt(subTotal) + parseInt(deliveryCharges))
    }
  }, [subTotal, deliveryCharges])

  const { data: session } = useSession()

  const capitalizeFirstLetter = text => {
    if (!text) return text
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const handleItemClick = details => {
    setModalContent(details) // Set the content for the modal
    setShowModal(true) // Show the modal
  }
  const handleCloseModal = () => {
    setShowModal(false) // Hide the modal
    setModalContent('') // Reset the modal content
  }

  const onSubmitAddress = async e => {
    e.preventDefault()

    // Validation
    if (!email) return alert('Please input email')
    if (!num) return alert('Please input number')
    if (!name) return alert('Please input name')
    if (!country) return alert('Please input country')
    if (!city) return alert('Please input city')
    if (!address) return alert('Please input address')
    if (paymentMethod === 'onlinePayment' && slipimg.length === 0) {
      return alert('Please upload an image for the online payment slip.')
    }

    const capitalizedName = capitalizeFirstLetter(name)
    const capitalizedCountry = capitalizeFirstLetter(country)
    const capitalizedCity = capitalizeFirstLetter(city)
    const capitalizedAddress = capitalizeFirstLetter(address)

    const products = cart.map((item, index) => ({
      product_id: item._id || item.product_id,
      // selectedSize: item.selectedSize,
      price: item.price,
      quantity: item.quantity,
      size: item.size
    }))

    const emailProducts = cart
      .map(
        (item, index) => `Product ${index + 1}:
  - Name: ${item.title}
  - Price: ${item.price}
  - Quantity: ${item.quantity}`
      )
      .join('\n')

    const message = `
Name: ${capitalizedName}
Email: ${email}
Phone: ${num}
Country: ${capitalizedCountry}
City: ${capitalizedCity}
Address: ${capitalizedAddress}
Payment Method: ${paymentMethod}
Products:\n${emailProducts}`

    try {
      // Send data to API
      const res = await fetch(`/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email,
          num,
          name: capitalizedName,
          country: capitalizedCountry,
          city: capitalizedCity,
          address: capitalizedAddress,
          products,
          paymentMethod,
          slipimg
        })
      })

      if (res.ok) {
        Swal.fire({
          title: 'Order Placed Successfully!',
          text: 'Your action was successful!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        router.push('/order')
      } else {
        throw new Error('Failed to submit address')
      }

      // Send email via Web3Forms
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '8b0421b3-04d4-4eb5-a77c-7c52287013bd',
          name: capitalizedName,
          email: email,
          phone: num,
          subject: 'New Order from Client',
          message: message
        })
      })

      if (emailResponse.ok) {
        console.log('Email sent successfully')
      } else {
        console.error('Failed to send email')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }



  return (
    <>
      <div className='text-5xl font-extrabold tracking-wider bgVideoText mt-5'>
        <h1 className='heading text-black font-extrabold font-text italic text-center'>
          Cart
        </h1>
      </div>

      <div className='container mt-[30px] mb-5'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='bg-body-tertiary p-5 border border-[#f0f0f0] rounded'>
              <div className='flex gap-2'>
                <p className='flex font-text'>
                  This is a &nbsp;
                  <span className='font-bold font-text'>DELIVERY ORDER</span>
                </p>
                <MdDeliveryDining
                  style={{ marginTop: '-10px' }}
                  size={33}
                  className='text-red-700'
                />
              </div>
              <p className='mt-2 font-text'>
                Just a last step, please enter your details:
              </p>

              <label htmlFor='name' className='mt-4 font-text'>
                Full Name
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Full Name'
                onChange={e => setName(e.target.value)}
              />

              <label htmlFor='name' className='mt-4 font-text'>
                Mobile Number
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='03xx-xxxxxxx'
                onChange={e => setNum(e.target.value)}
              />

              <label htmlFor='name' className='mt-4 font-text'>
                Email Address
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Email Address'
                onChange={e => setEmail(e.target.value)}
              />
              <label htmlFor='name' className='mt-4 font-text'>
                Country
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Country'
                onChange={e => setCountry(e.target.value)}
              />
              <label htmlFor='name' className='mt-4 font-text'>
                City
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='City'
                onChange={e => setCity(e.target.value)}
              />

              <label htmlFor='name' className='mt-4 font-text'>
                Delivery Address
              </label>
              <br />
              <input
                type='text'
                className='py-3 px-4 shadow-md rounded mt-2 w-full'
                placeholder='Enter your complete address'
                onChange={e => setAddress(e.target.value)}
              />

             

              <p className='font-bold mt-5 font-text'>Payment Information</p>
              <div className='flex gap-3'>
                {/* Cash on Delivery */}
                <div
                  className={`p-3 mt-4 rounded cursor-pointer ${
                    paymentMethod === 'COD'
                      ? 'border-2 border-[#ff4c1b]'
                      : 'border border-gray-300'
                  }`}
                  style={{ width: '190px' }}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <center>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        id='cod'
                        value='COD'
                        className='hidden'
                        onChange={handlePaymentChange}
                        checked={paymentMethod === 'COD'}
                      />
                      <label htmlFor='cod' className='ml-3 cursor-pointer font-text'>
                        <Image src={cash} alt='Cash On Delivery' width={70} />
                        COD
                        <p className='font-text'>Cash On Delivery</p>
                      </label>
                    </div>
                  </center>
                </div>

                {/* Online Payment */}
                <div
                  className={`p-3 mt-4 rounded cursor-pointer ${
                    paymentMethod === 'onlinePayment'
                      ? 'border-2 border-[#ff4c1b]'
                      : 'border border-gray-300'
                  }`}
                  style={{ width: '190px' }}
                  onClick={() => setPaymentMethod('onlinePayment')}
                >
                  <center>
                    <input
                      type='radio'
                      name='paymentMethod'
                      id='onlinePayment'
                      value='onlinePayment'
                      className='hidden'
                      onChange={handlePaymentChange}
                      checked={paymentMethod === 'onlinePayment'}
                    />
                    <label
                      htmlFor='onlinePayment'
                      className='ml-3 cursor-pointer'
                    >
                      <Image src={online} alt='Online Payment' width={230} />
                      <p className='font-text'>Online Payment</p>
                    </label>
                    <br />

                    {/* Conditionally Show Online Payment Details */}
                    {paymentMethod === 'onlinePayment' && (
                      <div>
                        <div className='flex justify-around mt-3'>
                          {/* Easy Payment */}
                          <div>
                            <Image
                              src={easy}
                              style={{ width: '65px', height: '60px' }}
                              alt='Easy Payment'
                              onClick={() =>
                                handleItemClick('-----------------')
                              }
                              className='cursor-pointer'
                            />
                          </div>

                          {/* Jazz Payment */}
                          <div>
                            <Image
                              src={jazz}
                              style={{ width: '65px', height: '60px' }}
                              alt='Jazz Payment'
                              onClick={() =>
                                handleItemClick('-----------------')
                              }
                              className='cursor-pointer'
                            />
                          </div>

                          {/* Meezan Payment */}
                          {/* <div>
                            <Image
                              src={meezan}
                              style={{ width: '85px', height: '57px' }}
                              alt='Meezan Payment'
                              onClick={() =>
                                handleItemClick(
                                  <>
                                    <span className='font-bold'>
                                      Account Title:
                                    </span>
                                    SINO-PAK TRADING CO
                                    <br />
                                    <span className='font-bold'>
                                      Account Number:
                                    </span>
                                    01560110265747
                                    <br />
                                    <span className='font-bold'>IBAN:</span>
                                    PK28MEZN0001560110265747
                                  </>
                                )
                              }
                              className='cursor-pointer'
                            />
                          </div> */}
                        </div>
                        <br />
                        <label
                          htmlFor='file-upload-product'
                          className='custom-file-upload1 w-[100%]'
                        >
                          <div className='flex justify-between'>
                            <div>Receipt Upload</div>
                            <div>
                              <ControlPointIcon />
                            </div>
                          </div>
                        </label>
                        <input
                          id='file-upload-product'
                          type='file'
                          className='hidden'
                          onChange={handleUploadImage}
                          multiple
                        />
                      </div>
                    )}
                  </center>
                </div>

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
                        borderRadius: '10px',
                        maxWidth: '500px',
                        textAlign: 'center'
                      }}
                    >
                      <p style={{ fontSize: '16px', margin: '20px 0' }}>
                        {modalContent}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'red',
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
          </div>
          <div className='col-lg-6'>
            <div className='bg-body-tertiary p-4 border border-[#f0f0f0] rounded'>
              <ProductCardCart />

              <div className='container mt-5'>
                <div className='flex flex-wrap'>
                  <div
                    style={{ height: '100%', width: 600 }}
                    className='mt-2 p-3 mb-5 bg-body-tertiary'
                  >
                    <div>
 
                      <hr />

                      <br />
                      <br />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>
                            Subtotal
                          </h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {subTotal}
                          </h6>
                        </div>
                      </div>
                      <hr />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>
                            Delivery Charges
                          </h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {deliveryCharges}
                          </h6>
                        </div>
                      </div>
                      <hr />
                      <div className='flex flex-wrap justify-between p-2'>
                        <div>
                          <h5 className='font-text text-lg font-bold'>Total</h5>
                        </div>
                        <div>
                          <h6 className='font-text text-lg font-bold'>
                            Rs: {total}
                          </h6>
                        </div>
                      </div>
                      <hr />

                      <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                        <button
                          onClick={onSubmitAddress}
                          className='flex mt-4 bg-red-700 text-white hover:bg-[#222222] font-bold py-3 px-10 rounded tracking-wider'
                        >
                          Order Place
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
