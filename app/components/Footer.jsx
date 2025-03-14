import Link from 'next/link'
import { FaFacebookF } from 'react-icons/fa6'
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa'
import Image from 'next/image'
import QR from '../../public/image/QR.png'
import './style/style.css'
import logo from '../../public/image/logo.png'
import cap1 from '../../public/image/img1.jpg'
import cap2 from '../../public/image/img2.jpg'
import cap3 from '../../public/image/img3.jpg'
import cap4 from '../../public/image/img6.jpg'

export default function Footer () {
  return (
    <footer class='bg-[#222222]'>
      <div class='mx-auto w-full max-w-screen-xl'>
        <div class='grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4'>
          <div>
            <Image
              className=''
              style={{ width: '100px', marginTop: '-13px' }}
              src={logo}
              alt='logo'
              id='logo'
            />
            <p className='text-sm text-gray-500 text-justify'>
            Explore us to find the latest trends and sophisticated designs and transform yourself into a classy look. Stay connected with us to discover futuristic designs.
            </p>
            <div
              id='sociall'
              class='flex mt-4 md:mt-0 space-x-5 rtl:space-x-reverse'
            >
              <a
                className='text-white hover:text-blue-800 dark:hover:text-white bg-red-700 p-3 rounded-circle'
                href='https://www.facebook.com/profile.php?id=61574063793341'
                target='_blank'
              >
                <FaFacebookF size={20} />
              </a>

              <a
                className='text-white hover:text-pink-800 dark:hover:text-white bg-red-700 p-3 rounded-circle'
                href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA=='
                target='_blank'
              >
                <FaInstagram size={20} />
              </a>
              <a
                className='text-white hover:text-pink-600 dark:hover:text-white bg-red-700 p-3 rounded-circle'
                href='https://www.tiktok.com'
                target='_blank'
              >
                <FaTiktok size={20} />
              </a>
              <a
                className='text-white hover:text-red-700 dark:hover:text-white bg-red-700 p-3 rounded-circle'
                href='https://www.youtube.com'
                target='_blank'
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          <center>
            <div>
              <h2 class='mb-6 text-sm font-semibold text-white uppercase dark:text-white '>
                Company
              </h2>
              <ul class='text-gray-500 dark:text-gray-400 font-medium'>
                <Link href={'/'}>
                  <li class='mb-4'>
                    <p
                      href=''
                      class=' hover:underline no-underline text-gray-500'
                    >
                      Home
                    </p>
                  </li>
                </Link>
                <Link href={'/about'}>
                  <li class='mb-4'>
                    <p
                      href=''
                      class='hover:underline no-underline text-gray-500'
                    >
                      About
                    </p>
                  </li>
                </Link>
                <Link href={'/#Products'}>
                  <li class='mb-4'>
                    <p
                      href=''
                      class='hover:underline no-underline text-gray-500'
                    >
                      Product
                    </p>
                  </li>
                </Link>
                <Link href={'/contact'}>
                  <li class='mb-4'>
                    <p
                      href=''
                      class='hover:underline no-underline text-gray-500'
                    >
                      Contact
                    </p>
                  </li>
                </Link>
              </ul>
            </div>
          </center>
          <div>
            <h2 class='mb-6 text-sm font-semibold text-white uppercase dark:text-white'>
              Instagram
            </h2>
            <div class='grid grid-cols-2 gap-1'>
              <a href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA==' target='_blank'>
                <Image
                  src={cap1}
                  alt='Instagram Post 1'
                  style={{ width: '100%', height: '80px' }}
                  className='rounded-lg object-cover'
                />
              </a>
              <a href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA==' target='_blank'>
                <Image
                  src={cap2}
                  alt='Instagram Post 2'
                  style={{ width: '100%', height: '80px' }}
                  className='rounded-lg object-cover'
                />
              </a>
              <a href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA==' target='_blank'>
                <Image
                  src={cap3}
                  alt='Instagram Post 3'
                  style={{ width: '100%', height: '80px' }}
                  className='rounded-lg object-cover'
                />
              </a>
              <a href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA==' target='_blank'>
                <Image
                  src={cap4}
                  alt='Instagram Post 4'
                  style={{ width: '100%', height: '80px' }}
                  className='rounded-lg object-cover'
                />
              </a>
            </div>
          </div>
          <center>
            <div>
              <div className='w-100 p-2 mt-4'>
                <Image
                  src={QR}
                  alt=''
                  style={{ height: '170px', width: '170px' }}
                />
              </div>
            </div>
          </center>
        </div>
        <center>
          <div class='px-4 py-6 bg-[#222222] md:flex md:items-center md:justify-center border-t'>
            <span class='text-sm text-center text-gray-500 dark:text-gray-300 sm:text-center'>
              © 2025{' '}
              <a
                style={{ textDecoration: 'none' }}
                href='https://www.instagram.com/hamn.s.wear?utm_source=qr&igsh=MWszMXdyZnU4NW5seA=='
              >
                haMn.S™
              </a>
              . All Rights Reserved
             
            </span>
          </div>
        </center>
      </div>
    </footer>
  )
}
