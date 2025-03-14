import RemoveBtn2 from '../RemoveBtn2'
import Link from 'next/link'
import '../style/style.css'
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

export default function CategoriesCard ({ items }) {
  return (
    <>
      <div className='border border-[#f0f0f0] bg-body-tertiary p-3 mb-5 rounded min-h-[200px]'>
        <Link href={`/product/?id=${items?._id}`}>
          <div className='flex flex-wrap justify-around'>
            <img
              style={{ height: '350px', width: '100%' }}
              className='rounded-t object-cover'
              // width={300}
              src={items?.image1}
              alt={'tshirts'}
            />
          </div>
          {/* <Link href={`/product/?id=${items?._id}`}>
            <div className='hover-button'>
              <button className='text-black'>Shop Now</button>
            </div>
          </Link> */}
          {/* <div className='bg-[#222222] p-3'> */}
            <div>
              <h4 className='text-[25px] mt-4 text-black ml-2 font-bold tracking-wider text-center'>
                {items?.title1}
              </h4>
            </div>
            <div className='mt-2'>
              <h4 className='text-[14px] text-black ml-2 text-center'>
                {truncateText(items?.description1, 30)}
              </h4>
            </div>
          {/* </div> */}
        </Link>

        <div className='ml-1'>
          <RemoveBtn2 id={items?._id} />
        </div>
      </div>
    </>
  )
}
