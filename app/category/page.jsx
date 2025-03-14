'use client'

import '../components/hr.css'




import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Category = () => {
  const [showLoader, setShowLoader] = useState(true) // State for loader
  const router = useRouter()

  useEffect(() => {
    // Wait for 3 seconds, then redirect
    const timer = setTimeout(() => {
      router.push('/') // Redirect to login page
    }, 3000) // 3000ms = 3 seconds

    return () => clearTimeout(timer) // Clear timeout on unmount
  }, [router])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {showLoader && (
        <div className='p-5'> 
          <p>Redirecting</p>
          {/* <div className='loader' style={loaderStyle}></div> */}
        </div>
      )}
    </div>
  )
}



export default Category
