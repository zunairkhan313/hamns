"use client"
import Image from 'next/image'
import React from 'react'
import offer from "../../public/image/new-cap.png"
import Link from 'next/link'
import { motion, useAnimation } from "framer-motion";
import { createContext, useEffect } from 'react';
import { useInView } from "react-intersection-observer";

export default function ExclusiveOffer() {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true, // The animation will trigger only once
        threshold: 0.1, // Percentage of the element that needs to be visible to trigger the animation
    });

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                y: 0,
                x: 0,
                transition: { duration: 0.8, delay: 0.3 }
            });
        }
    }, [controls, inView]);
    return (
        <>
            <div className='container bg-[#222222] h-[100%]'>
                <div className="row">
                    <div className="col-lg-5">
                        <motion.div className='flex justify-center align-center mt-5'
                            initial={{ opacity: 0, x: -400 }}
                            animate={controls}
                            ref={ref}
                        >

                            <Image
                                src={offer}
                                style={{ width: "400px", height: "100%" }}
                                className='object-cover'
                                alt='cap'
                            />
                        </motion.div>
                        <br />
                    </div>
                    <div className="col-lg-1"></div>
                    <div className="col-lg-6">
                        <div className='justify-center align-center mt-[60px]'>

                            <motion.h1 className='text-4xl text-white font-serif'
                                initial={{ opacity: 0, y: -50 }}
                                animate={controls}
                                ref={ref}
                            >Exclusive Offer</motion.h1>
                            <motion.p className='text-white mt-3 text-sm'
                                initial={{ opacity: 0, y: -50 }}
                                animate={controls}
                                ref={ref}
                            >Unlock the ultimate style upgrade with our exclusive <br /> offer Enjoy savings of up to 40% off on our latest New <br /> Arrivals</motion.p>
                        </div>
                        <br />
                        <motion.div className='flex flex-wrap space-x-6'
                            initial={{ opacity: 0, y: -50 }}
                            animate={controls}
                            ref={ref}
                        >
                            <div className='py-3 px-4 bg-white text-center'>
                                <p className='text-black font-bold text-md'>06</p>
                                <p className='text-black text-sm'>Days</p>
                            </div>
                            <div className='py-3 px-4 bg-white text-center'>
                                <p className='text-black font-bold text-md'>18</p>
                                <p className='text-black text-sm'>Hours</p>
                            </div>
                            <div className='py-3 px-4 bg-white text-center'>
                                <p className='text-black font-bold text-md'>48</p>
                                <p className='text-black text-sm'>Min</p>
                            </div>
                        </motion.div>
                        <br />
                        <Link href={"/category"}>
                            <motion.button className='bg-white px-4 py-2 mt-3 text-black hover:bg-black font-bold'
                                initial={{ opacity: 0, y: -50 }}
                                animate={controls}
                                ref={ref}
                            >Check it Out</motion.button>
                        </Link>
                    </div>
                </div>
                <br /><br />
            </div>
        </>
    )
}
