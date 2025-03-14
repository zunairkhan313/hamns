'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import '../components/hr.css'
import { ImCloudUpload } from 'react-icons/im'

const Admin = () => {
  const router = useRouter()

  /* Get Categories */
  const [allCategories, setAllCategories] = useState([])

  const handleGetAllCategories = async () => {
    try {
      fetch(`/api/category`)
        .then(res => res.json())
        .then(data => setAllCategories(data.Categories || []))
        .catch(err => console.log(err))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  /* Category States */
  const [title1, setTitle1] = useState('')
  const [description1, setDescription1] = useState('')
  const [img1, setImg1] = useState('')

  /* Product States */
  const [categoryId, setCategoryId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState('')
  const [price, setPrice] = useState('')
  const [mdprice, setMdPrice] = useState('')
  const [lgprice, setLgPrice] = useState('')
  const [xlprice, setXlPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [disPrice, setDisPrice] = useState('')
  const [small, setSmall] = useState('')
  const [medium, setMedium] = useState('')
  const [large, setLarge] = useState('')
  const [xlarge, setXlarge] = useState('')
  const [code, setCode] = useState('')
  const [video, setVideo] = useState('')
  const [stock, setStock] = useState('')
  console.log('Stock', stock)

  /* Calculate Discounted Price */
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
          setImg1(urls)
        }
      }

      reader.readAsDataURL(files[i])
    }
  }


  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const sizes = ["Small", "Medium", "Large", "X-Large"]; // Available sizes

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmitProduct = async e => {
    e.preventDefault()
    try {
      if (!title || !description || !categoryId || !code || !img || !stock || !price || !selectedSizes) {
        alert('Please fill all required fields')
        return
      }

      const sanitizedPrice = Math.floor(price)
      // const sanitizedMdPrice = Math.floor(mdprice)
      // const sanitizedLgPrice = Math.floor(lgprice)
      // const sanitizedXlPrice = Math.floor(xlprice)

      const res = await fetch(`/api/products`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          img,
          price: sanitizedPrice,
          sizes:selectedSizes,
          // mdprice: sanitizedMdPrice,
          // lgprice: sanitizedLgPrice,
          // xlprice: sanitizedXlPrice,
          small,
          // medium,
          // large,
          // xlarge,
          discount,
          disPrice,
          code,
          video,
          stock,
          categoryId
        })
      })

      if (res.ok) {
        alert('Product created successfully')
        router.push('/')
      } else {
        throw new Error('Failed to create a product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleSubmitCategory = async e => {
    e.preventDefault()

    if (!title1 || !description1 || !img1) {
      alert('Please fill all required fields')
      return
    }
    try {
      const res = await fetch(`/api/category`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title1, description1, img1 })
      })

      if (res.ok) {
        alert('Category created successfully')
        router.push('/')
      } else {
        throw new Error('Failed to create a category')
      }
    } catch (error) {
      console.error('Error creating category:', error)
    }
  }

  return (
    <>
      <style>{`
        body {
          background-color: white;
        }
      `}</style>
      <div className='container '>
        {/* <div className='text-[44px] font-extrabold tracking-wider bgVideoText'>
          <h1 className='heading text-black font-bold'>Admin Panel</h1>
        </div> */}

        <div className='row'>
          <div className='col-lg-8 '>
            {/* <div className='container-fluid '> */}
            {/* Add Product */}
            {/* <div className='flex justify-around'> */}
            {/* <div> */}
            <form onSubmit={handleSubmitProduct}>
              <div className='container mt-5 p-4 rounded bg-slate-100'>
                <h1 className='text-3xl font-extrabold text-start mb-1 font-text'>
                  Add New Product
                </h1>
                <hr />
                <br />
                <label className='font-text'>Title</label>
                <br />
                <input
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
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
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Description'
                />

                <div className='flex gap-2 mt-4'>
                  <div className='flex-1'>
                    {/* <label>Category</label> */}
                    <select
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-2 rounded bg-slate-200'
                      onChange={e => setCategoryId(e.target.value)}
                    >
                      {allCategories?.length > 0 ? (
                        <>
                          <option disabled selected>
                            Select category
                          </option>
                          {allCategories.map(item => (
                            <>
                              <option value={item?._id}>{item?.title1}</option>
                            </>
                          ))}
                        </>
                      ) : (
                        <option>No categories found</option>
                      )}
                    </select>
                  </div>
                  <div className='flex-1'>
                    {/* <label>Select Stock</label> */}
                    <select
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-2 rounded bg-slate-200'
                      onChange={e => setStock(e.target.value)}
                    >
                      <option disabled selected>
                        Select Stock
                      </option>
                      <option>In Stock</option>
                      <option>Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-2 mt-4'>
                  {/* <div className='flex-1'>
                    <label>Size</label>
                    <input
                      value={small}
                      onChange={e => setSmall(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Size'
                    />
                  </div> */}
                  <div className="relative flex-1">
                    <label>Size</label>
                    <div
                      className="mt-1 w-full border border-gray-200 py-2 px-4 rounded bg-slate-200 cursor-pointer flex justify-between items-center"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <span>{selectedSizes.length > 0 ? selectedSizes.join(", ") : "Select Size"}</span>
                      <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
                    </div>

                    {isOpen && (
                      <div className="absolute w-full bg-white border border-gray-200 mt-1 rounded shadow-lg z-10">
                        <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                          <span className="font-semibold">Select Sizes</span>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="text-red-500 text-sm font-semibold"
                          >
                            ✖
                          </button>
                        </div>
                        {sizes.map((size) => (
                          <label key={size} className="flex items-center px-4 py-2 hover:bg-gray-100">
                            <input
                              type="checkbox"
                              checked={selectedSizes.includes(size)}
                              onChange={() => handleSizeChange(size)}
                              className="mr-2"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='flex-1'>
                    <label>Code</label>
                    <input
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Code'
                    />
                  </div>
                </div>
                <div className='flex gap-2 mt-4'>
                  <div className='flex-1'>
                    <label>Price</label>
                    <input
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Price'
                    />
                  </div>
                  <div className='flex-1'>
                    <label>Discount</label>
                    <input
                      value={discount}
                      onChange={e => setDiscount(e.target.value)}
                      className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Discount'
                    />
                  </div>
                </div>
                <div className='row  mt-4'>
                  <div className='col-lg-4'>
                    <label>Discounted Price</label>
                    <br />
                    <input
                      type='text'
                      value={disPrice !== null ? disPrice : ''}
                      readOnly
                      className='mt-1 border border-gray-200 py-2 px-6 rounded bg-slate-200 col-lg-12'
                    />
                  </div>
                  <div className='col-lg-8'>
                    <label>Video Link</label>
                    <br />
                    <input
                      value={video}
                      onChange={e => setVideo(e.target.value)}
                      className='mt-1 col-lg-12 border border-gray-200 py-2 px-6 rounded bg-slate-200'
                      type='text'
                      placeholder='Video Link'
                    />
                  </div>
                </div>

                {/* <br />
                      <br />
                      <label>Size 2</label>
                      <input
                        value={medium}
                        onChange={e => setMedium(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='size 2'
                      />
                      <br />
                      <br /> */}
                {/* <label>Size 3</label>
                      <input
                        value={large}
                        onChange={e => setLarge(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='size 3'
                      />
                      <br />
                      <br />
                      <label>Size 4</label>
                      <input
                        value={xlarge}
                        onChange={e => setXlarge(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='size 4'
                      />
                      <br />
                      <br /> */}

                {/* <br />
                      <br />
                      <label>Price 2</label>
                      <input
                        value={mdprice}
                        onChange={e => setMdPrice(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='Price 2'
                      />
                      <br />
                      <br />
                      <label>Price 3</label>
                      <input
                        value={lgprice}
                        onChange={e => setLgPrice(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='Price 3'
                      />
                      <br />
                      <br />
                      <label>Price 4</label>
                      <input
                        value={xlprice}
                        onChange={e => setXlPrice(e.target.value)}
                        className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                        type='text'
                        placeholder='Price 4'
                      /> */}
                {/* <br />
                <br /> */}
                {/* <label>Discount</label>
                <input
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Discount'
                /> */}
                {/* <br />
                <br /> */}

                {/* <label>Discounted Price: </label>
                <input
                  type='text'
                  value={disPrice !== null ? disPrice : ''}
                  readOnly
                  className='border border-gray-200 py-2 px-6 rounded bg-slate-200 ml-2'
                /> */}
                {/* <br />
                <br /> */}
                {/* <label>Code</label>
                <input
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Code'
                /> */}
                {/* <br />
                <br /> */}
                {/* <label>Video Link</label>
                <input
                  value={video}
                  onChange={e => setVideo(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Video Link'
                /> */}
                {/* <br />
                <br /> */}
                {/* <select
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  onChange={e => setStock(e.target.value)}
                >
                  <option disabled selected>
                    Select Stock
                  </option>
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select> */}
                {/* <br />
                <br /> */}
                <div className='flex flex-wrap gap-2 justify-center mt-4'>
                  {img?.length > 0 &&
                    img.map((item, index) => (
                      <img
                        src={item}
                        key={index}
                        // height={100}
                        style={{ height: '120px' }}
                        width={170}
                        className=' border border-black rounded-lg '
                      />
                    ))}
                </div>

                {/* <label
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
                /> */}
                <br />
                <center>
                  <label htmlFor='file-upload' className='cursor-pointer'>
                    <div className='flex justify-around'>
                      <i>
                        <ImCloudUpload size={150} />
                      </i>
                    </div>
                    <div className='flex justify-around'>
                      <p className='font-text'>Browse file to upload</p>
                    </div>
                    <input
                      id='file-upload'
                      type='file'
                      className='hidden'
                      onChange={handleUploadImage}
                      accept='image/*' // Restrict to image files only
                      multiple
                    />
                  </label>
                </center>

                <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                  <button
                    type='submit'
                    className='mt-3 bg-red-700 text-white hover:bg-black font-bold py-2 px-4 rounded'
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
          <div className='col-lg-4'>
            {/* <div className='container'> */}

            {/* Add Category */}
            {/* <div className='flex justify-around'> */}
            {/* <div> */}
            <form onSubmit={handleSubmitCategory}>
              <div
                className='container mt-5 p-4 rounded border-gray-200 bg-slate-100'
              >
                <h1 className='text-3xl font-extrabold font-text text-start mb-1'>
                  Add Category
                </h1>
                <hr />
                <br />
                <label>Title</label>
                <br />
                <input
                  onChange={e => setTitle1(e.target.value)}
                  value={title1}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Title'
                />
                <br />
                <br />
                <label>Description</label>
                <textarea
                  rows='4'
                  value={description1}
                  onChange={e => setDescription1(e.target.value)}
                  className='mt-1 w-[100%] border border-gray-200 py-2 px-6 rounded bg-slate-200'
                  type='text'
                  placeholder='Description'
                />
                <br />
                <br />

                <div className='flex flex-wrap gap-2 justify-center mt-4'>
                  {img1?.length > 0 &&
                    img1.map((item, index) => (
                      <img
                        src={item}
                        key={index}
                        // height={100}
                        style={{ height: '120px' }}
                        width={170}
                        className=' border border-black rounded-lg '
                      />
                    ))}
                </div>

                <center>
                  <label htmlFor='file-upload' className='cursor-pointer'>
                    <div className='flex justify-around'>
                      <i>
                        <ImCloudUpload size={80} />
                      </i>
                    </div>
                    <div className='flex justify-around'>
                      <p className='font-text'>Browse file to upload</p>
                    </div>
                    <input
                      id='file-upload'
                      type='file'
                      className='hidden'
                      onChange={handleUploadImage}
                      accept='image/*' // Restrict to image files only
                    />
                  </label>
                </center>
                {/* <input
                  id='file-upload'
                  type='file'
                  className='w-[100%]'
                  onChange={handleUploadImage}
                /> */}
                <br />
                <div className='container px-10 mx-0 min-w-full flex flex-col items-center'>
                  <button
                    type='submit'
                    className='mt-3 bg-red-700 text-white hover:bg-black font-bold py-2 px-4 rounded'
                  >
                    Upload
                  </button>
                </div>
              </div>
            </form>
            {/* </div> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <br />
    </>
  )
}

export default Admin
