'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { createContext } from 'react'
import React, { useState, useEffect } from 'react'
import './style/style.css'
import shirt from "../../public/image/tshirt.png";
import Link from 'next/link'

export default function Aboutpage () {
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)
  
    const handleGetProducts = async () => {
        try {
          const res = await fetch(`/api/category`)
          const data = await res.json()
    
          // Prioritize "Caps" category to the first position
        //   const prioritizedProducts = data.Categories?.sort((a, b) =>
        //     a.title1 === 'Caps' ? -1 : b.title1 === 'Caps' ? 1 : 0
        //   )
    
        setAllProducts(
            data.Categories.filter((item) => item.title1 === "Caps")
          );
        } catch (error) {
          console.error('Error fetching categories:', error)
        } finally {
          setLoading(false)
        }
      }
    
      useEffect(() => {
        handleGetProducts()
      }, [])
    
  return (
    <>
      <style>{`
                body {
                    background-color: white;
                }
            `}</style>
      <div className='mt-[100px]'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='mt-[30px]'>
                <motion.h1
                  className='text-5xl text-black font-text flex align-center font-extrabold'
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Our Story
                </motion.h1>
                <motion.p
                  className='text-sm text-black mt-4 text-justify'
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  In today&apos;s world of trendy outfits and modern designs, haMnS is here to set new fashion standards with the best T-shirts in Pakistan. We believe that clothing is more than just fabric; it&apos;s a form of self-expression, confidence, and individuality. That&apos;s why we bring you an exclusive collection of men&apos;s T-shirts, designed with a unique blend of new art and elegant styles to help you make a statement wherever you go.
                </motion.p>
                <br />
                <motion.p
                  className='mt-2 text-sm text-black text-justify'
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  At haMnS, we prioritize quality, comfort, and affordability. Our mission is to provide high-quality T-shirts that not only feel great but also stand the test of time. Made from premium fabrics, our T-shirts ensure breathability, durability, and a perfect fit. Whether you prefer classic designs or modern aesthetics, our collection caters to every fashion enthusiast.
                </motion.p>
                <br />
                <motion.p
                  className='mt-2 text-sm text-black text-justify'
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  We understand that fashion is constantly evolving, and so are we. Our team of designers continuously explores innovative designs and futuristic fashion trends to bring you styles that are fresh, sophisticated, and stylish. We offer affordable T-shirts without compromising on quality. Our signature collection reflects creativity, uniqueness, and an effortless charm that lets you showcase your personality with confidence.
                </motion.p>
              </div>
            </div>
            <div className='col-lg-1'></div>
            <div className='col-lg-5'>
              <div className='flex justify-center align-center'>
                <Image
                  src={shirt}
                  alt='shirt'
                  style={{ height: '480px' }}
                  className='object-cover img-fluid w-full mt-2'
                />
              </div>
            </div>
          </div>
        </div><br /><br />
        
      </div>
    </>
  )
}
