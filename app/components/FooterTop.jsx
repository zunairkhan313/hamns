'use client'

import React from 'react'
import { FaTruckFast } from 'react-icons/fa6'
import { MdHeadsetMic } from 'react-icons/md'
import { BsShieldCheck } from 'react-icons/bs'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import './style/style.css'
import "./hr.css"

export default function FooterTop () {
  const iconControls = useAnimation()
  const textControls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true, // The animation will trigger only once
    threshold: 0.1 // Percentage of the element that needs to be visible to trigger the animation
  })

  useEffect(() => {
    if (inView) {
      iconControls.start({
        opacity: 1,
        y: 0,
        // rotate: 360,
        transition: { duration: 0.8, delay: 0.3 }
      })
      textControls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay: 0.3 }
      })
    }
  }, [iconControls, textControls, inView])

  return (
    <div className='container p-2 mt-[100px] mb-[100px]'>
      <div className='row'>
        <div className='col-lg-4'>
          <div className='flex justify-center align-center text-center'>
            <motion.div
              className='py-4 rounded-[45px] flex justify-center align-center text-center bg-red-700 w-[80px]'
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={iconControls}
            >
              <FaTruckFast size={34} style={{ color: 'white' }} />
            </motion.div>
          </div>
          <motion.h1
            className='text-black font-extrabold mt-4 text-center text-lg font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            Fast Shipping
          </motion.h1>
          <motion.p
            className='text-[12px] font-bold mt-1 text-center font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            Quick delivery, right to your door
          </motion.p>
        </div>
        <div id='customer' className='col-lg-4'>
          <div className='flex justify-center align-center text-center'>
            <motion.div
              className='py-4 rounded-[45px] flex justify-center align-center text-center bg-red-700 w-[80px]'
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={iconControls}
            >
              <MdHeadsetMic size={34} style={{ color: 'white' }} />
            </motion.div>
          </div>
          <motion.h1
            className='text-black font-extrabold mt-4 text-center text-lg font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            Secure Transactions
          </motion.h1>
          <motion.p
            className='text-[12px] font-bold mt-1 text-center font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            Safe and easy checkout
          </motion.p>
        </div>
        <div id='guarantee' className='col-lg-4'>
          <div className='flex justify-center align-center text-center'>
            <motion.div
              className='py-4 rounded-[45px] flex justify-center align-center text-center bg-red-700 w-[80px]'
              ref={ref}
              initial={{ opacity: 0, y: 100 }}
              animate={iconControls}
            >
              <BsShieldCheck size={34} style={{ color: 'white' }} />
            </motion.div>
          </div>
          <motion.h1
            className='text-black font-extrabold mt-4 text-center text-lg font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            Quality Guaranteed
          </motion.h1>
          <motion.p
            className='text-[12px] font-bold mt-1 text-center font-text'
            initial={{ opacity: 0, x: -50 }}
            animate={textControls}
          >
            The best products, guaranteed
          </motion.p>
        </div>
      </div>
    </div>
  )
}
