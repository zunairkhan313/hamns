'use client'

import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Top() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to handle scroll event
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Add scroll event listener when component mounts
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div style={{ position: 'fixed', bottom: '100px', right: '20px', display: isVisible ? 'block' : 'none' }}>
                <motion.button 
                    onClick={scrollToTop} 
                    style={{ padding: '15px', color: '#fff', border:"1px solid white", borderRadius: '90%', cursor: 'pointer', backgroundColor: '#222222' }}
                    animate={{ rotate: isVisible ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <NavigationIcon />
                </motion.button>
            </div>
        </>
    );
}
