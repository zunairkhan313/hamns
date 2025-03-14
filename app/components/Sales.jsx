"use client"
import Image from 'next/image'
import React from 'react'
import offer from "../../public/image/sales.jpg"
import Link from 'next/link'
import { motion, useAnimation } from "framer-motion";
import { createContext, useEffect } from 'react';
import { useInView } from "react-intersection-observer";

export default function Sales() {
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
            <div className='container border-3 border-black  h-[100%]'>
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
                        <div className='justify-center align-center mt-[120px]'>

                            <motion.h1 className='text-4xl text-black font-serif'
                                initial={{ opacity: 0, y: -50 }}
                                animate={controls}
                                ref={ref}
                            >Article On Sale</motion.h1>
                            <motion.p className='text-black mt-3 text-sm max-w-96 text-justify'
                                initial={{ opacity: 0, y: -50 }}
                                animate={controls}
                                ref={ref}
                            >Elevate your style with our exclusive offer! Discover incredible savings of up to 40% on our latest New Arrivals, designed to bring a fresh, stylish edge to your wardrobe. Don&apos;t miss out on this opportunity to upgrade your look while enjoying unbeatable discounts. Grab your favorites today and make every outfit a statement!</motion.p>
                        </div>
                 
                        <br />
                        <Link href={"/category"}>
                            <motion.button className='bg-black px-4 py-2 mt-3 text-white hover:bg-black font-bold'
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
