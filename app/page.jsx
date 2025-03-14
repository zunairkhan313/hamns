'use client'
import Image from 'next/image'
import NavbarBottem from './components/NavbarBottem'
import FooterTop from './components/FooterTop'
import FrontCategory from './components/FrontCategories'
import { motion, useAnimation } from 'framer-motion'
import React, { createContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import "./components/hr.css"

export default function Home () {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true, // The animation will trigger only once
    threshold: 0.1 // Percentage of the element that needs to be visible to trigger the animation
  })

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.8, delay: 0.3 }
      })
    }
  }, [controls, inView])

  return (
    <>
      <style>{`
                body {  
                    background-color: white;
                }
                    
            `}</style>
      <div>
        {/* <Banner /> */}
        <NavbarBottem />
   
        <br />
        <br />
        <br />
        <motion.h1
          className='text-3xl text-center font-extrabold italic font-text mt-5'
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          ref={ref}
        >
          Best Selling
        </motion.h1>
        <motion.p
          className='mt-3 text-center text-slate-700 text-sm font-semibold font-text'
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          ref={ref}
          id='Products'
        >
          Get in on the trend with our curated selection of best-selling styles.
        </motion.p>
        <br />
        <br />

        <FrontCategory />
        <br />
        <br />
        <FooterTop />
      </div>
    </>
  )
}
