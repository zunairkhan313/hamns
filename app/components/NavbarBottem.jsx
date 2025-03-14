"use client"
import shirt from "../../public/image/tshirt.png";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import React, { createContext } from 'react';


export default function NavbarBottem() {
  return (
    <>
      <div className='bg-[#222222] h-[100%]'>
        <br />
        <div className="container mt-5">
          <div className='row'>
            <div className="col-lg-5 col-md-12">
              <motion.h1
                className='text-5xl text-white leading-tight font-text ml-[40px]'
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Discover And <br /> Find Your Own <br /> Fashion!
              </motion.h1>
              <motion.p
                className='text-white text-sm font-text mt-4 leading-relaxed ml-[40px]'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{maxWidth:"400px"}}
              >
               haMnS offers the best T-shirts in Pakistan, combining premium quality. Our collection of men&apos;s T-shirts features trendy designs, durable fabrics, and a perfect fit for every occasion.  We brings you the finest selection of premium T-shirts in Pakistan. Shop now for unmatched quality and style!
              </motion.p>
              <br />
              <Link href={"/#Products"}>
                <motion.button
                  className='bg-white px-4 py-2 mt-3 text-black hover:bg-black font-bold ml-[40px]'
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Explore Now
                </motion.button>
              </Link>
            </div>
            <div className="col-lg-1"></div>
            <div id='Cap' className="col-lg-6">
              <div style={{ marginTop: "-40px" }} className='flex justify-center align-center'>
                <motion.div
                  className="box"
                  initial={{ opacity: 0, x:-400 }}
                  animate={{ opacity: 1, x:0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                >
                  <Image src={shirt} alt="shirt" width={440} />
                </motion.div>
              </div>
            </div>
          </div>
        </div><br /><br />
      </div>
    </>
  );
}
