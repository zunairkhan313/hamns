'use client'

import React, { useEffect, useState } from 'react'
import StarRateIcon from '@mui/icons-material/StarRate'
import { FaTruckFast } from 'react-icons/fa6'
import { BsShieldCheck } from 'react-icons/bs'
import { useSearchParams } from 'next/navigation'
import { addCart } from '@/redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import '../style/style.css'

export default function ProductDetails() {
  const params = useSearchParams()
  let id = params.get('id')
  const router = useRouter()
  const [product, setProduct] = useState({})

  const handleGetProducts = async () => {
    try {
      const res = await fetch(`/api/products/?id=${id}`)
      const data = await res.json()
      if (data?.product) {
        setProduct(data.product)
      } else {
        alert('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    }
  }

  useEffect(() => {
    handleGetProducts()
  }, [id])

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  /* Active Image */
  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0) // State for total price

  useEffect(() => {
    if (product && product?.images?.length > 0) {
      setActiveImage(product?.images[0])
    }
  }, [product])

  const dispatch = useDispatch()
  const { cart } = useSelector(state => state.cart)

  useEffect(() => {
    // Recalculate total price when quantity or price changes
    const priceBySize = product.price || 0
    setTotalPrice(quantity * priceBySize)
  }, [quantity, product.price])

  const newprice = totalPrice

  // const addToCart = () => {
  //   const tempArr = [...cart]
  //   const itemWithSelectedSize = {
  //     ...product,
  //     title: product.title,
  //     description: product.description,
  //     price: newprice,
  //     code: product.code,
  //     quantity: quantity
  //   }
  //   tempArr.push(itemWithSelectedSize)
  //   dispatch(addCart(tempArr))
  // }

  const addToCart = () => {
    const itemWithSelectedSize = {
      ...product,
      title: product.title,
      description: product.description,
      price: newprice,
      code: product.code,
      quantity: quantity,
      size:selectedSize
    }

    // Check if product with the same ID and selected size exists in the cart
    const existingProductIndex = cart.findIndex(
      cartItem =>
        cartItem._id === product._id
    )

    let updatedCart = [...cart]

    if (existingProductIndex >= 0) {
      // If the item exists, update its quantity and price
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: updatedCart[existingProductIndex].quantity + quantity,
        price: newprice
      }
    } else {
      // If the item doesn't exist, add it to the cart
      updatedCart.push(itemWithSelectedSize)
    }

    // Dispatch the updated cart
    dispatch(addCart(updatedCart))
  }

  const viewCart = () => {
    const existingProductIndex = cart.findIndex(
      cartItem =>
        cartItem._id === product._id
    )

    let updatedCart = [...cart]
    const itemWithSelectedSize = {
      ...product,
      title: product.title,
      description: product.description,
      price: newprice,
      code: product.code,
      quantity: quantity,
      size:selectedSize
    }

    if (existingProductIndex >= 0) {
      const existingItem = updatedCart[existingProductIndex]

      // Check if quantity has changed; if so, update it; otherwise, keep existing quantity
      updatedCart[existingProductIndex] = {
        ...existingItem,
        quantity:
          existingItem.quantity !== quantity ? quantity : existingItem.quantity,
        price: newprice
      }
    } else {
      // If the item doesn't exist, add it to the cart with the current quantity
      updatedCart.push(itemWithSelectedSize)
    }

    // Dispatch the updated cart
    dispatch(addCart(updatedCart))
    router.push('/cart')
  }

  const isInCart = id => {
    return cart.some(product => product._id === id)
  }

  // Quantity Handlers
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  const isOutOfStock = product?.stock === 'Out of Stock'

  let Discount
  if (product?.discount && !isOutOfStock) {
    Discount = (
      <div className='absolute top-2 right-2 bg-[#222222] px-2 py-1 rounded'>
        <p className='text-white text-xs font-bold'>-{product?.discount}%</p>
      </div>
    )
  }

  let changePrice
  if (product?.disPrice && !isOutOfStock) {
    changePrice = (
      <h4 className='text-xl lg:text-2xl font-text me-3'>
        <del>{product?.disPrice}/- PKR</del>
      </h4>
    )
  }



  return (
    <>
      <div className='container mx-auto p-4 mt-24'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Image Section */}
          <div className='lg:w-1/2'>
            <div className='relative overflow-hidden w-full h-72 md:h-96 lg:h-[520px]'>
              {activeImage && (
                <img
                  src={activeImage}
                  alt={product.title || 'Product Image'}
                  className='object-cover w-full h-full border border-gray-200 transition-transform duration-500 ease-in-out transform hover:scale-150'
                />
              )}
              {Discount}
              {isOutOfStock && (
                <div
                  className='absolute p-2 top-0 left-0'
                  style={{ backgroundColor: '#222222' }}
                >
                  <h3 className='text-white font-bold text-md'>Sold Out</h3>
                </div>
              )}
            </div>
            <div className='flex flex-wrap justify-center mt-4 gap-2'>
              {product?.images?.length > 0 &&
                product?.images?.map(img => (
                  <img
                    key={img}
                    src={img}
                    alt={product.title || 'Product Thumbnail'}
                    className='cursor-pointer object-cover border border-gray-300 w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28'
                    onClick={() => setActiveImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* Details Section */}
          <div className='lg:w-1/2 flex flex-col'>
            <h1 className='text-2xl lg:text-3xl font-bold font-text'>{product?.title} - {product?.code}</h1>

            <div className='flex items-center mt-2'>
              {/* Star Ratings */}
              <div className='flex'>
                {[...Array(5)].map((_, index) => (
                  <StarRateIcon
                    key={index}
                    className='text-yellow-400'
                    style={{ fontSize: '20px' }}
                  />
                ))}
              </div>
              <span className='ml-2 text-sm text-gray-600 font-text'>(5 Reviews)</span>
            </div>

            <p className='text-xl lg:text-2xl font-semibold mt-4 flex font-text'>
              {changePrice}
              {newprice}/- PKR
            </p>
            <div className="mt-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-2 py-2 text-center">Size</th>
            {product?.sizes?.map((size, index) => (
              <td
                key={index}
                className={`border border-gray-300 px-4 py-2 text-center cursor-pointer 
                ${selectedSize === size ? "bg-red-700 text-white font-bold" : "bg-gray-100"}`}
                onClick={() => handleSizeClick(size)}
              >
                {size.charAt(0)}
              </td>
            ))}
          </tr>
        </thead>
      </table>

      
    </div>
            <div className='col-lg-2'>
              <div className='flex text-center mt-4'>
                <div
                  className='border border-black px-2 cursor-pointer'
                  onClick={decreaseQuantity}
                >
                  <p>-</p>
                </div>
                <div className='border border-black px-2'>
                  <p className='font-text'>{quantity}</p>
                </div>
                <div
                  className='border border-black px-2 cursor-pointer'
                  onClick={increaseQuantity}
                >
                  <p>+</p>
                </div>
              </div>
            </div>
            <p className='mt-4 text-gray-700 font-text'>{product?.description}</p>

            <hr className='my-6' />

            {/* Quantity and Actions */}
            <div className='flex flex-wrap gap-2'>

              <div
                id='hoverbuy'
                className={` ${isOutOfStock
                    ? 'cursor-not-allowed w-full border-2 border-black text-center p-2 bg-black hover:bg-white  text-white'
                    : 'w-full border-2 border-black text-center p-2 bg-black   text-white hover:cursor-pointer'
                  }`}
                onClick={() => {
                  if (!isOutOfStock) {
                    isInCart(product._id)
                      ? viewCart(product._id)
                      : addToCart()
                    router.push('/cart')
                  }
                }}
                disabled={isOutOfStock}
              >
                {isInCart(product._id) ? 'Buy now' : 'Buy now'}
              </div>
              <div
                id='hoverdet'
                className={` ${isOutOfStock
                    ? 'cursor-not-allowed w-full border-2 border-red-700 text-center p-2 bg-red-700 hover:bg-white  text-white'
                    : 'w-full border-2 border-red-700 text-center p-2 bg-red-700 hover:bg-white  text-white hover:cursor-pointer'
                  }`}
                onClick={() => {
                  if (!isOutOfStock) {
                    isInCart(product._id)
                      ? viewCart(product._id)
                      : addToCart()
                  }
                }}
                disabled={isOutOfStock}
              >
                {isInCart(product._id) ? 'View Cart' : 'Add to cart'}
              </div>
            </div>

            {/* Features */}
            <div className='flex flex-col mt-8 space-y-4'>
              {/* Fast Delivery */}
              <div className='flex items-center'>
                <div className='flex-shrink-0 bg-black p-4 rounded-full'>
                  <FaTruckFast size={24} className='text-white' />
                </div>
                <div className='ml-4'>
                  <h2 className='text-lg font-semibold '>FAST DELIVERY</h2>
                  <p className='text-sm text-gray-600'>
                    {/* Free delivery for all orders over 1000 */}
                    Under 3-5 Working Days
                  </p>
                </div>
              </div>

              {/* Money Back Guarantee */}
              <div className='flex items-center'>
                <div className='flex-shrink-0 bg-black p-4 rounded-full'>
                  <BsShieldCheck size={24} className='text-white' />
                </div>
                <div className='ml-4'>
                  <h2 className='text-lg font-semibold'>
                    {/* MONEY BACK GUARANTEE */}
                    EXCHANGE POLICY
                  </h2>
                  <p className='text-sm text-gray-600'>
                    You can Exchange with in a week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
