import { addCart } from '@/redux/slices/cartSlice'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import RemoveBtn from '../RemoveBtn'
import Link from 'next/link'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { IoMdEye } from 'react-icons/io'
import "../style/style.css"


const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function ProductCard({ item, onReload }) {
  const { data: session } = useSession()

  const dispatch = useDispatch()
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const { cart } = useSelector(state => state.cart)

  // const addToCart = (id) => {
  //   let tempArr = [...cart];
  //   tempArr.push(item);
  //   dispatch(addCart(tempArr));
  // };

  const addToCart = () => {
    const tempArr = [...cart]
    const itemWithSelectedSize = {
      ...item,
      title: item.title,
      description: item.description,
      price: item.price,
      code: item.code,
      quantity: 1,
      size: "Medium"
    }
    tempArr.push(itemWithSelectedSize)
    dispatch(addCart(tempArr))
  }

  // const removeFromCart = (id) => {
  //   let tempArr = [...cart].filter((item) => item._id !== id);
  //   dispatch(addCart(tempArr));
  // };

  // const isInCart = (id) => {
  //   return cart.some((item) => item._id === id);
  // };

  const removeFromCart = id => {
    router.push('/cart')
  }

  const isInCart = id => {
    return cart.some(item => item._id === id)
  }
  const isOutOfStock = item?.stock === 'Out of Stock'

  let Discount
  if (item?.discount && !isOutOfStock) {
    Discount = (
      <div className='absolute top-2 right-2 bg-red-700 px-2 py-1 rounded'>
        <p className='text-white text-xs font-bold'>-{item?.discount}%</p>
      </div>
    )
  }

  let changePrice
  if (item?.disPrice && !isOutOfStock) {
    changePrice = (
      <h4 className='text-[12px] me-2 font-light'>
        <del>{item?.disPrice}/- PKR</del>
      </h4>
    )
  }

  let addButton

  if (session?.user?.email === 'nasah123@gmail.com') {
    addButton = (
      <Link href={`/edit-product?id=${item._id}`}>
        <div className='ml-2'>
          <FaRegEdit size={20} className='text-black' />
        </div>
      </Link>
    )
  }

  return (

    <>
      <div className='mb-5 rounded min-h-[450px]'>

        <div
          className='relative'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Link href={`/product/details?id=${item?._id}`}>
            {item?.images?.length > 0 && (
              <img
                style={{ height: '450px' }}
                className='rounded-t object-cover transition-all duration-300 ease-in-out'
                width={'100%'}
                src={hovered ? item?.images[1] : item?.images[0]} // Image toggle on hover
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
          <Link href={`/product/details?id=${item?._id}`}>
            <div className='hover-button rounded-circle border-2 border-white'>
              <i className='text-white'>
                <IoMdEye size={22} />
              </i>
            </div>
          </Link>

          <div
            id='addtocart'
            className={`${isOutOfStock
                ? 'cursor-not-allowed w-full border-2 border-black text-center p-2 hover:text-white'
                : 'w-full border-2 border-black text-center hover:bg-transparent p-2 bg-black text-white hover:cursor-pointer flex justify-around'
              }`}
          >
            <p
              onClick={() => {
                if (!isOutOfStock) {
                  isInCart(item?._id)
                    ? removeFromCart(item?._id)
                    : addToCart()
                }
              }}
              disabled={isOutOfStock}
              className='w-1/2 text-center'
            >
              {isInCart(item?._id) ? 'View Cart' : 'Add to cart'}
            </p>
            <p
              onClick={() => {
                if (!isInCart(item?._id) && !isOutOfStock) {
                  addToCart()
                  router.push('/cart')
                }
              }}
              disabled={isOutOfStock}
              className='w-1/2 text-center border-l border-white'
            >
              {isInCart(item?._id) ? 'Buy now' : 'Buy now'}
            </p>
          </div>
        </div>

        <div className='p-2'>
          <div>
            <h4 className='text-xl ml-2 mt-2 font-text font-semibold tracking-wider text-center text-gray-600'>
              {item?.title}
            </h4>
            <h4 className='text-[12px] mt-2 ml-2 font-text font-semibold tracking-wider text-center text-black'>
              {changePrice}
              <span className='text-red-700 font-text'>
                {item?.price}/- PKR
              </span>
            </h4>
          </div>

          <div className='ml-1'>
            <RemoveBtn id={item?._id} onReload={onReload} />
          </div>
          {addButton}

        </div>
      </div>
    </>
  )
}
