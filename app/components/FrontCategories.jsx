'use client'

import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useSession } from 'next-auth/react'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import Link from 'next/link'
import { Spinner } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import CategoriesCard from '../components/categories/CategoriesCard'
import '../components/hr.css'
import FrontCategoriesCard from './categories/FrontCategoriesCard'

const FrontCategory = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const handleGetCategories = async () => {
    try {
      const res = await fetch(`/api/category`)
      const data = await res.json()
      setAllCategories(data.Categories.filter(item => item.title1 === 'Caps'))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleGetProducts = async () => {
    try {
      const response = await fetch(`/api/products`)
      const data = await response.json()
      setAllProducts(data.Products || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true) // Start loading before fetching data
      await Promise.all([handleGetCategories(), handleGetProducts()])
      setLoading(false) // End loading after all data is fetched
    }

    fetchData()
  }, [])

  return (
    <>
      <style jsx>{`
        body {
          background-color: white;
        }
      `}</style>

      <div>
        <div className='container mt-5'>
          {loading ? (
            <div
              className='p-5 flex justify-center items-center'
              style={{ height: '100vh' }}
            >
              <Spinner animation='border' role='status' />
            </div>
          ) : (
            <>
              <div className='md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4 mb-4'>
                {allProducts?.length > 0 ? (
                  allProducts
                    .slice(0, 8)
                    .map((items, i) => (
                      <FrontCategoriesCard key={i} items={items} />
                    ))
                ) : (
                  <div className='py-5 my-5'>No category found</div>
                )}
              </div>
              {/* Learn More button */}
              {allProducts.length > 8 &&
                allCategories.length > 0 &&
                allCategories.map((items, i) => (
                  <Link href={`/product/?id=${items._id}`} key={items._id || i}>
                  <center>

                      <button className='text-white flex font-bold text-[16px] bg-red-700 py-2 mb-5 hover:bg-black px-4 rounded-3xl'>
                        VIEW MORE  
                        <MdOutlineKeyboardDoubleArrowRight size={24} style={{marginLeft:"5px"}}/>
                      </button>
                  </center>
                  
                  </Link>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default FrontCategory
