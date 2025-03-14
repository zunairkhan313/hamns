"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../public/image/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "../components/style/style.css";
import "./hr.css"
import Dropdown from './Dropdown';
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';

export default function NavbarScrollExample() {
    const { cart } = useSelector((item) => item.cart);

    const [header, setHeader] = useState(false);
    const { data: session } = useSession();

    const scrollHeader = () => {
        if (window.scrollY >= 20) {
            setHeader(true);
        } else {
            setHeader(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHeader);
        return () => {
            window.removeEventListener('scroll', scrollHeader);
        };
    }, []);

    var menu;
    var menu1;
    var dash;

    if (session?.user?.email === "nasah123@gmail.com") {
        dash = (
            <>
                <Link href={"/dashboard"}>
                    <motion.p
                        initial={{ opacity: 0, x: -120 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Dashboard
                    </motion.p>
                </Link>
            </>
        )
    }
    var add;

    if (session?.user?.email === "nasah123@gmail.com") {
        add = (
            <>
                <Link href={"/admin"}>
                    <div style={{ marginTop: "-6px" }} className='bg-red-700 px-3 py-2 text-white font-text text-sm'>
                        Add Product
                    </div>
                </Link>
            </>
        )
    }


    if (session?.user) {
        menu = (
            <motion.button
                onClick={() => signOut()}
                className="ml-5 text-[14px] font-text text-white bg-red-700 px-3 py-2"
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                Logout
            </motion.button>
        )
    } else {
        menu1 = (
            <>
                <Link href={"/login"}>
                    <motion.button
                        className='ml-2 font-text text-[14px] text-white bg-red-700 px-3 py-2'
                        initial={{ opacity: 0, x: -120 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Login
                    </motion.button>
                </Link>
            </>
        )
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#222222", paddingTop: "0px", paddingBottom: "0px", marginTop: header ? 0 : '0px' }} >
            <Container fluid>
                <Link href={"/"}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            className='ml-[60px]'
                            style={{ width: "130px" }}
                            src={logo}
                            alt='logo'
                            id='logo'
                        />
                    </motion.div>
                </Link>

                <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto" navbarScroll></Nav>
                    <div>
                        <ul id='linkss' className='flex justify-between space-x-6'>
                            <p id='dash' className='text-white font-text'>{dash}</p>
                            <Link href={"/"}>
                                <motion.li
                                    id='home'
                                    className='text-white font-text'
                                    initial={{ opacity: 0, x: -120 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    Home
                                </motion.li>
                            </Link>

                            {/* <Link href={"/category"}> */}
                            <motion.div
                                className="dropdown"
                                initial={{ opacity: 0, x: -120 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <button className="dropbtn text-white font-text">Products</button>
                                <div className="dropdown-content">
                                    {/* dropdown */}
                                    <Dropdown />
                                </div>
                            </motion.div>
                            {/* </Link> */}
                            <Link href={"/about"}>
                                <motion.li
                                    className='text-white font-text'
                                    initial={{ opacity: 0, x: -120 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    About
                                </motion.li>
                            </Link>
                            <Link href={"/contact"}>
                                <motion.li
                                    className='text-white font-text'
                                    initial={{ opacity: 0, x: -120 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7 }}
                                >
                                    Contact
                                </motion.li>
                            </Link>
                        </ul>
                    </div>

                    <div id='loginn' className='flex list-none m-5 gap-3'>
                        <motion.div
                            id='cartt'
                            className='mt-2 relative'
                            initial={{ opacity: 0, x: -120 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* <div className=""> */}
                            <Link href={"/cart"}>
                                <div id="cartbase" className="absolute">
                                    {cart?.length || 0}
                                </div>
                                <LocalMallOutlinedIcon className="text-white w-7 h-8 mt-1" size={24} />

                            </Link>
                        </motion.div>
                        <div>
                            <motion.p
                                id='user'
                                className="font-bold text-white ml-2 mt-2 font-text"
                                initial={{ opacity: 0, x: -120 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                {session?.user?.name}
                            </motion.p>
                        </div>
                        <div style={{marginTop:"6px"}}>

                            {add}
                        </div>
                        <div id='log'>
                            {menu1}
                            {menu}
                        </div>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
