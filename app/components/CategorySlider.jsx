// "use client"

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import './style.css';
// import { EffectCoverflow, Pagination } from 'swiper/modules';
// import Image from 'next/image';

// import slide1 from "../../public/image/cap1.webp";
// import slide2 from "../../public/image/cap2.webp";
// import slide3 from "../../public/image/cap3.webp";
// import slide4 from "../../public/image/cap4.webp";
// import slide5 from "../../public/image/cap5.webp";
// import slide6 from "../../public/image/cap6.webp";
// import slide7 from "../../public/image/cap7.webp";
// import slide8 from "../../public/image/cap8.webp";
// import slide9 from "../../public/image/wcap1.webp";
// import slide10 from "../../public/image/wcap2.webp";
// import slide11 from "../../public/image/wcap3.webp";
// import slide12 from "../../public/image/wcap4.webp";
// import slide13 from "../../public/image/wcap5.webp";
// import slide14 from "../../public/image/wcap6.webp";
// import slide15 from "../../public/image/wcap7.webp";
// import Link from 'next/link';



// export default function CateSliders() {
//   return (
//     <>
//       <Swiper
//         effect={'coverflow'}
//         grabCursor={true}
//         centeredSlides={true}
//         slidesPerView={'auto'}
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           modifier: 1,
//           slideShadows: false,
//         }}
//         pagination={true}
//         modules={[EffectCoverflow, Pagination]}
//         className="mySwiper"
//         initialSlide={4}
//         loop
//       >
//         <SwiperSlide>
//           <Link href={"/category"}>
//             <Image src={slide1}
//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide2}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide3}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide4}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide5}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide6}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide7}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide8}
//               className='border border-[#f0f0f0]'
//               alt="slides"
//               width={"100px"}
//               style={{ "height": "400px" }}
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide9}
//               className='border border-[#f0f0f0]'

//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide10}

//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide11}

//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide12}

//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide13}
//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>

//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide14}

//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>
//         </SwiperSlide>
//         <SwiperSlide>
//           <Link href={"/category"}>

//             <Image src={slide15}

//               className='object-cover border border-[#f0f0f0]'
//               width={"100px"}
//               style={{ "height": "400px" }}
//               alt="slides"
//             />
//           </Link>
//         </SwiperSlide>
//       </Swiper>
//     </>
//   );
// }
