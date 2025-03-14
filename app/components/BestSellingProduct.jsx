"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import cap1 from "../../public/image/cap2.jpg";
import capp from "../../public/image/capp1.jpg";
import capp2 from "../../public/image/capp2.jpg";
import capp3 from "../../public/image/capp3.jpg";
import capp4 from "../../public/image/cap4.jpg";
import capp5 from "../../public/image/cap5.jpg";
import capp6 from "../../public/image/cap6.jpg";
import StarRateIcon from '@mui/icons-material/StarRate';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import Link from 'next/link';

export default function BestSellingProduct() {
    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
        setShowMore(true);
    };

    return (
        <>
            <div className="container">
                <div className='flex justify-around flex-wrap'>
                    <Link href={"/category"}>

                        <div style={{ width: 350, height: "100%" }}>
                            <Image
                                style={{ height: "480px" }}
                                className='object-cover'
                                src={capp}
                                width={350}
                                alt='caps'
                            />
                            <div className='mt-4'>
                                <p className='text-center text-sm font-bold'>This is a beautiful black cap</p>
                                <div className='flex justify-around'>
                                    <p className='mt-2 text-center text-sm font-semibold'>$35.99</p>
                                    <p className='text-sm mt-2 font-semibold'> | </p>
                                    <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link href={"/category"}>
                        <div style={{ width: 350, height: "100%" }}>
                            <Image
                                src={capp2}
                                width={350}
                                style={{ height: "480px" }}
                                className='object-cover'
                                alt='caps'
                            />
                            <div className='mt-4'>
                                <p className='text-center text-sm font-bold'>This is a beautiful black cap</p>
                                <div className='flex justify-around'>
                                    <p className='mt-2 text-center text-sm font-semibold'>$35.99</p>
                                    <p className='text-sm mt-2 font-semibold'> | </p>
                                    <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link href={"/category"}>
                        <div style={{ width: 350, height: "100%" }}>
                            <Image
                                src={capp3}
                                width={350}
                                style={{ height: "480px" }}
                                className='object-cover'
                                alt='caps'
                            />
                            <div className='mt-4'>
                                <p className='text-center text-sm font-bold'>This is a beautiful black cap</p>
                                <div className='flex justify-around'>
                                    <p className='mt-2 text-center text-sm font-semibold'>$35.99</p>
                                    <p className='text-sm mt-2 font-semibold'> | </p>
                                    <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
                {showMore && (
                    <div className='flex justify-around flex-wrap mt-4'>
                        <Link href={"/category"}>
                            <div style={{ width: 350, height: "100%" }}>
                                <Image
                                    style={{ height: "480px" }}
                                    className='object-cover'
                                    src={capp4}
                                    width={350}
                                    alt='caps'
                                />
                                <div className='mt-4'>
                                    <p className='text-center text-sm font-bold'>Another beautiful cap</p>
                                    <div className='flex justify-around'>
                                        <p className='mt-2 text-center text-sm font-semibold'>$39.99</p>
                                        <p className='text-sm mt-2 font-semibold'> | </p>
                                        <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href={"/category"}>
                            <div style={{ width: 350, height: "100%" }}>
                                <Image
                                    style={{ height: "480px" }}
                                    className='object-cover'
                                    src={capp5}
                                    width={350}
                                    alt='caps'
                                />
                                <div className='mt-4'>
                                    <p className='text-center text-sm font-bold'>Another beautiful cap</p>
                                    <div className='flex justify-around'>
                                        <p className='mt-2 text-center text-sm font-semibold'>$39.99</p>
                                        <p className='text-sm mt-2 font-semibold'> | </p>
                                        <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href={"/category"}>
                            <div style={{ width: 350, height: "100%" }}>
                                <Image
                                    style={{ height: "480px" }}
                                    className='object-cover'
                                    src={capp6}
                                    width={350}
                                    alt='caps'
                                />
                                <div className='mt-4'>
                                    <p className='text-center text-sm font-bold'>Another beautiful cap</p>
                                    <div className='flex justify-around'>
                                        <p className='mt-2 text-center text-sm font-semibold'>$39.99</p>
                                        <p className='text-sm mt-2 font-semibold'> | </p>
                                        <p className='text-sm mt-2 font-semibold'><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /><StarRateIcon style={{ fontSize: "20px", color: "#FFE234" }} /></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                )}
                {!showMore && (
                    <div className='text-center mt-6'>
                        <button
                            onClick={handleShowMore}
                            className='text-black px-5 py-2 rounded border border-black mt-5'
                        >
                            See All <TrendingFlatIcon className='ml-2' />
                        </button>
                    </div>
                )}
            </div>
            <br /><br /><br />
        </>
    );
}
