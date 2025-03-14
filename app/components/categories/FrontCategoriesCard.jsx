import { useState } from 'react'
import Link from 'next/link'

import { addCart } from '@/redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { FaRegEdit } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import '../style/style.css'
import { IoMdEye } from 'react-icons/io'
import FrontRemovebtn from '../FrontRemovebtn'

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function FrontCategoriesCard ({ items }) {
  const { data: session } = useSession()

  const [hovered, setHovered] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const { cart } = useSelector(state => state.cart)

  const addToCart = () => {
    const tempArr = [...cart]
    const itemWithSelectedSize = {
      ...items,
      title: items.title,
      price: items.price,
      code: items.code,
      quantity: 1
    }
    tempArr.push(itemWithSelectedSize)
    dispatch(addCart(tempArr))
  }

  const removeFromCart = id => {
    router.push('/cart')
  }

  const isInCart = id => {
    return cart.some(item => item._id === id)
  }

  const isOutOfStock = items?.stock === 'Out of Stock'

  let Discount
  if (items?.discount && !isOutOfStock) {
    Discount = (
      <div className='absolute top-2 right-2 bg-red-700 px-2 py-1 rounded'>
        <p className='text-white text-xs font-bold font-text'>-{items?.discount}%</p>
      </div>
    )
  }

  let changePrice
  if (items?.disPrice && !isOutOfStock) {
    changePrice = (
      <h4 className='text-[12px] me-2 font-text'>
        <del>{items?.disPrice}/- PKR</del>
      </h4>
    )
  }

  let addButton

  if (session?.user?.email === 'nasah123@gmail.com') {
    addButton = (
      <Link href={`/edit-product?id=${items?._id}`}>
        <div className='ml-2'>
          <FaRegEdit size={20} className='text-black' />
        </div>
      </Link>
    )
  }

  return (
    <>
      <div className='mb-5 rounded min-h-[360px]'>
       
        <div
          className='relative'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Link href={`/product/details?id=${items?._id}`}>
            {items?.images?.length > 0 && (
              <img
                style={{ height: '360px' }}
                className='rounded-t object-cover transition-all duration-300 ease-in-out'
                width={'100%'}
                src={hovered ? items?.images[1] : items?.images[0]} // Image toggle on hover
                alt={'product'}
              />
            )}
          </Link>
          {Discount}
          {isOutOfStock && (
            <div
              className='absolute p-2 top-0 left-0'
              style={{ backgroundColor: '#222222' }}
            >
              <h3 className='text-white font-bold text-md font-text'>Sold Out</h3>
            </div>
          )}
          <Link href={`/product/details?id=${items?._id}`}>
            <div className='hover-button rounded-circle border-2 border-white'>
              <i className='text-white'>
                <IoMdEye size={22} />
              </i>
            </div>
          </Link>
          <div
            id='addtocart'
            className={`${
              isOutOfStock
                ? 'cursor-not-allowed w-full border-2 border-black text-center p-2 hover:text-white'
                : 'w-full border-2 border-black text-center hover:bg-transparent p-2 bg-black text-white hover:cursor-pointer flex justify-around'
            }`}
          >
            <p
              onClick={() => {
                if (!isOutOfStock) {
                  isInCart(items?._id)
                    ? removeFromCart(items?._id)
                    : addToCart()
                }
              }}
              disabled={isOutOfStock}
              className='w-1/2 text-center'
            >
              {isInCart(items?._id) ? 'View Cart' : 'Add to cart'}
            </p>
            <p
              onClick={() => {
                if (!isInCart(items?._id) && !isOutOfStock) {
                  addToCart()
                  router.push('/cart')
                }
              }}
              disabled={isOutOfStock}
              className='w-1/2 text-center border-l border-white'
            >
              {isInCart(items?._id) ? 'Buy now' : 'Buy now'}
            </p>
          </div>
        </div>

        <div className='p-2'>
          <div>
            <h4 className='text-xl ml-2 mt-2 font-text font-semibold tracking-wider text-center text-gray-600'>
              {items?.title}
            </h4>
            <h4 className='text-[12px] mt-2 font-text ml-2 font-semibold tracking-wider text-center text-black'>
              {changePrice}
              <span className='text-red-700 font-text'>

              {items?.price}/- PKR
              </span>
            </h4>
          </div>
          {/* <div className='flex justify-around'>
          <div className='mt-3'>
            <h4 className='text-[12px] ml-2 font-bold flex text-white'>
              {changePrice}
              {items?.price}/- PKR
            </h4>
          </div>
          <div className='mt-3'>
            <h4 className='text-[14px] ml-2 font-bold text-white'>
              {items?.code}
            </h4>
          </div>
        </div> */}
          <div className='ml-1'>
            <FrontRemovebtn id={items?._id} />
          </div>
          {addButton}
          {/* <div className='flex justify-center'>
          <p className='text-sm mt-2 font-semibold'>
            <StarRateIcon style={{ fontSize: '20px', color: '#FFE234' }} />
            <StarRateIcon style={{ fontSize: '20px', color: '#FFE234' }} />
            <StarRateIcon style={{ fontSize: '20px', color: '#FFE234' }} />
            <StarRateIcon style={{ fontSize: '20px', color: '#FFE234' }} />
            <StarRateIcon style={{ fontSize: '20px', color: '#FFE234' }} />
          </p>
        </div> */}
        </div>
      </div>
    </>
  )
}
