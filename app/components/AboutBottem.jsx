import React from 'react';
import { LuWarehouse } from "react-icons/lu";
import { HiCurrencyDollar } from "react-icons/hi2";
import { TbShoppingBag } from "react-icons/tb";
import { FaSackDollar } from "react-icons/fa6";
import "../components/style/style.css"
import { motion, useAnimation } from "framer-motion";
import { createContext, useEffect } from 'react';
import { useInView } from "react-intersection-observer";

export default function AboutBottem() {

    const iconControls = useAnimation();

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            iconControls.start({
                opacity: 1,
                y: 0,
                // rotate: 360,
                transition: { duration: 0.8, delay: 0.3 }
            });

        }
    }, [iconControls, inView]);

    return (
        <div className='container mt-[100px] mb-[100px] '>
            <div className="row flex justify-center">
                <div className="col-lg-2 border-1 py-4 px-4">
                    <div className='flex justify-center align-center text-center'>
                        <motion.div className='py-3 rounded-[39px] flex justify-center align-center text-center bg-[#222222] w-[70px] '
                            ref={ref}
                            initial={{ opacity: 0, y: -100}}
                            animate={iconControls}
                        ><LuWarehouse size={30} style={{ color: "white" }} />
                        </motion.div>
                    </div>
                    <h1 className='text-black font-bold mt-4 text-center text-[25px]'>10.5k</h1>
                    <p className='text-[12px] font-bold mt-1 text-center'>Sellers active our site</p>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-2 border-1 py-4 bg-[#222222]">
                    <div className='flex justify-center align-center text-center'>
                        <motion.div className='py-3 rounded-[40px] flex justify-center align-center text-center bg-[#fff] w-[70px]'
                            ref={ref}
                            initial={{ opacity: 0, y: -100}}
                            animate={iconControls}
                        ><HiCurrencyDollar size={33} style={{ color: "black" }} />
                        </motion.div>
                    </div>
                    <h1 className='text-white font-bold mt-4 text-center text-[25px]'>33k</h1>
                    <p className='text-[12px] font-bold mt-1 text-center text-white'>Monthly Product Sale</p>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-2 border-1 py-4 ">
                    <div className='flex justify-center align-center text-center'>
                        <motion.div className='py-3 rounded-[40px] flex justify-center align-center text-center bg-[#222222] w-[70px]'
                            ref={ref}
                            initial={{ opacity: 0, y: -100}}
                            animate={iconControls}
                        ><TbShoppingBag size={33} style={{ color: "white" }} />
                        </motion.div>
                    </div>
                    <h1 className='text-black font-bold mt-4 text-center text-[25px]'>45.5k</h1>
                    <p className='text-[12px] font-bold mt-1 text-center'>Customer active in our site</p>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-2 border-1 py-4 bg-[#222222]">
                    <div className='flex justify-center align-center text-center'>
                        <motion.div className='py-3 rounded-[40px] flex justify-center align-center text-center bg-[#fff] w-[70px]'
                            ref={ref}
                            initial={{ opacity: 0, y: -100}}
                            animate={iconControls}
                        ><FaSackDollar size={30} style={{ color: "black" }} />
                        </motion.div>
                    </div>
                    <h1 className='text-white font-bold mt-4 text-center text-[25px]'>25k</h1>
                    <p className='text-[12px] font-bold mt-1 text-center text-white'>Anual gross sale in our site</p>
                </div>
            </div>
        </div>
    );
}
