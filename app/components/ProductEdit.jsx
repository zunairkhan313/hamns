'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

const ProductEdit = ({ productId }) => {
  const router = useRouter()

  const [product, setProduct] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState([])
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [disPrice, setDisPrice] = useState('')
  const [code, setCode] = useState('')
  const [stock, setStock] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${productId}`)
        if (!res.ok) throw new Error('Failed to fetch product data')

        const data = await res.json()
        if (!data || !data.product)
          throw new Error('Product data is missing or invalid')

        setProduct(data.product)
        setTitle(data.product.title)
        setDescription(data.product.description)
        setImg(data.product.images)
        setPrice(data.product.price)
        setDiscount(data.product.discount)
        setDisPrice(data.product.disPrice)
        setCode(data.product.code)
        setStock(data.product.stock)
        setCategoryId(data.product.category_id)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [productId])

  //   useEffect(() => {
  //     if (price && discount) {
  //       const percentage = discount / 100
  //       const discountedPrice = price / (1 - percentage)
  //       setDisPrice(Math.round(discountedPrice.toFixed(2))) // Set to 2 decimal points
  //     }
  //   }, [price, discount])

  useEffect(() => {
    if (price && discount && !isNaN(price) && !isNaN(discount)) {
      const percentage = discount / 100
      const discountedPrice = price / (1 - percentage)
      setDisPrice(Math.round(discountedPrice.toFixed(2))) // Set to 2 decimal points
    } else {
      setDisPrice(null) // Reset discounted price to null if discount is blank or invalid
    }
  }, [price, discount])

  const handleUploadImage = e => {
    const files = e.target.files
    const urls = []

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.onload = e => {
        urls.push(e.target.result)
        if (urls.length === files.length) {
          setImg(urls)
        }
      }
      reader.readAsDataURL(files[i])
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!title || !description || !categoryId || !code || !img) {
        alert('Please fill all required fields')
        setSubmitting(false)
        return
      }

      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          img,
          price: Math.floor(price),
          discount,
          disPrice,
          code,
          stock
          // categoryId,
        })
      })

      if (res.ok) {
        alert('Product updated successfully')
        router.push('/')
      } else {
        throw new Error('Failed to update the product')
      }
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <>
      <div className='container mt-3'>
        {/* Add Product */}
        <div className='flex justify-around'>
          <div>
            <form onSubmit={handleSubmit}>
              <div
                style={{ border: '1px solid gray' }}
                className='container mt-5 p-4 rounded border-gray-200'
              >
                <h1 className='text-3xl font-bold text-center mb-1'>
                  Update Product
                </h1>
                <hr />
                <br />
                <label>Title</label>
                <br />
                <input
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  type='text'
                  placeholder='Title'
                />
                <br />
                <br />
                <label>Description</label>
                <textarea
                  rows='4'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  type='text'
                  placeholder='Description'
                />
                <br />
                <br />

                <label>Price</label>
                <input
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  type='text'
                  placeholder='Price'
                />
                <br />
                <br />
                <label>Discount</label>
                <input
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  type='text'
                  placeholder='Discount'
                />
                <br />
                <br />

                <label>Discounted Price: </label>
                <input
                  type='text'
                  value={disPrice !== null ? disPrice : ''}
                  readOnly
                />
                <br />
                <br />
                <label>Code</label>
                <input
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  type='text'
                  placeholder='Code'
                />
                <br />
                <br />

                <select
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded'
                  onChange={e => setStock(e.target.value)}
                >
                  <option disabled selected>
                    Select Stock
                  </option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
                <br />
                <br />
                <div className='flex flex-wrap gap-1'>
                  {img?.length > 0 &&
                    img.map((item, index) => (
                      <img
                        src={item}
                        key={index}
                        height={200}
                        width={200}
                        className='my-1'
                      />
                    ))}
                </div>
                <br />
                <br />
                <label
                  htmlFor='file-upload-product'
                  className='custom-file-upload1  w-[100%]'
                >
                  <div className=' flex justify-between'>
                    <div>Image Upload</div>
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
                <br />
                <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                  <button
                    type='submit'
                    className='mt-3 bg-[#222222] text-white hover:bg-red-700 font-bold py-2 px-4 rounded'
                  >
                    Update Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductEdit
